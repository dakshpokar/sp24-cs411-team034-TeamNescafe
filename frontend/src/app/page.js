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
						<span className='inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none'>
							-&gt;
						</span>
					</h2>
				</Link>
				<Link href='/register'>
					<h2 className='text-2xl font-semibold transition-transform group-hover:translate-x-1 motion-reduce:transform-none inline-block'>
						Register{' '}
						<span className='inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none'>
							-&gt;
						</span>
					</h2>
				</Link>
			</div>
		</main>
	);
}
