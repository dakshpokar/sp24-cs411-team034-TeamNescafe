import '../globals.css';

import Link from 'next/link';

import { NavItem } from './nav-item';

export default function CustomerLayout({ children }) {
	return (
		<html lang='en' className='h-full bg-gray-50'>
			<body>
				<div className='fixed inset-0 grid min-h-screen w-full lg:grid-cols-[280px_1fr]'>
					<div className='hidden border-r bg-gray-100/40 lg:block dark:bg-gray-800/40'>
						<div className='flex h-full max-h-screen flex-col'>
							<div className='flex h-[60px] items-center border-b px-5'>
								<Link
									className='flex items-center gap-2 font-semibold'
									href='/'
								>
									{/* <Logo /> */}
									<span className='font-sans font-bold subpixel-antialiased text-2xl  '>
										Suitemate
									</span>
								</Link>
							</div>
							<div className='flex-1 overflow-auto py-2'>
								<nav className='grid items-start px-4 text-sm font-medium'>
									<NavItem where='/properties'>
										Properties
									</NavItem>
									<NavItem where='/roommates'>
										Roommates
									</NavItem>
									<NavItem where='/my_applications'>
										My Applications
									</NavItem>
									<NavItem where='/analytics-customer'>
										Analytics
									</NavItem>
								</nav>
							</div>
							<div className='pb-4'>
								<nav className='grid items-start px-4 text-sm font-medium'>
									<NavItem where='/logout'>
										Logout
									</NavItem>
								</nav>
							</div>
						</div>
					</div>
					<div className='flex flex-col overflow-auto'>
						{/* <header className='flex h-14 lg:h-[60px] items-center gap-4 border-b bg-gray-100/40 px-6 dark:bg-gray-800/40 justify-between lg:justify-end'>
				<Link className='flex items-center gap-2 font-semibold lg:hidden' href='/'>
				  <span className=''>Suitemate</span>
				</Link>
			  </header> */}
						{children}
					</div>
				</div>
			</body>
		</html>
	);
}
