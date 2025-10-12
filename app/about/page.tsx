import { Metadata } from 'next';
import RedirectToHome from '../components/ui/RedirectToHome';

export const metadata: Metadata = {
  title: 'About - Noble Enterprises',
  description: 'Learn about Noble Enterprises - redirecting to homepage about section.',
};

export default function AboutPage() {
  return <RedirectToHome section="about" />;
}