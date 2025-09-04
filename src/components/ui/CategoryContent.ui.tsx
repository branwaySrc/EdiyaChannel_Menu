import Product from "@/components/ui/ProductCard.ui";
import { MenuType } from "@/db/types";

interface Props {
	categoryList: MenuType[];
}

export default function CategoryContentUI(props: Props) {
	return (
		<Product.List>
			{props.categoryList.map((product, index) => (
				<Product.Card key={`${product.slug}-${index}`} {...product} />
			))}
		</Product.List>
	);
}
