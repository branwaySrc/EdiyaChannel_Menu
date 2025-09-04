import Product from "@/components/ui/ProductCard.ui";
import { MenuType } from "@/db/types";

interface Props {
	categoryList: MenuType[];
}

export default function CategoryContentUI(props: Props) {
	return (
		<Product.List>
			{props.categoryList.map(product => (
				<Product.Card key={product.productId} {...product} />
			))}
		</Product.List>
	);
}
