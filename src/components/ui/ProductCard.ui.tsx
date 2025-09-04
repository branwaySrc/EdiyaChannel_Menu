import Image from "next/image";
import Link from "next/link";
import Badge from "../primitives/Badges.ele";

function ProductCardList(props: { children: React.ReactNode }) {
	return <ul className="list-none flex flex-col gap-2 px-4 mb-10">{props.children}</ul>;
}

interface ProductItemProps {
	slug: string;
	productName: string;
	productDescription?: string;
	productPrice: number;
	productImage: string;
	productType: string[];
}

function ProductCard(props: ProductItemProps) {
	const { productType } = props;

	const hasHot = productType.includes("hot");
	const hasIced = productType.includes("ice");
	const hasPlain = productType.includes("plain");
	const hasCream = productType.includes("cream");

	return (
		<Link href={`./menu/${props.slug}`}>
			<li className="w-full border border-slate-200 rounded-lg p-4 flex justify-between">
				<section className="flex flex-col max-w-[320px] gap-2 justify-between">
					<div className="flex flex-col gap-2">
						<h2 className="font-bold text-md ">{props.productName}</h2>
						<legend className="font-bold text-lg">
							{props.productPrice}
							<span>원</span>
						</legend>
					</div>
					<article className="flex flex-col gap-2">
						<div className="text-xs font-bold text-slate-400">기본 옵션</div>
						<div className="flex gap-2">
							{hasIced && <Badge.Iced />}
							{hasHot && <Badge.Hot />}
							{hasCream && <Badge.Cream />}
							{hasPlain && <Badge.Plain />}
						</div>
					</article>
				</section>
				<aside className="w-full max-w-[120px] min-w-[100px]">
					<div className="border rounded-md border-slate-200 overflow-hidden ">
						<Image alt={"menu"} src={props.productImage || "./noImage"} width={120} height={120} />
					</div>
				</aside>
			</li>
		</Link>
	);
}

const Product = {
	Card: ProductCard,
	List: ProductCardList,
};

export default Product;
