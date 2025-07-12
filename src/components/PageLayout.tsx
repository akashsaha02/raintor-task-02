"use client";

import { usePathname } from "next/navigation";
import PageHeader from "./PageHeader";
import PageFooter from "./PageFooter";

interface PageLayoutProps {
  children: React.ReactNode;
  hideHeader?: boolean;
  hideFooter?: boolean;
}

const PageLayout = ({
  children,
  hideHeader = false,
  hideFooter = false,
}: PageLayoutProps) => {
  const pathname = usePathname();

  return (
    <div className="flex flex-col min-h-screen">
      {!hideHeader && <PageHeader currentPath={pathname} />}

      <main className="flex-grow pt-20 md:pt-24">{children}</main>

      {!hideFooter && <PageFooter />}
    </div>
  );
};

export default PageLayout;
