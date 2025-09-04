export default function SelectorHeader(props: { header: string; required?: boolean }) {
	return (
		<div className="flex justify-between bg-slate-100 px-3 py-2">
			<h2 className="font-bold text-sm">{props.header}</h2>
			{props.required ? <aside className="text-red-600 text-sm">필수선택 </aside> : <aside className="text-slate-600 text-sm">선택 옵션</aside>}
		</div>
	);
}
