"use client";

interface Props {
	name: string;
	onClick?: () => void;
	active?: boolean;
	disabled?: boolean;
	hidden?: boolean;
}

export default function SelectButtonEl(props: Props) {
	const { name, onClick, active, disabled, hidden } = props;

	const hiddenClass = hidden ? "hidden" : "";
	const activeClass = active ? "border-blue-700 bg-blue-700 text-white" : "border-slate-500 text-slate-500";

	return (
		<button onClick={onClick} disabled={disabled} className={`border rounded-md px-3 py-2 ${hiddenClass} ${activeClass}`}>
			<span className="text-sm font-bold">{name}</span>
		</button>
	);
}
