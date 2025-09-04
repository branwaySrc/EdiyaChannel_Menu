import Link from "next/link";
import { UrlObject } from "url";

interface Props {
	emoji?: string;
	header?: string;
	children?: React.ReactNode;
	link?: {
		href: string | UrlObject;
		label?: string;
	};
}

export default function PageNotFoundFallBack(props: Props) {
	return (
		<div className="flex flex-col items-center justify-center min-h-screen text-center bg-gray-100 px-4">
			<legend className="text-8xl mb-6">{props.emoji}</legend>
			<h1 className="text-xl font-bold text-slate-800">{props.header}</h1>
			<p className="mt-4 text-md text-slate-600 leading-6">{props.children}</p>
			<Link
				href={props.link?.href || "/"}
				className="mt-6 px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors duration-200"
			>
				{props.link?.label}
			</Link>
		</div>
	);
}
