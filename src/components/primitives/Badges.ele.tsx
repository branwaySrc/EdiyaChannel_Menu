function Iced() {
	return <span className="flex px-1 py-1 text-xs text-blue-700 rounded-xs">🧊 ICED</span>;
}

function Hot() {
	return <span className="flex px-1 py-1 text-xs text-red-700 rounded-xs">🔥 HOT</span>;
}

function Cream() {
	return <span className="flex px-1 py-1 text-xs  text-slate-700 rounded-xs">☁️CREAM</span>;
}

function Plain() {
	return <span className="flex px-1 py-1 text-xs  text-yellow-700 rounded-xs">🥯 PLAIN</span>;
}

const Badge = {
	Iced: Iced,
	Hot: Hot,
	Cream: Cream,
	Plain: Plain,
};

export default Badge;
