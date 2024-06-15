'use client';
import ContentAnimation from '@/components/layouts/content-animation';
import Footer from '@/components/layouts/footer';
import Header from '@/components/layouts/header';
import MainContainer from '@/components/layouts/main-container';
import Overlay from '@/components/layouts/overlay';
import ScrollToTop from '@/components/layouts/scroll-to-top';
import Sidebar from '@/components/layouts/sidebar';
import Portals from '@/components/portals';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function DefaultLayout({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();

  const router = useRouter();

  if (!session && typeof window !== 'undefined' && session !== undefined && session === null) {
    router.push('/auth/login');
    return null;
  }

  if (session) {
    return (
      <>
        {/* BEGIN MAIN CONTAINER */}
        <div className="relative">
          <Overlay />
          <ScrollToTop />

          {/* BEGIN APP SETTING LAUNCHER */}
          {/* <Setting /> */}
          {/* END APP SETTING LAUNCHER */}

          <MainContainer>
            {/* BEGIN SIDEBAR */}
            <Sidebar />
            {/* END SIDEBAR */}
            <div className="main-content flex min-h-screen flex-col">
              {/* BEGIN TOP NAVBAR */}
              <Header />
              {/* END TOP NAVBAR */}

              {/* BEGIN CONTENT AREA */}
              <ContentAnimation>{children}</ContentAnimation>
              {/* END CONTENT AREA */}

              {/* BEGIN FOOTER */}
              <Footer />
              {/* END FOOTER */}
              <Portals />
            </div>
          </MainContainer>
        </div>
      </>
    );
  }
}
