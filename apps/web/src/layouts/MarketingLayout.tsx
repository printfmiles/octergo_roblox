import { Outlet } from 'react-router-dom';
import { Shell } from './Shell';
import { MarketingNav } from '../components/marketing/MarketingNav';
import { Footer } from '../components/marketing/Footer';

export function MarketingLayout() {
  return (
    <Shell>
      <MarketingNav />
      <Outlet />
      <Footer />
    </Shell>
  );
}
