import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LiquidNavbar, NimbusIcons, type LiquidNavItem } from '@/components/ui/liquid-glass-navbar';
import './Navbar.css';

const items: LiquidNavItem[] = [
  { label: 'Home', href: '/', icon: NimbusIcons.home, fx: 'glow' },
  { label: 'About', href: '/about', icon: NimbusIcons.user, fx: 'wave' },
  { label: 'Workshops', href: '/projects', icon: NimbusIcons.globe, fx: 'spin' },
  { label: 'Skills', href: '/skills', icon: NimbusIcons.drop, fx: 'drop' },
  { label: 'Contact', href: '/contact', icon: NimbusIcons.plane, fx: 'plane' },
];

export function Navbar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const active = items.findIndex(({ href }) => href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`));
  return (
    <header className="portfolio-navigation">
      <Link to="/" className="portfolio-navigation-brand" aria-label="Pacharaphum — Home">
        <img src="/logo.png" alt="" width="38" height="38" />
      </Link>
      <LiquidNavbar items={items} active={active} onChange={(_, item) => { if (item.href) navigate(item.href); }} tone="light" sound={false} className="portfolio-liquid-nav" />
      <Link to="/contact" className="portfolio-navigation-contact">ติดต่อ</Link>
    </header>
  );
}
export default Navbar;
