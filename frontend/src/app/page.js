'use client';
import Link from 'next/link';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
	const { push } = useRouter();

	useEffect(() => {
		const token = localStorage.getItem('token');
		const user = JSON.parse(localStorage.getItem('user'));

		if (token && user) {
			const roleType = user.role_type;
			if (roleType && roleType === 'Agent') {
				push('/dashboard');
			} else {
				push('/properties');
			}
		}
	});
	return (
		<main className='flex flex-col items-center justify-center min-h-screen p-24'>
			<h1 className='text-7xl font-bold text-center mb-6'>
				Suitemate
			</h1>
			<p className='text-lg text-center opacity-50 mb-12'>
				No more gloomy roomy!
			</p>
			<div className='grid gap-20 text-center lg:max-w-5xl lg:text-left lg:grid-cols-2'>
				<Link href='/login'>
					<h2 className='text-2xl font-semibold transition-transform group-hover:translate-x-1 motion-reduce:transform-none inline-block mb-6 lg:mb-0'>
						Login{' '}
						<span className='inline-block transition-transform '>
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
</svg>

						</span>
						
					</h2>
				</Link>
				<Link href='/register'>
					<h2 className='text-2xl font-semibold transition-transform group-hover:translate-x-1 motion-reduce:transform-none inline-block '>
						Register{' '}
						<span className='inline-block transition-transform'>
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
</svg>

						</span>
					</h2>
				</Link>
			</div>
		</main>
	);
}
