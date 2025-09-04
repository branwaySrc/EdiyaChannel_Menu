import { ComponentProps } from "react";
import SelectButtonEl from "@/components/primitives/SelectButton.ele";

interface Props extends Omit<ComponentProps<typeof SelectButtonEl>, "name" | "onClick" | "active"> {
	categoryList: string[];
	onCategoryClick: (category: string) => void;
	activeCategory?: string;
}

export default function CategoryBarUI(props: Props) {
	const topSticky = "sticky top-0 z-50";
	return (
		<aside className={`flex gap-2 py-2 border-b border-slate-400 bg-white ${topSticky}`}>
			<span />
			{props.categoryList.map(category => (
				<SelectButtonEl
					key={category}
					name={category}
					onClick={props.onCategoryClick ? () => props.onCategoryClick(category) : undefined}
					active={props.activeCategory === category}
				/>
			))}
		</aside>
	);
}
