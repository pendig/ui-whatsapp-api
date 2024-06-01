import AllSession from '@/components/all-session';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create Session',
};

const CreateSessionPage = () => {
  return <AllSession />;
};

export default CreateSessionPage;
