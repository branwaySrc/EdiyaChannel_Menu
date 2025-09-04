import PageNotFoundFallBack from "@/components/ui/global/fall-backs/PageNotFound.fallback";

export default function NotFound() {
	return (
		<PageNotFoundFallBack emoji="😢" header="상품을 찾을 수 없습니다..." link={{ href: "/", label: "메뉴판으로 돌아가기" }}>
			존재하지 않는 상품의 페이지에 접속하셨거나,
			<br /> 상품이 삭제되었을 수 있습니다.
		</PageNotFoundFallBack>
	);
}
