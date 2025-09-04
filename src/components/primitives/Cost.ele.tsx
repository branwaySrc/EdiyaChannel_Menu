export default function Cost(props: { children: React.ReactNode }) {
	return (
		<div className="text-slate-500 flex gap-2">
			<div className="flex justify-center items-center border border-slate-200 px-[4px] py-[2px] rounded-full bg-slate-400 text-white text-center text-[10px]">
				추가비용
			</div>
			<span>+</span>
			{props.children}
		</div>
	);
}
