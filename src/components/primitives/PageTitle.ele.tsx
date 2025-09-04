"use client";

interface Props {
	headerTitle?: string;
	children?: React.ReactNode;
}

export default function PageTitleEl(props: Props) {
	return (
		<div className="p-4">
			<div className="font-bold text-xl">
				{props.children}
				<span className="ml-1">{props.headerTitle || ""}</span>
			</div>
		</div>
	);
}
