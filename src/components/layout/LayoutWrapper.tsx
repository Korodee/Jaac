"use client";

import { usePathname } from "next/navigation";
import Header from "./Header";
import Footer from "./Footer";

export default function LayoutWrapper({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const isSuccessPage = pathname === "/success";

    return (
        <>
            {!isSuccessPage && <Header />}
            {children}
            {!isSuccessPage && <Footer />}
        </>
    );
}
