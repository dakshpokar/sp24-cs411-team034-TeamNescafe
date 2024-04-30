'use client';
import { useState } from 'react';
import apiService from '@/controllers/apiService';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from 'next/link';

	const AgentAnalytics = () => {
		const [bedrooms, setBedrooms] = useState('');
		const [bathrooms, setBathrooms] = useState('');
		const [properties, setProperties] = useState([]);
		const [userdata, setUserData] = useState([]);
		const [isLoading, setIsLoading] = useState(false);

		const handleBathroomChange = (e) => {
			setBathrooms(e.target.value);
		};
	
		const handleBedroomChange = (e) => {
			setBedrooms(e.target.value);
		};

		const [flag, setFlag] = useState(1);

		const changeFlag = (newFlag) => {
		  setFlag(newFlag);
		};

		const handleSubmit = (e) => {
			e.preventDefault();
			apiService
				.analyticsPopularProperties({ bathrooms:bathrooms, bedrooms:bedrooms })
				.then((props) => {
					setProperties(props);
				  }).then(changeFlag(2))
				.catch((error) => {
					setIsLoading(false);
					console.log(error);
					toast.error('Could not get data!');
				});
		};

		const handleSubmitAppsPerUser = (e) => {
			e.preventDefault();
			apiService
				.analyticsAppsPerUser()
				.then((props) => {
					setUserData(props);
				  }).then(changeFlag(3))
				.catch((error) => {
					setIsLoading(false);
					console.log(error);
					toast.error('Could not get data!');
				});
		};

		
	return (
		<main className='flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6'>
			<div className='flex items-center'>
				<h1 className='font-semibold text-lg md:text-2xl'>
					Analytics
				</h1>
			</div>
			<div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
			<form
						className='space-y-6'
						onSubmit={handleSubmit}
					>
						<div>
							<label
								className='block text-sm font-medium leading-6 text-gray-900'
							>
								Bedrooms
							</label>
							<div className='mt-2'>
								<input
									id='bedrooms'
									name='bedrooms'
									type="number"
									required
									value={bedrooms}
									onChange={handleBedroomChange}
									className='block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6'
								/>
							</div>
						</div>

						<div>
							<div className='flex items-center justify-between'>
								<label
									className='block text-sm font-medium leading-6 text-gray-900'
								>
									Bathrooms
								</label>
							</div>
							<div className='mt-2'>
								<input
									id='bathrooms'
									name='bathrooms'
									type="number"
									required
									value={bathrooms}
									onChange={handleBathroomChange}
									className='block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-400 sm:text-sm sm:leading-6'
								/>
							</div>
						</div>

						<div>
							<button
								type='submit'
								className='flex w-full justify-center rounded-md bg-orange-400 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600'
							>
								{"Popularity Ratio"}
							</button>
						</div>
					</form>
					<form
						className='space-y-6'
						onSubmit={handleSubmitAppsPerUser}
					>
					<div style={{ marginTop: '16px' }}>
							<button
								type='submit'
								className='flex w-full justify-center rounded-md bg-orange-400 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600'
							>
								{"Applications Per User"}
							</button>
						</div>
					</form>
					</div>

					<div>
      		{flag === 2 ? (
			<div className='overflow-x-auto'>
				<table className='min-w-full'>
					<thead>
						<tr>
							<th className='px-4 py-2'>
								Property Name
							</th>
							<th className='px-4 py-2'>
								Popularity Ratio
							</th>
						</tr>
					</thead>
					<tbody>
						{properties.map((properties, index) => (
							<tr
								key={index}
								className={
									index % 2 === 0
										? 'bg-gray-100'
										: 'bg-white'
								}
							>
								<td className='border px-4 py-2 text-center underline underline-offset-4'>
								<Link
										href={`/property_detail/${properties.property_id}`}
									>
									{properties.property_name}
									</Link>								
								</td>
								<td className='border px-4 py-2 text-center'>
									{properties.popularity_ratio}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>) : flag === 3 ? (
							<div className='overflow-x-auto'>
							<table className='min-w-full'>
								<thead>
									<tr>
										<th className='px-4 py-2'>
											Customer Email ID
										</th>
										<th className='px-4 py-2'>
											Phone Number
										</th>
										<th className='px-4 py-2'>
											Application Count
										</th>
									</tr>
								</thead>
								<tbody>
									{userdata.map((item, index) => (
										<tr
											key={index}
											className={
												index % 2 === 0
													? 'bg-gray-100'
													: 'bg-white'
											}
										>
											<td className='border px-4 py-2 text-center underline-offset-4'>
												{item.email_id}
											</td>
											<td className='border px-4 py-2 text-center'>
												{item.phone_number}
											</td>
											<td className='border px-4 py-2 text-center'>
												{item.Application_Count}
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
			) : (<p></p>)} </div>
		</main>
	);
};

export default AgentAnalytics;
