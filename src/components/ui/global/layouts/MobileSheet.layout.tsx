export default function MobileSheetLayout(props: { children: React.ReactNode }): React.ReactNode {
	return (
		<div className="w-full min-h-screen flex justify-center bg-blue-200">
			<div className="w-full min-w-sm max-w-xl mx-auto bg-white relative tracking-tight">{props.children}</div>
		</div>
	);
}
