import { Metadata } from 'next';
import RedirectToHome from '../components/ui/RedirectToHome';

export const metadata: Metadata = {
  title: 'Services - Noble Enterprises',
  description: 'Our services - redirecting to homepage services section.',
};

export default function ServicesPage() {
  return <RedirectToHome section="services" />;
}