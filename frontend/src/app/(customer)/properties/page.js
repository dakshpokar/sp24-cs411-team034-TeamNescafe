'use client';

import apiService from '@/controllers/apiService';
import Image from 'next/image';
import { useState, useEffect } from 'react';

const Properties = () => {
	const [properties, setProperties] = useState([]);

	useEffect(() => {
		// Fetch properties data from an API
		// For demonstration purposes, let's assume propertiesData is the fetched data
		apiService.listProperties().then((propertiesData) => {
			setProperties(propertiesData);
		});
	}, []);

	return (
		<main className='flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6'>
			<div className='flex items-center'>
				<h1 className='font-semibold text-lg md:text-2xl'>
					Properties
				</h1>
			</div>

			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
				{properties.map((property) => (
					<div
						key={property.property_id}
						className='bg-white rounded-lg shadow-md p-4'
					>
						{/* Placeholder image */}
						<div className='relative w-full h-40 mb-4 '>
							<Image
								src={property.photos[0]}
								layout='fill'
							/>
						</div>
						{/* Property name */}
						<h2 className='text-xl font-semibold mb-2'>
							{property.property_name}
						</h2>
						{/* Address, Zipcode */}
						<p className='text-gray-600 mb-2'>
							{property.address}, {property.pincode}
						</p>
						{/* Name of the company */}
						<p className='text-gray-500'>
							{property.company_name}
						</p>
					</div>
				))}
			</div>
		</main>
	);
};

export default Properties;
