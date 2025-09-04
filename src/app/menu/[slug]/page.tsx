import { notFound } from "next/navigation";
import { MenuType } from "@/db/types";
import NavigationSection from "@/components/ui/global/sections/Navigation.section";
import { COFFEE_DB, BEVERAGE_DB, BAKERY_DB, SNACK_DB } from "@/db";
import OptionSectionClient from "./_client";

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
		<main>
			<NavigationSection title={product.productName} />
			<OptionSectionClient product={product} />
		</main>
	);
}
