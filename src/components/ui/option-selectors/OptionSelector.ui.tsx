"use client";

import RequiredSelectorUI from "./widgets/RequiredSelector.ui";
import OptionalAddSelectorUI from "./widgets/OptionalAddSelector.ui";
import { ProductOptionValueType } from "@/db/types";

interface Props {
	quantity: number;
	isIce: boolean;
	selectedSize?: ProductOptionValueType;
	selectedAddOptions: ProductOptionValueType[];
	hasTemperature?: boolean;
	hasSizeOption?: boolean;
	hasAddOption?: boolean;
	optionValues: {
		required?: ProductOptionValueType[];
		optional?: ProductOptionValueType[];
	};
	productPrice: number;

	onQuantityChange: (newQuantity: number) => void;
	onIsIceChange: (isIce: boolean) => void;
	onSelectSize: (size?: ProductOptionValueType) => void;
	onSelectAdd: (addOptions: ProductOptionValueType[]) => void;
}

export default function OptionSelectorUI({
	quantity,
	isIce,
	selectedAddOptions,
	selectedSize,
	hasTemperature,
	hasSizeOption,
	hasAddOption,
	optionValues,
	productPrice,
	onQuantityChange,
	onIsIceChange,
	onSelectSize,
	onSelectAdd,
}: Props) {
	const sizeCost = Number(selectedSize?.cost || 0);
	const addCost = selectedAddOptions?.reduce((sum, opt) => sum + Number(opt.cost || 0), 0) ?? 0;
	const totalCost = (productPrice + sizeCost + addCost) * quantity;

	return (
		<div className="px-4 mb-20">
			<QuantitySelector quantity={quantity} onQuantityChange={onQuantityChange} />
			{hasTemperature && <TemperatureSelector isIce={isIce} onIsIceChange={onIsIceChange} />}
			<section className="my-8">
				<div className="flex flex-col gap-8">
					<OptionContainer>
						{hasSizeOption && optionValues.required && <RequiredSelectorUI optionValues={optionValues.required} onSelect={onSelectSize} />}
					</OptionContainer>
					<OptionContainer>
						{hasAddOption && optionValues.optional && <OptionalAddSelectorUI optionValues={optionValues.optional} onChange={onSelectAdd} />}
					</OptionContainer>
				</div>
				<span className="flex border-b border-b-slate-400 w-full h-8" />
			</section>
			<EstimatedCost>{totalCost.toLocaleString()}</EstimatedCost>
		</div>
	);
}

function QuantitySelector({ quantity, onQuantityChange }: { quantity: number; onQuantityChange: (change: number) => void }) {
	return (
		<section className="border p-3 rounded-lg border-slate-200 my-3">
			<div className="px-1 flex items-center justify-between ">
				<div>
					<span className="font-bold text-slate-600">주문 수량</span>
				</div>
				<div className="flex items-center gap-2">
					<button
						onClick={() => onQuantityChange(quantity - 1)}
						className="border border-slate-500 w-10 h-10 rounded-full font-bold text-sm"
						disabled={quantity <= 1}
					>
						➖
					</button>
					<span className="w-6 text-center font-bold text-lg">{quantity}</span>
					<button onClick={() => onQuantityChange(quantity + 1)} className="border border-slate-500 w-10 h-10 rounded-full font-bold text-sm">
						➕
					</button>
				</div>
			</div>
		</section>
	);
}

function TemperatureSelector({ isIce, onIsIceChange }: { isIce: boolean; onIsIceChange: (value: boolean) => void }) {
	return (
		<section className="mt-4">
			<div className="flex gap-2 p-2 rounded-lg bg-slate-100">
				<button
					onClick={() => onIsIceChange(false)}
					className={`px-4 py-3 rounded-lg block w-full ${!isIce ? "bg-red-500 text-white" : "bg-slate-300 text-white"}`}
				>
					HOT
				</button>
				<button
					onClick={() => onIsIceChange(true)}
					className={`px-4 py-3 rounded-lg block w-full ${isIce ? "bg-blue-500 text-white" : "bg-slate-300 text-white"}`}
				>
					ICE
				</button>
			</div>
		</section>
	);
}

function EstimatedCost({ children }: { children: React.ReactNode }) {
	return (
		<section className="flex justify-between mt-5">
			<div className="font-bold text-slate-700">예상 비용</div>
			<div className="font-bold text-slate-700">
				{children} <span className="ml-1">원</span>
			</div>
		</section>
	);
}

function OptionContainer({ children }: { children?: React.ReactNode }) {
	return <div className="flex flex-col gap-2">{children}</div>;
}
