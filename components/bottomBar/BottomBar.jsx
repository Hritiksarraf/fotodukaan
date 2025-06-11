'use client';
import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Search, Help, ShoppingCart } from '@mui/icons-material';

export default function BottomBar() {
  const pathname = usePathname();

  const navItems = [
    { href: '/', label: 'Home', icon: <Home /> },
    { href: '/search', label: 'Search', icon: <Search /> },
    { href: '/contact', label: 'Help', icon: <Help /> },
    { href: '/yourOrder', label: 'Order', icon: <ShoppingCart /> },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-300 flex justify-around items-center py-2 shadow-md md:hidden z-50">
      {navItems.map(({ href, label, icon }) => {
        const isActive = pathname === href;
        return (
          <Link
            key={href}
            href={href}
            className={`flex flex-col items-center ${
              isActive ? 'text-blue-600' : 'text-gray-700 hover:text-black'
            }`}
          >
            {icon}
            <span className="text-xs">{label}</span>
          </Link>
        );
      })}
    </div>
  );
}
