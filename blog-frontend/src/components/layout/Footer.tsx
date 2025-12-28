import Link from 'next/link';
import { siteConfig, footerLinks } from '@/lib/config';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <Link
              href="/"
              className="text-2xl font-serif font-semibold tracking-tight mb-4 block"
            >
              {siteConfig.title.split('.')[0]}
              <span className="text-gray-500">.Blog</span>
            </Link>
            <p className="text-gray-400 text-sm max-w-sm leading-relaxed">
              {siteConfig.description}
            </p>
          </div>

          {/* Sitemap Links */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest mb-4 text-gray-500">
              Sitemap
            </h4>
            <ul className="space-y-2 text-sm text-gray-300">
              {footerLinks.sitemap.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect Links */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest mb-4 text-gray-500">
              Connect
            </h4>
            <ul className="space-y-2 text-sm text-gray-300">
              {footerLinks.connect.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target={link.href.startsWith('http') ? '_blank' : undefined}
                    rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-500">
            © {currentYear} {siteConfig.title}. All rights reserved.
          </p>
          <p className="text-xs text-gray-600">
            Built with Next.js & Spring Boot
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
