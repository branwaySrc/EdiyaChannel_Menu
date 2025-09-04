"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

interface Props {
	title?: string;
}

export default function NavigationSection(props: Props) {
	const router = useRouter();
	return (
		<nav className="flex fixed top-0 w-full min-w-sm max-w-xl mx-auto gap-3 items-center py-3 px-2 bg-white border-b border-slate-200">
			<button className="block" type="button" onClick={() => router.back()}>
				<Image alt="backIcon" src={"/chevron-left.svg"} width={30} height={30} />{" "}
			</button>
			<div className="font-bold mb-1 text-lg">{props.title || "No Title"}</div>
		</nav>
	);
}
