'use client';
import {
	ChevronLeftIcon,
	ChevronRightIcon,
} from '@heroicons/react/20/solid';
import { useState, useEffect, useCallback } from 'react';
import apiService from '@/controllers/apiService';
import Image from 'next/image';
import SuiteMateLoader from '@/components/loader';
import Link from 'next/link';

const Properties = () => {
	const [properties, setProperties] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [propertiesPerPage] = useState(6); // Adjust this value as needed
	const [isLoading, setIsLoading] = useState(true);

	// const fetchOnce = useCallback(() => {
	// 	apiService.listProperties().then((propertiesData) => {
	// 		setProperties(propertiesData);
	// 	});
	// 	console.log('Calling Blach');
	// });
	useEffect(() => {
		// Fetch properties data from an API
		setIsLoading(true);
		apiService.listProperties().then((propertiesData) => {
			setProperties(propertiesData);
			setIsLoading(false);
		}).catch((error) => {
			console.error('Error fetching properties data:', error);
			setIsLoading(false);
		});
		// fetchOnce();
	}, []);

	const pageNumbers = [];
	for (
		let i = 1;
		i <= Math.ceil(properties.length / propertiesPerPage);
		i++
	) {
		pageNumbers.push(i);
	}

	const renderPageNumbers = () => {
		const totalPageCount = pageNumbers.length;
		const maxPageButtons = 5;

		if (totalPageCount <= maxPageButtons) {
			return pageNumbers.map((number) => (
				<button
					key={number}
					onClick={() => paginate(number)}
					className={`px-3 py-1 rounded-md focus:outline-none ${
						currentPage === number
							? 'bg-indigo-600 text-white'
							: 'bg-gray-200 text-gray-700 hover:bg-gray-300'
					}`}
				>
					{number}
				</button>
			));
		} else {
			const halfMaxButtons = Math.floor(maxPageButtons / 2);
			const startPage =
				currentPage - halfMaxButtons > 0
					? currentPage - halfMaxButtons
					: 1;
			const endPage =
				startPage + maxPageButtons - 1 <= totalPageCount
					? startPage + maxPageButtons - 1
					: totalPageCount;

			let pageButtons = [];

			if (startPage > 1) {
				pageButtons.push(
					<button
						key={1}
						onClick={() => paginate(1)}
						className={`px-3 py-1 rounded-md focus:outline-none ${
							currentPage === 1
								? 'bg-indigo-600 text-white'
								: 'bg-gray-200 text-gray-700 hover:bg-gray-300'
						}`}
					>
						1
					</button>
				);
				if (startPage > 2) {
					pageButtons.push(
						<span
							key='startEllipsis'
							className='px-3 py-1'
						>
							...
						</span>
					);
				}
			}

			for (let i = startPage; i <= endPage; i++) {
				pageButtons.push(
					<button
						key={i}
						onClick={() => paginate(i)}
						className={`px-3 py-1 rounded-md focus:outline-none ${
							currentPage === i
								? 'bg-indigo-600 text-white'
								: 'bg-gray-200 text-gray-700 hover:bg-gray-300'
						}`}
					>
						{i}
					</button>
				);
			}

			if (endPage < totalPageCount) {
				if (endPage < totalPageCount - 1) {
					pageButtons.push(
						<span key='endEllipsis' className='px-3 py-1'>
							...
						</span>
					);
				}
				pageButtons.push(
					<button
						key={totalPageCount}
						onClick={() => paginate(totalPageCount)}
						className={`px-3 py-1 rounded-md focus:outline-none ${
							currentPage === totalPageCount
								? 'bg-indigo-600 text-white'
								: 'bg-gray-200 text-gray-700 hover:bg-gray-300'
						}`}
					>
						{totalPageCount}
					</button>
				);
			}

			return pageButtons;
		}
	};

	const indexOfLastProperty = currentPage * propertiesPerPage;
	const indexOfFirstProperty =
		indexOfLastProperty - propertiesPerPage;
	const currentProperties = properties.slice(
		indexOfFirstProperty,
		indexOfLastProperty
	);

	const paginate = (pageNumber) => setCurrentPage(pageNumber);

	return (
		<main className='flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6'>
			<div className='flex items-center'>
				<h1 className='font-semibold text-lg md:text-2xl'>
					Properties
				</h1>
			</div>

			{isLoading && (<SuiteMateLoader />)}
			{!isLoading && currentProperties.length === 0 && <p>No properties found</p>}
			{!isLoading && currentProperties.length > 0 && (
				<div>
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
					{currentProperties.map((property) => (
							<Link href={`/property/${property.property_id}`}>
								<div
									key={property.property_id}
									className='bg-white rounded-lg shadow-md p-4'
								>
									<div className='relative w-full h-40 mb-4'>
										<Image
											src={property.photos[0]}
											layout='fill'
											alt='PropertyPhoto'
										/>
									</div>

									<h2 className='text-xl font-semibold mb-2'>
										{property.property_name}
									</h2>

									<p className='text-gray-600 mb-2'>
										{property.address}, {property.pincode}
									</p>

									<p className='text-gray-500'>
										{property.company_name}
									</p>
								</div>
							</Link>
						))}
				</div>

					{/* Pagination */}
					<div className='flex items-center justify-center mt-4'>
						<nav className='flex flex-wrap gap-2'>
							<button
								onClick={() => paginate(currentPage - 1)}
								disabled={currentPage === 1}
								className='px-3 py-1 bg-gray-200 rounded-md disabled:opacity-50'
							>
								<ChevronLeftIcon
									className='h-5 w-5'
									aria-hidden='true'
								/>
							</button>
							{renderPageNumbers()}
							<button
								onClick={() => paginate(currentPage + 1)}
								disabled={
									currentPage ===
									Math.ceil(
										properties.length / propertiesPerPage
									)
								}
								className='px-3 py-1 bg-gray-200 rounded-md disabled:opacity-50'
							>
								<ChevronRightIcon
									className='h-5 w-5'
									aria-hidden='true'
								/>
							</button>
						</nav>
					</div>
				</div>
			)}

		</main>
	);
};

export default Properties;
