"use client";

import { useCart } from "@/components/controllers/context/cartContext";
import FixedBottomButtonEl from "@/components/primitives/FixedBottomButton.ele";
import NavigationSection from "@/components/ui/global/sections/Navigation.section";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CartPage() {
	const { cart, removeItem, updateQuantity } = useCart();
	const total = cart.reduce((sum, item) => {
		const sizeCost = item.size ? Number(item.size.cost || 0) : 0;
		const addCost = item.addOptions?.reduce((acc, opt) => acc + Number(opt.cost || 0), 0) || 0;
		return sum + (item.productPrice + sizeCost + addCost) * item.quantity;
	}, 0);

	if (!cart) return null;

	const router = useRouter();

	return (
		<>
			<NavigationSection title={"내 주문표"} />

			<main>
				{cart.length > 0 ? (
					<>
						<ul className="flex flex-col gap-6 p-4 mt-8">
							{cart.map(item => (
								<li
									key={`${item.slug}-${item.temperature}-${item.size?.optionName ?? "no-size"}-${(item.addOptions || [])
										.map(o => o.optionName)
										.join("-")}`}
									className="flex flex-col border-b border-slate-300 pb-2"
								>
									<div className="flex justify-between items-start">
										<div className="flex flex-col gap-1">
											<span className="font-semibold">
												{item.temperature === "hot" ? "Hot / " : item.temperature === "ice" ? "Ice / " : ""}
												{item.productName}{" "}
												{item.size?.optionName === "Regular"
													? "R"
													: item.size?.optionName === "Large"
													? "L"
													: item.size?.optionName === "Extra"
													? "EX"
													: ""}
											</span>
											<div className="flex flex-col gap-2">
												{/* 옵션 표시 */}
												{item.size && (
													<span className="text-sm text-slate-500">
														{item.size.optionName} + {item.size.cost}
													</span>
												)}
												{item.addOptions && item.addOptions.length > 0 && (
													<div className="text-sm text-slate-500 flex flex-col ">
														{item.addOptions.map((opt, index) => (
															<span key={index} className="pb-[2px]">
																추가 : {opt.optionName} + {opt.cost}
															</span>
														))}
													</div>
												)}

												<span className="text-sm text-slate-500 font-bold">
													{(
														item.productPrice +
														(item.size ? Number(item.size.cost || 0) : 0) +
														(item.addOptions?.reduce((acc, opt) => acc + Number(opt.cost || 0), 0) || 0)
													).toLocaleString()}
													원
												</span>
											</div>
										</div>
										<div className="flex items-center">
											<div className="flex items-center gap-2">
												<button
													className="border p-3 rounded font-bold text-[10px]"
													onClick={() => updateQuantity(item, item.quantity - 1)}
													disabled={item.quantity <= 1}
												>
													➖
												</button>
												<span className="w-6 text-center font-bold text-lg">{item.quantity}</span>
												<button onClick={() => updateQuantity(item, item.quantity + 1)} className="border p-3 rounded font-bold text-[10px]">
													➕
												</button>
											</div>
											<button onClick={() => removeItem(item)} className="py-2 px-3 bg-red-600 rounded ml-4 ">
												<span className="text-white font-bold text-sm">
													<Image src={"/trash.svg"} alt="trash" width={20} height={20} />
												</span>
											</button>
										</div>
									</div>
								</li>
							))}
						</ul>
						<section className="mt-4 flex justify-between items-center font-bold text-lg px-4">
							<span>총 합계</span>
							<span>{total.toLocaleString()} 원</span>
						</section>
						<FixedBottomButtonEl label="주문표를 이미지로 만들기" onClick={() => router.push("/cart/preview")} />
					</>
				) : (
					<div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
						<legend className="text-8xl mb-6">😢</legend>
						<h1 className="text-xl font-bold text-slate-800">주문표가 비어있습니다...</h1>
						<p className="mt-4 text-md text-slate-600 leading-6">지금 바로 상품을 주문표에 담아보세요!</p>
						<Link href="/" className="mt-6 px-4 py-2 text-white bg-green-600 rounded-md hover:bg-green-700 transition-colors duration-200">
							메뉴판으로 돌아가기
						</Link>
					</div>
				)}
				<section className="mb-20" />
			</main>
		</>
	);
}
