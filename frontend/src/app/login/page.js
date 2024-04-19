'use client';
import { useState } from 'react';
import apiService from '@/controllers/apiService';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginPage = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const { push } = useRouter();

	const handleEmailChange = (e) => {
		setEmail(e.target.value);
	};

	const handlePasswordChange = (e) => {
		setPassword(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		apiService
			.login({ email, password })
			.then((response) => {
				if (response.token) {
					localStorage.setItem('token', response.token);
					localStorage.setItem(
						'user',
						JSON.stringify(response.user)
					);
					toast.success('Success Notification !');
					const user = localStorage.getItem('user');
					if (user) {
						const userObj = JSON.parse(user);

						const roleType = userObj.role_type;

						if (roleType === 'Agent') {
							push('/agent_dashboard');
						} else {
							push('/properties');
						}
					}
				}
			})
			.catch((error) => {
				console.log(error);
				toast.error('Could not Login!');
			});
	};

	return (
		<div className='flex justify-center items-center h-screen'>
			<form
				className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'
				onSubmit={handleSubmit}
			>
				<div className='mb-4'>
					<label
						className='block text-gray-700 text-sm font-bold mb-2'
						htmlFor='email'
					>
						Email
					</label>
					<input
						className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
						id='email'
						type='email'
						placeholder='Enter your email'
						value={email}
						onChange={handleEmailChange}
					/>
				</div>
				<div className='mb-6'>
					<label
						className='block text-gray-700 text-sm font-bold mb-2'
						htmlFor='password'
					>
						Password
					</label>
					<input
						className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
						id='password'
						type='password'
						placeholder='Enter your password'
						value={password}
						onChange={handlePasswordChange}
					/>
				</div>
				<div className='flex items-center justify-between'>
					<button
						className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
						type='submit'
					>
						Sign In
					</button>
				</div>
			</form>
			<ToastContainer />
		</div>
	);
};

export default LoginPage;
