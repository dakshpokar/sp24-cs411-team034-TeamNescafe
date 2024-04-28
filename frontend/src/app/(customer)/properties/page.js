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
import PropertyFilterModal from './components/filter_modal';

const Properties = () => {
	const [properties, setProperties] = useState([]);
	const [filteredProperties, setFilteredProperties] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [propertiesPerPage] = useState(6);
	const [isLoading, setIsLoading] = useState(true);
	const [search, setSearch] = useState('');
	const [filterModalOpen, setFilterModalOpen] = useState(false);
	const [filters, setFilters] = useState({});

	useEffect(() => {
		setIsLoading(true);
		apiService
			.listProperties()
			.then((propertiesData) => {
				setProperties(propertiesData);
				setFilteredProperties(propertiesData);
				setIsLoading(false);
			})
			.catch((error) => {
				console.error(
					'Error fetching properties data:',
					error
				);
				setIsLoading(false);
			});
	}, []);

	useEffect(() => {
		let filtered = properties.filter((property) => {
			return (
				property.property_name
					.toLowerCase()
					.includes(search.toLowerCase()) ||
				property.address
					.toLowerCase()
					.includes(search.toLowerCase()) ||
				property.pincode
					.toString()
					.includes(search.toLowerCase()) ||
				property.company_name
					.toLowerCase()
					.includes(search.toLowerCase())
			);
		});
		setFilteredProperties(filtered);
	}, [search]);

	useEffect(() => {
		setIsLoading(true);
		apiService
			.listProperties(filters)
			.then((propertiesData) => {
				setFilteredProperties(propertiesData);
				setIsLoading(false);
			})
			.catch((error) => {
				console.error(
					'Error fetching filtered properties data:',
					error
				);
				setIsLoading(false);
			});
	}, [filters]);

	const pageNumbers = [];
	for (
		let i = 1;
		i <= Math.ceil(filteredProperties.length / propertiesPerPage);
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
							? 'bg-orange-600 text-white'
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
								? 'bg-orange-600 text-white'
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
								? 'bg-orange-600 text-white'
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
								? 'bg-orange-600 text-white'
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
	const currentProperties = filteredProperties.slice(
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
			<div className='flex items-center'>
				<input
					type='text'
					placeholder='Search'
					className='p-2 border rounded-md mr-6'
					onChange={(e) => setSearch(e.target.value)}
				/>

				<button> </button>
				<button
					type='button'
					onClick={() => setFilterModalOpen(true)}
					class='text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800 inline-flex items-center'
				>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						fill='none'
						viewBox='0 0 24 24'
						strokeWidth={1.5}
						stroke='currentColor'
						className='w-5 h-5 mr-2'
					>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							d='M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z'
						/>
					</svg>
					Filter
				</button>
			</div>
			{/* Show Text with applied filters */}
			{Object.keys(filters).length > 0 && (
				<div className='flex items-center gap-2'>
					<p className='text-gray-500'>Filters Applied:</p>
					{Object.keys(filters).map(
						(key) =>
							filters[key] && (
								<p
									key={key}
									className='text-gray-700'
								>
									{key}: {filters[key]}
								</p>
							)
					)}
				</div>
			)}
			{isLoading && <SuiteMateLoader />}
			{!isLoading && currentProperties.length === 0 && (
				<p>No properties found</p>
			)}
			{!isLoading && currentProperties.length > 0 && (
				<div>
					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
						{currentProperties.map((property) => (
							<Link
								href={`/property/${property.property_id}`}
							>
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
										{property.address},{' '}
										{property.pincode}
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
								onClick={() =>
									paginate(currentPage - 1)
								}
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
								onClick={() =>
									paginate(currentPage + 1)
								}
								disabled={
									currentPage ===
									Math.ceil(
										filteredProperties.length /
											propertiesPerPage
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
			<PropertyFilterModal
				open={filterModalOpen}
				filters={filters}
				setOpen={() => {
					setFilterModalOpen(!filterModalOpen);
				}}
				applyFilters={(filters) => {
					setFilters(filters);
				}}
				resetFilters={() => {
					setFilters({});
				}}
			/>
		</main>
	);
};

export default Properties;
