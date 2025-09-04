import PageNotFoundFallBack from "@/components/ui/global/fall-backs/PageNotFound.fallback";

export default function NotFound() {
	return (
		<PageNotFoundFallBack emoji="😢" header="페이지를 찾을 수 없습니다..." link={{ href: "/", label: "홈으로 돌아가기 🏠" }}>
			요청하신 페이지가 존재하지 않거나,
			<br />
			주소가 잘못되었을 수 있습니다.
		</PageNotFoundFallBack>
	);
}
