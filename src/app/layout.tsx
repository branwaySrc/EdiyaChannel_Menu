import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";
//
import MobileSheetLayout from "@/components/ui/global/layouts/MobileSheet.layout";
import HeaderSection from "@/components/ui/global/sections/Header.section";
import FooterSection from "@/components/ui/global/sections/Footer.section";
import InnerSheetLayout from "@/components/ui/global/layouts/InnerSheet.layout";

const notoSansKR = Noto_Sans_KR({
	variable: "--font-noto-sans-kr",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "이디야 월피동점 메뉴판",
	description: "이디야커피 월피동점",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${notoSansKR} antialiased`}>
				<MobileSheetLayout>
					<HeaderSection header="이디야 월피동점" />
					<InnerSheetLayout>{children}</InnerSheetLayout>
					<FooterSection />
				</MobileSheetLayout>
			</body>
		</html>
	);
}
