import { Metadata } from 'next';
import RedirectToHome from '../components/ui/RedirectToHome';

export const metadata: Metadata = {
  title: 'Contact - Noble Enterprises',
  description: 'Contact us - redirecting to homepage contact section.',
};

export default function ContactPage() {
  return <RedirectToHome section="contact" />;
}