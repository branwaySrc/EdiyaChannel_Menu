import { useState, useEffect } from "react";
import { CATEGORY_LIST_DASHBOARD } from "@/components/dashboard";

const SAVED_CATEGORY_KEY = "category";

export const useCategoryController = () => {
	const [currentCategory, setCurrentCategory] = useState<string>(() => {
		if (typeof window !== "undefined") {
			return localStorage.getItem(SAVED_CATEGORY_KEY) || CATEGORY_LIST_DASHBOARD[0];
		}
		return CATEGORY_LIST_DASHBOARD[0];
	});

	useEffect(() => {
		localStorage.setItem(SAVED_CATEGORY_KEY, currentCategory);
	}, [currentCategory]);

	const handleCategoryClick = (selectedCategory: string) => {
		setCurrentCategory(selectedCategory);
	};

	return {
		currentCategory,
		categoryList: CATEGORY_LIST_DASHBOARD,
		handleCategoryClick,
	};
};
