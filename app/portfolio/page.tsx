import { Metadata } from 'next';
import RedirectToHome from '../components/ui/RedirectToHome';

export const metadata: Metadata = {
  title: 'Portfolio - Noble Enterprises',
  description: 'Our portfolio - redirecting to homepage portfolio section.',
};

export default function PortfolioPage() {
  return <RedirectToHome section="portfolio" />;
}