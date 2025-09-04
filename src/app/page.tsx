"use client";

import PageTitleEl from "@/components/primitives/PageTitle.ele";
import CategoryBarUI from "@/components/ui/CategoryBar.ui";
import FixedBottomButtonEl from "@/components/primitives/FixedBottomButton.ele";
import CategoryContentUI from "@/components/ui/CategoryContent.ui";

import { COFFEE_DB, BAKERY_DB, BEVERAGE_DB, SNACK_DB } from "@/db";
import { CATEGORY_LIST_DASHBOARD } from "@/components/dashboard";

//
import { useCategoryController } from "@/components/controllers/hooks/useCategory.controller";
import { useRouter } from "next/navigation";
import { MenuType } from "@/db/types";

export default function Home() {
	const router = useRouter();
	const { currentCategory, categoryList, handleCategoryClick } = useCategoryController();

	let products: MenuType[] = [];
	switch (currentCategory) {
		case CATEGORY_LIST_DASHBOARD[0]:
			products = COFFEE_DB;
			break;
		case CATEGORY_LIST_DASHBOARD[1]:
			products = BEVERAGE_DB;
			break;
		case CATEGORY_LIST_DASHBOARD[2]:
			products = BAKERY_DB;
			break;
		case CATEGORY_LIST_DASHBOARD[3]:
			products = SNACK_DB;
			break;
		default:
			products = [];
	}

	return (
		<div>
			<CategoryBarUI categoryList={categoryList} onCategoryClick={handleCategoryClick} activeCategory={currentCategory} />
			<PageTitleEl headerTitle="메뉴 리스트">{currentCategory}</PageTitleEl>
			<CategoryContentUI categoryList={products} />
			<FixedBottomButtonEl label="내가 담은 주문표 보기" onClick={() => router.push("/cart")} />
		</div>
	);
}
