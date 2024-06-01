import TerminateSession from '@/components/terminate-session';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terminate Session',
};

const TerminateSessionPage = () => {
  return <TerminateSession />;
};

export default TerminateSessionPage;
