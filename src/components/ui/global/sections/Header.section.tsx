interface Props {
	header?: string;
}

export default function HeaderSection(props: Props) {
	return (
		<nav className="bg-blue-700 h-5 flex justify-center items-center py-5">
			<h1 className="text-white font-bold">{props.header}</h1>
		</nav>
	);
}
