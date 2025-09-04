"use client";

import { useState, useEffect } from "react";
import SelectorHeader from "@/components/ui/option-selectors/widgets/SelectorHeader.ui";
import type { ProductOptionValueType } from "@/db/types";
import Cost from "@/components/primitives/Cost.ele";

interface Props {
	optionValues: ProductOptionValueType[];
	onChange?: (selectedOptions: ProductOptionValueType[]) => void;
}

export default function OptionalAddSelectorUI({ optionValues, onChange }: Props) {
	const [selectedOptions, setSelectedOptions] = useState<boolean[]>(() => optionValues.map(() => false));

	const handleToggle = (index: number) => {
		setSelectedOptions(prev => {
			const newSelected = [...prev];
			newSelected[index] = !newSelected[index];
			return newSelected;
		});
	};

	useEffect(() => {
		if (!onChange) return;
		const activeOptions = optionValues.filter((_, idx) => selectedOptions[idx]);
		onChange(activeOptions);
	}, [selectedOptions, optionValues, onChange]); // ✅ 구조 분해된 값만 deps에 넣음

	if (!optionValues || optionValues.length === 0) return null;

	return (
		<>
			<SelectorHeader header="추가 옵션" required={false} />
			{optionValues.map((option, index) => (
				<label key={index} className="p-3 flex gap-3">
					<input className="accent-blue-600 scale-150" type="checkbox" checked={selectedOptions[index]} onChange={() => handleToggle(index)} />
					<div className="flex w-full justify-between gap-3">
						<span className="text-sm font-bold">{option.optionName}</span>
						<Cost>{option.cost}</Cost>
					</div>
				</label>
			))}
		</>
	);
}
