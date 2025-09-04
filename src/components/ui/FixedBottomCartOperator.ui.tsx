"use client";

import ToastEl from "@/components/primitives/Toast.ele";

interface Props {
	handleAddToCart: {
		onClick: () => void;
		showToast: boolean;
		setShowToast: (value: boolean) => void;
	};
	handleRouter: () => void;
}

export default function FixedBottomCartOperatorUI(props: Props) {
	return (
		<>
			{props.handleAddToCart.showToast && <ToastEl.Saved />}
			<div className="fixed bottom-0 w-full min-w-sm max-w-xl mx-auto border-t border-slate-300 bg-white">
				<section className="p-2 flex justify-between gap-2">
					<button
						onClick={() => {
							props.handleAddToCart.onClick();
							props.handleAddToCart.setShowToast(true);
							setTimeout(() => props.handleAddToCart.setShowToast(false), 2000);
						}}
						className="block items-center justify-center p-4 w-full border-2 border-blue-600 rounded-lg bg-blue-600"
					>
						<span className="text-white font-bold">주문표에 담기</span>
					</button>
					<button
						onClick={props.handleRouter}
						className="block items-center justify-center p-4 w-[30%] min-w-[120px] border-2 border-blue-600 rounded-lg"
					>
						<span className="text-blue-600 font-bold">주문표</span>
					</button>
				</section>
			</div>
		</>
	);
}
