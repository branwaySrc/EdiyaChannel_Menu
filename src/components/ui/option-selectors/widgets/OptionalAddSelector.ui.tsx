"use client";

import { useState, useEffect } from "react";
import SelectorHeader from "@/components/ui/option-selectors/widgets/SelectorHeader.ui";
import type { ProductOptionValueType } from "@/db/types";
import Cost from "@/components/primitives/Cost.ele";

interface Props {
	optionValues: ProductOptionValueType[];
	onChange?: (selectedOptions: ProductOptionValueType[]) => void;
}

export default function OptionalAddSelectorUI(props: Props) {
	const [selectedOptions, setSelectedOptions] = useState<boolean[]>(() => props.optionValues.map(() => false));
	const handleToggle = (index: number) => {
		setSelectedOptions(prev => {
			const newSelected = [...prev];
			newSelected[index] = !newSelected[index];
			return newSelected;
		});
	};

	useEffect(() => {
		if (!props.onChange) return;

		const activeOptions = props.optionValues.filter((_, idx) => selectedOptions[idx]);
		props.onChange(activeOptions);
	}, [selectedOptions, props.optionValues, props.onChange]); // props 전체 X, 필요한 것만

	if (!props.optionValues || props.optionValues.length === 0) return null;

	return (
		<>
			<SelectorHeader header="추가 옵션" required={false} />
			{props.optionValues.map((option, index) => (
				<label key={index} className="p-3 flex gap-3">
					<input className="accent-blue-600 scale-150" type="checkbox" checked={selectedOptions[index]} onChange={() => handleToggle(index)} />
					<div className="flex w-full justify-between gap-3 ">
						<span className="text-sm font-bold">{option.optionName}</span>
						<Cost>{option.cost}</Cost>
					</div>
				</label>
			))}
		</>
	);
}
