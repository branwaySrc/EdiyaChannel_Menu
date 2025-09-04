interface Props {
	onClick?: () => void;
	label?: string;
}

export default function FixedBottomButtonEl(props: Props) {
	return (
		<div className="fixed bottom-0 mx-auto min-w-sm max-w-xl w-full">
			<button onClick={props.onClick} className="flex items-center justify-center p-4 w-full border-2 border-blue-600 bg-blue-600">
				<span className="text-white font-bold">{props.label}</span>
			</button>
		</div>
	);
}
