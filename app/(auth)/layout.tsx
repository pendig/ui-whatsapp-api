'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const { data: session } = useSession();

  const router = useRouter();

  if (session) {
    router.push('/session');
    return;
  }
  return <div className="min-h-screen text-black dark:text-white-dark">{children} </div>;
};

export default AuthLayout;
