"use client";

import { useState, useEffect } from "react";

interface Props {
	headerTitle?: string;
	children?: React.ReactNode;
}

export default function PageTitleEl({ headerTitle, children }: Props) {
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) return null;

	return (
		<div className="p-4">
			<p className="font-bold text-xl">
				{children && <>{children}</>}
				{headerTitle && <span className="ml-1">{headerTitle}</span>}
			</p>
		</div>
	);
}
