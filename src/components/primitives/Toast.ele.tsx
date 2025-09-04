import { TOAST_MESSAGES_DASHBOARD } from "@/components/dashboard";

interface Props {
	message?: string;
}

function Toast(props: Props) {
	return (
		<div className="fixed top-8 w-full min-w-sm max-w-xl mx-auto flex items-center justify-center">
			<article className="p-3 bg-slate-900 w-full text-center mx-8 rounded-lg">
				<span className="text-white font-bold text-sm">{props.message || "Something has happen"}</span>
			</article>
		</div>
	);
}

const ToastEl = {
	Saved: () => <Toast message={TOAST_MESSAGES_DASHBOARD.saved} />,
	Deleted: () => <Toast message={TOAST_MESSAGES_DASHBOARD.deleted} />,
};

export default ToastEl;
