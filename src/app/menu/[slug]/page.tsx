import { notFound } from "next/navigation";
import Image from "next/image";
import { MenuType } from "@/db/types";
import NavigationSection from "@/components/ui/global/sections/Navigation.section";
import { COFFEE_DB, BEVERAGE_DB, BAKERY_DB, SNACK_DB } from "@/db";
import QuantitySelectorUI from "@/components/ui/QuantitySelector.ui";

type PageProps = {
	params: Promise<{ slug: string }>;
};

export default async function MenuDetailPage({ params }: PageProps) {
	const data: MenuType[] = [...COFFEE_DB, ...BEVERAGE_DB, ...BAKERY_DB, ...SNACK_DB];
	const resolvedParams = await params;
	const product = data.find(product => product.slug === resolvedParams.slug);

	if (!product) {
		notFound();
	}

	return (
		<>
			<NavigationSection title={product.productName} />
			<main className="p-4">
				<legend className="flex items-center justify-center">
					<Image src={product.productImage} alt={product.productName} width={320} height={320} />
				</legend>
				<div className="flex flex-col gap-2">
					<p className="text-sm text-slate-600 leading-5">{product.productDescription}</p>
					<p className="font-bold text-xl">{product.productPrice} 원</p>
				</div>
			</main>
		</>
	);
}
