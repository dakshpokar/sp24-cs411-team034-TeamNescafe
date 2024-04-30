'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/navigation'; // Import useRouter hook to handle navigation
import { usePathname } from 'next/navigation';

export function NavItem({ where, children }) {
	const pathname = usePathname();
	const { push } = useRouter();

	const handleLogout = () => {
		if (where === '/logout') {
			localStorage.removeItem('token');
			localStorage.removeItem('user');

			push('/');
		}
	};

	const itemClasses = clsx(
		'flex items-center gap-3 rounded-lg px-3 py-2 text-gray-900 transition-all hover:text-gray-600 dark:text-gray-50 dark:hover:text-gray-50',
		{
			'bg-gray-200 dark:bg-gray-800': pathname === where,
			
			'text-gray-500 bg-gray-200 hover:text-gray-700 hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-900 mt-2':
				where === '/logout', // Apply red color if 'where' is '/logout'
		}
	);

	return (
		<div onClick={handleLogout}>
			<Link
				href={where}
				prefetch={true}
				className={itemClasses}
			>
				{children}
			</Link>
		</div>
	);
}
