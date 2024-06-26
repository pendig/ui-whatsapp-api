import ProviderComponent from '@/components/layouts/provider-component';
import 'react-perfect-scrollbar/dist/css/styles.css';
import '../styles/tailwind.css';
import { Metadata } from 'next';
import { Nunito } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import SessionWrapper from '@/components/SessionWrapper';

export const metadata: Metadata = {
  title: {
    template: '%s | Whatsapp API',
    default: 'Whatsapp API',
  },
};
const nunito = Nunito({
  weight: ['400', '500', '600', '700', '800'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-nunito',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <SessionWrapper>
      <html lang="en">
        <body className={nunito.variable}>
          <ProviderComponent>{children}</ProviderComponent>
          <Toaster position="top-center" />
        </body>
      </html>
    </SessionWrapper>
  );
}
