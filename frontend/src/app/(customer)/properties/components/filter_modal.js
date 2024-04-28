import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

const PropertyFilterModal = ({
	open,
	filters,
	setOpen,
	applyFilters,
	resetFilters,
}) => {
	const [bedrooms, setBedrooms] = useState(filters.bedrooms || '');
	const [bathrooms, setBathrooms] = useState(
		filters.bathrooms || ''
	);
	const [pricemax, setMaxPrice] = useState(filters.pricemax || '');
	const [pricemin, setMinPrice] = useState(filters.pricemin || '');
	const [pincode, setPincode] = useState(filters.pincode || '');
	const [companyName, setCompanyName] = useState(
		filters.companyName || ''
	);

	const handleApplyFilters = () => {
		applyFilters({
			bedrooms,
			bathrooms,
			pricemax,
			pricemin,
			pincode,
			companyName,
		});
		setOpen(false);
	};

	const handleResetFilter = () => {
		resetFilters();
		setOpen(false);
	};

	return (
		<div>
			<Transition.Root show={open} as={Fragment}>
				<Dialog
					as='div'
					className='relative z-10'
					onClose={setOpen}
				>
					<Transition.Child
						as={Fragment}
						enter='ease-in-out duration-500'
						enterFrom='opacity-0'
						enterTo='opacity-100'
						leave='ease-in-out duration-500'
						leaveFrom='opacity-100'
						leaveTo='opacity-0'
					>
						<div className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
					</Transition.Child>

					<div className='fixed inset-0 overflow-hidden'>
						<div className='absolute inset-0 overflow-hidden'>
							<div className='pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10'>
								<Transition.Child
									as={Fragment}
									enter='transform transition ease-in-out duration-500 sm:duration-700'
									enterFrom='translate-x-full'
									enterTo='translate-x-0'
									leave='transform transition ease-in-out duration-500 sm:duration-700'
									leaveFrom='translate-x-0'
									leaveTo='translate-x-full'
								>
									<Dialog.Panel className='pointer-events-auto relative w-screen max-w-md'>
										<Transition.Child
											as={Fragment}
											enter='ease-in-out duration-500'
											enterFrom='opacity-0'
											enterTo='opacity-100'
											leave='ease-in-out duration-500'
											leaveFrom='opacity-100'
											leaveTo='opacity-0'
										>
											<div className='absolute left-0 top-0 -ml-8 flex pr-2 pt-4 sm:-ml-10 sm:pr-4'>
												<button
													type='button'
													className='relative rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white'
													onClick={() =>
														setOpen(false)
													}
												>
													<span className='absolute -inset-2.5' />
													<span className='sr-only'>
														Close panel
													</span>
													<XMarkIcon
														className='h-6 w-6'
														aria-hidden='true'
													/>
												</button>
											</div>
										</Transition.Child>
										<div className='flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl'>
											<div className='px-4 sm:px-6'>
												<Dialog.Title className='text-base font-semibold leading-6 text-gray-900'>
													Property Filters
												</Dialog.Title>
											</div>
											<div className='relative mt-6 flex-1 px-4 sm:px-6'>
												<div>
													<input
														type='text'
														value={
															bathrooms
														}
														placeholder='Bathrooms'
														className='p-2 mb-2 border rounded-md mr-6'
														onChange={(
															e
														) =>
															setBathrooms(
																e
																	.target
																	.value
															)
														}
													/>
													<input
														type='text'
														value={
															bedrooms
														}
														placeholder='Bedrooms'
														className='p-2 mb-2 border rounded-md mr-6'
														onChange={(
															e
														) =>
															setBedrooms(
																e
																	.target
																	.value
															)
														}
													/>

													<input
														type='text'
														value={
															pricemin
														}
														placeholder='Min. Price'
														className='p-2 mb-2 border rounded-md mr-6 mt-2'
														onChange={(
															e
														) =>
															setMinPrice(
																e
																	.target
																	.value
															)
														}
													/>
													<input
														type='text'
														value={
															pricemax
														}
														placeholder='Max. Price'
														className='p-2 mb-2 border rounded-md mr-6 mb-2'
														onChange={(
															e
														) =>
															setMaxPrice(
																e
																	.target
																	.value
															)
														}
													/>
													<input
														type='text'
														value={
															pincode
														}
														placeholder='Pincode'
														className='p-2 mb-2 border rounded-md mr-6'
														onChange={(
															e
														) =>
															setPincode(
																e
																	.target
																	.value
															)
														}
													/>
													<input
														type='text'
														value={
															companyName
														}
														placeholder='Company Name'
														className='p-2 mb-2 border rounded-md mr-6'
														onChange={(
															e
														) =>
															setCompanyName(
																e
																	.target
																	.value
															)
														}
													/>
												</div>
												<div className='mt-4'>
													<button
														type='button'
														onClick={() =>
															handleApplyFilters()
														}
														class='text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800 inline-flex items-center'
													>
														<svg
															xmlns='http://www.w3.org/2000/svg'
															fill='none'
															viewBox='0 0 24 24'
															stroke-width='1.5'
															stroke='currentColor'
															class='w-6 h-6'
														>
															<path
																stroke-linecap='round'
																stroke-linejoin='round'
																d='m4.5 12.75 6 6 9-13.5'
															/>
														</svg>
														Apply
													</button>
													<button
														type=''
														onClick={() =>
															handleResetFilter()
														}
														class='text-black bg-red focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800 inline-flex items-center'
													>
														<svg
															xmlns='http://www.w3.org/2000/svg'
															fill='none'
															viewBox='0 0 24 24'
															stroke-width='1.5'
															stroke='currentColor'
															class='w-6 h-6 mr-2'
														>
															<path
																stroke-linecap='round'
																stroke-linejoin='round'
																d='M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99'
															/>
														</svg>
														Reset
													</button>
												</div>
											</div>
										</div>
									</Dialog.Panel>
								</Transition.Child>
							</div>
						</div>
					</div>
				</Dialog>
			</Transition.Root>
		</div>
	);
};

export default PropertyFilterModal;
