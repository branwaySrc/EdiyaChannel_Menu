interface Props {
	quantity: number;
	onQuantityChange: (change: number) => void;
	onIsIceChange: (value: boolean) => void;
}

export default function QuantitySelectorUI(props: Props) {

	
	return (
		<section className="border p-2 rounded-lg border-slate-300 my-3">
			<div className="px-1 flex items-center justify-between ">
				<div>
					<span className="font-bold text-slate-600">주문 수량</span>
				</div>
				<div className="flex items-center gap-2">
					<button onClick={() => props.onQuantityChange(-1)} className="border py-2 px-3 rounded font-bold" disabled={props.quantity <= 1}>
						-
					</button>
					<span className="w-6 text-center font-bold text-lg">{props.quantity}</span>
					<button onClick={() => props.onQuantityChange(1)} className="border py-2 px-3 rounded font-bold">
						+
					</button>
				</div>
			</div>
		</section>
	);
}
