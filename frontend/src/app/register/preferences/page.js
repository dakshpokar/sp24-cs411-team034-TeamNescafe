'use client';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import apiService from '@/controllers/apiService';
import { useRouter } from 'next/navigation';

export default function Preferences() {
	const [dietary, setDietary] = useState('-');
	const [smoking, setSmoking] = useState('-');
	const [drinking, setDrinking] = useState('-');
	const [rent, setRent] = useState('-');
	const [employment, setEmployment] = useState('-');
	const [pet, setPet] = useState('-');
	const [cleanliness, setCleanliness] = useState('-');
	const [sleep, setSleep] = useState('-');
	const [guests, setGuests] = useState('-');
	const [lgbtq, setLgbtq] = useState('-');
	const [gamer, setGamer] = useState('-');
	const [gym, setGym] = useState('-');
	const [cooking, setCooking] = useState('-');
	const [music, setMusic] = useState('-');
	const { push } = useRouter();

	const handleSubmit = async (e) => {
		e.preventDefault();
		const formData = {
			dietary,
			smoking,
			drinking,
			rent,
			employment,
			pet,
			cleanliness,
			sleep,
			guests,
			lgbtq,
			gamer,
			gym,
			cooking,
			music
		};
		e.preventDefault();
		apiService
			.addPreferences(formData)
			.then((response) => {
				toast.success('Preferences Added !');
				console.log(response);
				push('/properties');
			})
			.catch((error) => {
				console.log(error);
				toast.error('Could not Add Preferences!');
			});
	};

	return (
		<div className='flex flex-col justify-center items-center h-screen'>
			<div className='sm:mx-auto sm:w-full sm:max-w-sm'>
				<h2 className='mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>
					Add your Preferences:
				</h2>
			</div>
			<form
				className='grid grid-cols-2 gap-4 mt-10 sm:mx-auto sm:w-full sm:max-w-sm'
				onSubmit={handleSubmit}
			>
				<div>
					<label
						htmlFor='dietary'
						className='block text-sm font-medium leading-6 text-gray-900'
					>
						Dietary
					</label>
					<select
						id='dietary'
						name='dietary'
						value={dietary}
						onChange={(e) => setDietary(e.target.value)}
						className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
					>
						<option value=''>Select Dietary Preference</option>
						<option value='Vegetarian'>Vegetarian</option>
						<option value='Non-vegetarian'>Non-Vegetarian</option>
						<option value='Vegan'>Vegan</option>
					</select>
				</div>
				<div>
					<label
						htmlFor='smoking'
						className='block text-sm font-medium leading-6 text-gray-900'
					>
						Smoking
					</label>
					<select
						id='smoking'
						name='smoking'
						value={smoking}
						onChange={(e) => setSmoking(e.target.value)}
						className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
					>
						<option value=''>Select Smoking Preference</option>
						<option value='Smoker'>Smoker</option>
						<option value='Non-smoker'>Non-Smoker</option>
					</select>
				</div>
				<div>
					<label
						htmlFor='drinking'
						className='block text-sm font-medium leading-6 text-gray-900'
					>
						Drinking
					</label>
					<select
						id='drinking'
						name='drinking'
						value={drinking}
						onChange={(e) => setDrinking(e.target.value)}
						className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
					>
						<option value=''>Select Drinking Preference</option>
						<option value='Drinker'>Drinker</option>
						<option value='Non-drinker'>Non-drinker</option>
					</select>
				</div>
				<div>
					<label
						htmlFor='rent'
						className='block text-sm font-medium leading-6 text-gray-900'
					>
						Rent
					</label>
					<select
						id='rent'
						name='rent'
						value={rent}
						onChange={(e) => setRent(e.target.value)}
						className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
					>
						<option value=''>Select Expected Rent</option>
						<option value='Under $500'>Under $500</option>
						<option value='$500 - $1000'>$500 - $1000</option>
						<option value='$1001 - $1500'>$1001 - $1500</option>
						<option value='Over $1500'>Over $1500</option>
						<option value='No budget'>No budget</option>
					</select>
				</div>
				<div>
					<label
						htmlFor='employment'
						className='block text-sm font-medium leading-6 text-gray-900'
					>
						Employment
					</label>
					<select
						id='employment'
						name='employment'
						value={employment}
						onChange={(e) => setEmployment(e.target.value)}
						className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
					>
						<option value=''>Select Employment Preference</option>
						<option value='Student'>Student</option>
						<option value='Employed'>Employed</option>
						<option value='Unemployed'>Unemployed</option>
					</select>
				</div>
				<div>
					<label
						htmlFor='pet'
						className='block text-sm font-medium leading-6 text-gray-900'
					>
						Pet-Friendly
					</label>
					<select
						id='pet'
						name='pet'
						value={pet}
						onChange={(e) => setPet(e.target.value)}
						className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
					>
						<option value=''>Pet-Friendly?</option>
						<option value='Yes'>Yes</option>
						<option value='No'>No</option>
					</select>
				</div>
				<div>
					<label
						htmlFor='cleanliness'
						className='block text-sm font-medium leading-6 text-gray-900'
					>
						Cleanliness
					</label>
					<select
						id='cleanliness'
						name='cleanliness'
						value={cleanliness}
						onChange={(e) => setCleanliness(e.target.value)}
						className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
					>
						<option value=''>Select Cleanliness Preference</option>
						<option value='Messy'>Messy</option>
						<option value='Somewhat clean'>Somewhat Clean</option>
						<option value='Very clean'>Very Clean</option>
					</select>
				</div>
				<div>
					<label
						htmlFor='sleep'
						className='block text-sm font-medium leading-6 text-gray-900'
					>
						Sleep
					</label>
					<select
						id='sleep'
						name='sleep'
						value={sleep}
						onChange={(e) => setSleep(e.target.value)}
						className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
					>
						<option value=''>Select Sleep Preference</option>
						<option value='Early riser'>Early-Riser</option>
						<option value='Night owl'>Night-Owl</option>
					</select>
				</div>
				<div>
					<label
						htmlFor='guests'
						className='block text-sm font-medium leading-6 text-gray-900'
					>
						Have Guests Over?
					</label>
					<select
						id='guests'
						name='guests'
						value={guests}
						onChange={(e) => setGuests(e.target.value)}
						className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
					>
						<option value=''>Select Guests Preference</option>
						<option value='Yes'>Yes</option>
						<option value='No'>No</option>
						<option value='Rarely'>Rarely</option>
					</select>
				</div>
				<div>
					<label
						htmlFor='lgbtq'
						className='block text-sm font-medium leading-6 text-gray-900'
					>
						LGBTQ+ Friendly
					</label>
					<select
						id='lgbtq'
						name='lgbtq'
						value={lgbtq}
						onChange={(e) => setLgbtq(e.target.value)}
						className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
					>
						<option value=''>Select LGBTQ+ Preference</option>
						<option value='Yes'>Yes</option>
						<option value='No'>No</option>
					</select>
				</div>
				<div>
					<label
						htmlFor='gamer'
						className='block text-sm font-medium leading-6 text-gray-900'
					>
						Gamer
					</label>
					<select
						id='gamer'
						name='gamer'
						value={gamer}
						onChange={(e) => setGamer(e.target.value)}
						className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
					>
						<option value=''>Select Gamer Preference</option>
						<option value='Yes'>Yes</option>
						<option value='No'>No</option>
					</select>
				</div>
				<div>
					<label
						htmlFor='gym'
						className='block text-sm font-medium leading-6 text-gray-900'
					>
						Gym
					</label>
					<select
						id='gym'
						name='gym'
						value={gym}
						onChange={(e) => setGym(e.target.value)}
						className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
					>
						<option value=''>Select Gym Preference</option>
						<option value='Yes'>Yes</option>
						<option value='No'>No</option>
					</select>
				</div>
				<div>
					<label
						htmlFor='cooking'
						className='block text-sm font-medium leading-6 text-gray-900'
					>
						Cooking
					</label>
					<select
						id='cooking'
						name='cooking'
						value={cooking}
						onChange={(e) => setCooking(e.target.value)}
						className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
					>
						<option value=''>Select Cooking Preference</option>
						<option value='Love cooking'>Love Cooking</option>
						<option value='Hate cooking'>Hate Cooking</option>
					</select>
				</div>
				<div>
					<label
						htmlFor='music'
						className='block text-sm font-medium leading-6 text-gray-900'
					>
						Music
					</label>
					<select
						id='music'
						name='music'
						value={music}
						onChange={(e) => setMusic(e.target.value)}
						className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
					>
						<option value=''>Select Music Preference</option>
						<option value='Rock'>Rock</option>
						<option value='Pop'>Pop</option>
						<option value='Indie'>Indie</option>
						<option value='Hip-hop'>Hip-hop</option>
						<option value='Electronic'>Electronic</option>
						<option value='Country'>Country</option>
						<option value='R&B'>R&B</option>
						<option value='Jazz'>Jazz</option>
						<option value='Classical'>Classical</option>
					</select>
				</div>
				<div className='col-span-2 flex justify-center'>
					<button
						type='submit'
						className='bg-orange-400 hover:bg-orange-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
					>
						Continue
					</button>
				</div>
			</form>
			<ToastContainer />
		</div>
	);
}
