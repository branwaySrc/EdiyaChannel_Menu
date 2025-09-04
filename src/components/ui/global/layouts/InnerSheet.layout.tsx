export default function InnerSheetLayout(props: { children: React.ReactNode }): React.ReactNode {
	return <main className="w-full min-h-screen relative">{props.children}</main>;
}
