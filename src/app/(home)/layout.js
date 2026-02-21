import Footer from "@/components/layout/Footer";
import NavBar from "@/components/layout/NavBar";
import StoreProvider from "../../../providers/StoreProvider";
import CookiePopup from "@/components/layout/CookiePopup";
import ErrorBoundary from "@/components/common/ErrorBoundary";
import { NavigationProgress } from "@/components/common/NavigationProgress";
import MobileNavigationGuard from "@/components/common/MobileNavigationGuard";
import { Suspense } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Enable ISR with 60-second revalidation instead of force-no-store
export const revalidate = 60;

export default function HomeLayout({ children }) {
  return (
    <main className="w-full flex flex-col">
      <ErrorBoundary>
        <StoreProvider>
          <Suspense fallback={null}>
            <NavigationProgress />
          </Suspense>
          <MobileNavigationGuard>
            <NavBar />
            {children}
            <Footer />
            <CookiePopup />
          </MobileNavigationGuard>
        </StoreProvider>
      </ErrorBoundary>
    </main>
  );
}

