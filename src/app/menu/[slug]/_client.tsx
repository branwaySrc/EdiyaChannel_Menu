"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MenuType, ProductOptionValueType } from "@/db/types";

import FixedBottomCartOperatorUI from "@/components/ui/FixedBottomCartOperator.ui";
import Image from "next/image";
import OptionSelectorUI from "@/components/ui/option-selectors/OptionSelector.ui";
import { AddToCartItem, useCart } from "@/components/controllers/context/cartContext";

interface Props {
	product: MenuType;
}

export default function OptionSectionClient(props: Props) {
	const hasTemperature = props.product.productTemperature.temperatureValue === "both";
	const sizeOption = props.product.productOptions?.find(opt => opt.optionCategory === "Size")?.optionValues;
	const addOption = props.product.productOptions?.find(opt => opt.optionCategory === "Add")?.optionValues;

	const [quantity, setQuantity] = useState(1);
	const [isIce, setIsIce] = useState(hasTemperature ? true : props.product.productTemperature.temperatureValue === "hot");
	const [selectedSize, setSelectedSize] = useState<ProductOptionValueType | undefined>(sizeOption?.[0]);
	const [selectedAddOptions, setSelectedAddOptions] = useState<ProductOptionValueType[]>([]);
	const [showToast, setShowToast] = useState(false);

	const { addToCart } = useCart();
	const router = useRouter();

	// ---------- Cart 추가 핸들러 ----------
	const handleAddToCart = () => {
		const item: AddToCartItem = {
			slug: props.product.slug,
			productName: props.product.productName,
			productPrice: props.product.productPrice,
			quantity,
			temperature:
				props.product.productTemperature.temperatureValue === "both"
					? isIce
						? "ice"
						: "hot"
					: props.product.productTemperature.temperatureValue === "ice"
					? "ice"
					: "none",
			size: selectedSize,
			addOptions: selectedAddOptions,
		};

		addToCart(item);
	};

	return (
		<>
			<div className="p-4">
				<legend className="flex items-center justify-center">
					<Image src={props.product.productImage} alt={props.product.productName} width={320} height={320} />
				</legend>
				<div className="flex flex-col gap-2">
					<p className="text-sm text-slate-600 leading-5">{props.product.productDescription}</p>
					<p className="font-bold text-xl">{props.product.productPrice} 원</p>
				</div>
			</div>

			<OptionSelectorUI
				selectedAddOptions={selectedAddOptions}
				selectedSize={selectedSize}
				quantity={quantity}
				isIce={isIce}
				hasTemperature={!!hasTemperature}
				hasSizeOption={!!sizeOption}
				hasAddOption={!!addOption}
				optionValues={{ required: sizeOption ?? [], optional: addOption ?? [] }}
				productPrice={props.product.productPrice}
				onQuantityChange={setQuantity}
				onIsIceChange={setIsIce}
				onSelectSize={setSelectedSize}
				onSelectAdd={setSelectedAddOptions}
			/>

			<FixedBottomCartOperatorUI
				handleAddToCart={{ onClick: handleAddToCart, showToast: showToast, setShowToast: setShowToast }}
				handleRouter={() => router.push("/cart")}
			/>
		</>
	);
}
