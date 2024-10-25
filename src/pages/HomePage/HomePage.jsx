import { Toaster } from 'react-hot-toast';
import DocumentTitle from '../../components/DocumentTitle';

export default function HomePage() {
  return (
    <div>
      <DocumentTitle>Home page</DocumentTitle>
      <Toaster />
    </div>
  );
}
