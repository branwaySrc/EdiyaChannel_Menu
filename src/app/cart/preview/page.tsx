"use client";

import { useCart } from "@/components/controllers/context/cartContext";
import FixedBottomButtonEl from "@/components/primitives/FixedBottomButton.ele";
import html2canvas from "html2canvas";
import Link from "next/link";
import { useRef } from "react";
import NavigationSection from "@/components/ui/global/sections/Navigation.section";

export default function CartPreviewPage() {
	const { cart } = useCart();
	const previewRef = useRef<HTMLDivElement>(null);

	const total = cart.reduce((sum, item) => {
		const sizeCost = item.size ? Number(item.size.cost || 0) : 0;
		const addCost = item.addOptions?.reduce((acc, opt) => acc + Number(opt.cost || 0), 0) || 0;
		return sum + (item.productPrice + sizeCost + addCost) * item.quantity;
	}, 0);

	const handleDownload = async () => {
		if (!previewRef.current) return;
		const canvas = await html2canvas(previewRef.current, {
			scale: 2,
			useCORS: true,
			allowTaint: true,
			backgroundColor: "#ffffff",
		});
		const link = document.createElement("a");
		link.download = "order_summary.jpg";
		link.href = canvas.toDataURL("image.jpg");
		link.click();
	};

	const today = new Date();
	const formatted = today.toLocaleDateString("ko-KR", {
		year: "numeric",
		month: "long",
		day: "numeric",
	});

	return (
		<main style={{ backgroundColor: "#fff" }}>
			<NavigationSection title="주문표 만들기" />
			{cart.length > 0 ? (
				<div style={{ padding: "0.2rem" }}>
					<header style={{ marginTop: "2.5rem", marginBottom: "0.5rem", padding: "0 0.5rem" }}>
						<div style={{ fontWeight: "bold", fontSize: "1.125rem", marginBottom: "2rem" }}>이디야 월피동점</div>
						<section style={{ padding: "0.75rem", backgroundColor: "#FAFAFAFF" }}>
							<div style={{ fontSize: "0.875rem", lineHeight: "1.5", color: "#1e293b" }}>
								주문표를 카카오채널 문의 및 연락처로 문의해 주세요.
								<br />
								<strong>책임자 연락처:</strong> 010-4514-7173
								<br />
								문의 시, 담당자 정보와 희망 날짜를 함께 남겨주시면 확인 후 빠르게 연락드리겠습니다.😊
							</div>

							<div style={{ fontSize: "0.75rem", marginTop: "0.5rem", lineHeight: "1.4", color: "#94a3b8" }}>
								사업자등록번호: 211-39-63056 영업신고증: 제 2017-0313436호
								<br />
								책임자: 김민석 010-4514-7173 주소: 경기도 안산시 상록구 월피동 492-16번지 103호
							</div>
						</section>
					</header>
					<div style={{ paddingTop: "20px", paddingBottom: "20px" }} ref={previewRef}>
						<div style={{ fontWeight: "bold", fontSize: "1.2rem", padding: "1rem" }}>주문표</div>
						<aside style={{ color: "#1e293b", fontSize: "1rem", paddingLeft: "1rem", marginBottom: "1rem" }}>주문표 작성 일자 {formatted}</aside>
						<ul style={{ display: "flex", flexDirection: "column", gap: "1.5rem", padding: "1rem" }}>
							{cart.map(item => (
								<li
									key={`${item.slug}-${item.temperature}-${item.size?.optionName ?? "no-size"}-${(item.addOptions || [])
										.map(o => o.optionName)
										.join("-")}`}
									style={{
										display: "flex",
										flexDirection: "column",
										borderBottom: "1px solid #cbd5e1",
										paddingBottom: "1rem",
									}}
								>
									<div style={{ display: "flex", width: "100%" }}>
										<div style={{ display: "flex", flexDirection: "column", gap: "0.25rem", width: "100%" }}>
											<section style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
												<div style={{ fontWeight: 600 }}>
													{item.temperature === "hot" ? "Hot / " : item.temperature === "ice" ? "Ice / " : ""}
													{item.productName}{" "}
													{item.size?.optionName === "Regular"
														? "R"
														: item.size?.optionName === "Large"
														? "L"
														: item.size?.optionName === "Extra"
														? "EX"
														: ""}
												</div>
												<aside style={{ fontSize: "1.125rem", fontWeight: "bold", color: "#1e293b" }}>X {item.quantity}</aside>
											</section>

											<div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
												{item.size && (
													<span style={{ fontSize: "0.875rem", color: "#1e293b" }}>
														{item.size.optionName} + {item.size.cost}
													</span>
												)}

												{item.addOptions && item.addOptions.length > 0 && (
													<div style={{ fontSize: "0.875rem", color: "#1e293b", display: "flex", flexDirection: "column" }}>
														{item.addOptions.map((opt, index) => (
															<span key={index} style={{ paddingBottom: "2px" }}>
																추가 : {opt.optionName} + {opt.cost}
															</span>
														))}
													</div>
												)}

												<span style={{ fontSize: "0.875rem", fontWeight: "bold", color: "#1e293b" }}>
													{(
														item.productPrice +
														(item.size ? Number(item.size.cost || 0) : 0) +
														(item.addOptions?.reduce((acc, opt) => acc + Number(opt.cost || 0), 0) || 0)
													).toLocaleString()}
													원
												</span>
											</div>
										</div>
									</div>
								</li>
							))}
						</ul>

						<section
							style={{
								marginTop: "1rem",
								display: "flex",
								justifyContent: "space-between",
								alignItems: "center",
								fontWeight: "bold",
								fontSize: "1.125rem",
								padding: "0 1rem",
							}}
						>
							<span>총 합계</span>
							<span>{total.toLocaleString()} 원</span>
						</section>

						<section style={{ padding: "0.75rem", backgroundColor: "#FAFAFAFF", margin: "1rem" }}>
							<div style={{ fontSize: "0.7rem", lineHeight: "1.5", color: "#1e293b" }}>
								본 주문표는 사전 주문 접수를 위한 용도로 사용됩니다. <br />
								해당 주문표를 바탕으로 주문 요청을 진행하실 경우, 반드시 방문을 통한 사전 결제가 완료되어야 최종 주문이 확정됨을 안내드립니다.
								고객님의 원활한 이용을 위하여 위 사항을 반드시 숙지하여 주시기 바랍니다.
							</div>
						</section>
					</div>
				</div>
			) : (
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						justifyContent: "center",
						minHeight: "100vh",
						textAlign: "center",
						padding: "1rem",
					}}
				>
					<legend style={{ fontSize: "6rem", marginBottom: "1.5rem" }}>😢</legend>
					<h1 style={{ fontSize: "1.25rem", fontWeight: "bold", color: "#1e293b" }}>주문표가 비어있습니다...</h1>
					<p style={{ marginTop: "1rem", fontSize: "1rem", color: "#475569", lineHeight: "1.5rem" }}>지금 바로 상품을 주문표에 담아보세요!</p>
					<Link
						href="/"
						style={{
							marginTop: "1.5rem",
							padding: "0.5rem 1rem",
							color: "#fff",
							backgroundColor: "#16a34a",
							borderRadius: "0.375rem",
							transition: "background-color 0.2s",
						}}
					>
						메뉴판으로 돌아가기
					</Link>
				</div>
			)}
			<FixedBottomButtonEl label="주문표 다운로드" onClick={handleDownload} />
			<section style={{ marginBottom: "5rem" }} />
		</main>
	);
}
