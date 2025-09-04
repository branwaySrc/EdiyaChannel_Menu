// 1. 상품 옵션의 값들을 정의하는 타입

export interface ProductOptionType {
	optionCategory: string;
	optionValues: ProductOptionValueType[];
}

type ProductOptionValueType = {
	optionName: string;
	cost: number | string;
};

type ProductBadgeType = ("ice" | "hot" | "cream" | "plain")[];
type ProductCategoryType = ("coffee" | "beverage" | "bakery" | "snack")[];

// 3. 전체 상품의 타입을 정의하는 타입
export interface MenuType {
	productId: string;
	slug: string;
	productName: string;
	productCategory: ProductCategoryType;
	productType: ProductBadgeType;
	productTemperature: TemperatureOptionType;
	productDescription: string;
	productPrice: number;
	productImage: string;
	productOptions?: ProductOptionType[] | null;
}

type TemperatureOptionType = { temperatureValue: "both" } | { temperatureValue: "ice" } | { temperatureValue: "hot" } | { temperatureValue: "none" };
