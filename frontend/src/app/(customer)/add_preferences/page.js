'use client';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import apiService from '@/controllers/apiService';
import { useRouter } from 'next/navigation';

export default function AddPreferences() {
	const [email_id, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [first_name, setFirstName] = useState('');
	const [last_name, setLastName] = useState('');
	const [phone_number, setPhoneNumber] = useState('');
	const [gender, setGender] = useState('');
	const [date_of_birth, setDateOfBirth] = useState('');
	const { push } = useRouter();

	const handleSubmit = async (e) => {
		e.preventDefault();
		const formData = {
			email_id,
			password,
			first_name,
			last_name,
			phone_number,
			gender,
			date_of_birth,
		};
		e.preventDefault();
		apiService
			.addPreferences(formData)
			.then((response) => {
				toast.success('Preferences added Successfully !');
				console.log(response);
				push('/login');
			})
			.catch((error) => {
				console.log(error);
				toast.error('Could not Sign Up!');
			});
	};

	return (
		<div className='flex flex-col justify-center items-center h-screen'>
			<div className='sm:mx-auto sm:w-full sm:max-w-sm'>
				<h2 className='mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>
					Add your Preferences
				</h2>
			</div>
			<form
				className='grid grid-cols-2 gap-4 mt-10 sm:mx-auto sm:w-full sm:max-w-sm'
				onSubmit={handleSubmit}
			>
				<div>
					<label
						htmlFor='email'
						className='block text-sm font-medium leading-6 text-gray-900'
					>
						Email address
					</label>
					<input
						id='email'
						name='email'
						type='email'
						autoComplete='email'
						required
						value={email_id}
						onChange={(e) => setEmail(e.target.value)}
						className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
					/>
				</div>
				<div>
					<label
						htmlFor='password'
						className='block text-sm font-medium leading-6 text-gray-900'
					>
						Password
					</label>
					<input
						id='password'
						name='password'
						type='password'
						autoComplete='current-password'
						required
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
					/>
				</div>
				<div>
					<label
						htmlFor='first_name'
						className='block text-sm font-medium leading-6 text-gray-900'
					>
						First Name
					</label>
					<input
						id='first_name'
						name='first_name'
						type='text'
						autoComplete='given-name'
						required
						value={first_name}
						onChange={(e) => setFirstName(e.target.value)}
						className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
					/>
				</div>
				<div>
					<label
						htmlFor='last_name'
						className='block text-sm font-medium leading-6 text-gray-900'
					>
						Last Name
					</label>
					<input
						id='last_name'
						name='last_name'
						type='text'
						autoComplete='family-name'
						required
						value={last_name}
						onChange={(e) => setLastName(e.target.value)}
						className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
					/>
				</div>
				<div>
					<label
						htmlFor='phone_number'
						className='block text-sm font-medium leading-6 text-gray-900'
					>
						Phone Number
					</label>
					<input
						id='phone_number'
						name='phone_number'
						type='text'
						autoComplete='tel'
						required
						value={phone_number}
						onChange={(e) =>
							setPhoneNumber(e.target.value)
						}
						className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
					/>
				</div>
				<div>
					<label
						htmlFor='gender'
						className='block text-sm font-medium leading-6 text-gray-900'
					>
						Gender
					</label>
					<select
						id='gender'
						name='gender'
						required
						value={gender}
						onChange={(e) => setGender(e.target.value)}
						className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
					>
						<option value=''>Select Gender</option>
						<option value='Male'>Male</option>
						<option value='Female'>Female</option>
						<option value='Other'>Other</option>
					</select>
				</div>
				<div>
					<label
						htmlFor='date_of_birth'
						className='block text-sm font-medium leading-6 text-gray-900'
					>
						Date of Birth
					</label>
					<input
						id='date_of_birth'
						name='date_of_birth'
						type='date'
						required
						value={date_of_birth}
						onChange={(e) =>
							setDateOfBirth(e.target.value)
						}
						className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
					/>
				</div>
				<div className='col-span-2 flex justify-center'>
					<button
						type='submit'
						className='bg-orange-400 hover:bg-orange-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
					>
						Sign Up
					</button>
				</div>
			</form>
			<ToastContainer />
		</div>
	);
}
