"use client";

import { useState } from "react";
import SelectorHeader from "@/components/ui/option-selectors/widgets/SelectorHeader.ui";
import type { ProductOptionValueType } from "@/db/types";
import Cost from "@/components/primitives/Cost.ele";

interface Props {
	optionValues: ProductOptionValueType[];
	onSelect: (option: ProductOptionValueType) => void;
}

export default function RequiredSelector(props: Props) {
	const [selectedOption, setSelectedOption] = useState<string>(props.optionValues?.[0]?.optionName || "");

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSelectedOption(e.target.value);

		const selected = props.optionValues.find(opt => opt.optionName === e.target.value);
		if (selected) {
			props.onSelect(selected);
		}
	};

	if (!props.optionValues || props.optionValues.length === 0) return null;

	return (
		<>
			<SelectorHeader header="사이즈" required />
			<div className="flex flex-col p-4 gap-10">
				{props.optionValues.map(option => (
					<label key={option.optionName} className="flex w-full gap-3">
						<input
							className="scale-150 accent-blue-500 "
							type="radio"
							name="flavor"
							value={option.optionName}
							checked={selectedOption === option.optionName}
							onChange={handleChange}
						/>
						<div className="flex w-full justify-between">
							<span className="text-sm font-bold">{option.optionName}</span>
							<Cost>{option.cost}</Cost>
						</div>
					</label>
				))}
			</div>
		</>
	);
}
