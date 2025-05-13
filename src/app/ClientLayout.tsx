"use client";

import { usePathname } from "next/navigation";
import CustomCursor from "@/components/layout/CustomCursor";
import LayoutWrapper from "@/components/layout/LayoutWrapper";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isSchedulePage = pathname === "/schedule";

  return (
    <>
      <CustomCursor />
      {isSchedulePage ? (
        <main>{children}</main>
      ) : (
        <LayoutWrapper>
          <main>{children}</main>
        </LayoutWrapper>
      )}
    </>
  );
}
