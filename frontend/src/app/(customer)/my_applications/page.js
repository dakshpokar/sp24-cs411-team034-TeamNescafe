'use client';

import apiService from '@/controllers/apiService';
import { useState, useEffect } from 'react';

const MyApplications = () => {
	const [applications, setApplications] = useState([]);

	useEffect(() => {
		// Fetch applications data from an API
		// For demonstration purposes, let's assume applicationsData is the fetched data
		apiService.myApplications().then((applicationsData) => {
			setApplications(applicationsData);
		});
	}, []);

	return (
		<main className='flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6'>
			<div className='flex items-center'>
				<h1 className='font-semibold text-lg md:text-2xl'>
					My Applications
				</h1>
			</div>

			<div className='overflow-x-auto'>
				<table className='min-w-full'>
					<thead>
						<tr>
							<th className='px-4 py-2'>
								Apartment No
							</th>
							<th className='px-4 py-2'>
								Property Name
							</th>
							<th className='px-4 py-2'>Price</th>
							<th className='px-4 py-2'>Status</th>
						</tr>
					</thead>
					<tbody className='text-center'>
						{applications.map((application, index) => (
							<tr
								key={index}
								className={
									index % 2 === 0
										? 'bg-gray-100'
										: 'bg-white'
								}
							>
								<td className='border px-4 py-2'>
									{application.apartment_no}
								</td>
								<td className='border px-4 py-2 '>
									{application.property_name}
								</td>
								<td className='border px-4 py-2'>
									{application.price}
								</td>
								<td className='border px-4 py-2'>
									{application.status}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</main>
	);
};

export default MyApplications;
