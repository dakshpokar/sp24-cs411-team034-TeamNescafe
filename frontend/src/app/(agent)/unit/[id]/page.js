'use client';
import {
	ChevronLeftIcon,
	ChevronRightIcon,
} from '@heroicons/react/20/solid';
import { useState, useEffect, useCallback } from 'react';
import apiService from '@/controllers/apiService';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UnitDetails = () => {
	const params = useParams();
	const { id } = params;
	const [unit, setUnit] = useState([]);

	const [applications, setApplications] = useState([]);
	const [applicationStatus, setApplicationStatus] = useState([]);

	useEffect(() => {
		apiService
			.unitDetails({ unit_id: id })
			.then((unitDetails) => {
				setUnit(unitDetails);
			})
			.then((abc) => {
				apiService
					.getApplications({ unit_id: id })
					.then((app) => {
						setApplications(app);
					});
			});
	}, []);

	const {
		apartment_no,
		area,
		availability,
		bathrooms,
		bedrooms,
		photos,
		price,
		property_name,
	} = unit;

	console.log(availability);

	const onAccept = (userId, unitId) => {
		toast.success('Application Accepted !');
		console.log(userId, unitId);
		apiService
			.updateApplication({
				unit_id: unitId,
				user_id: userId,
				status: 'approved',
			})
			.then((status) => {
				setApplicationStatus(status);
				window.location.reload();
			});
	};

	const onReject = (userId, unitId) => {
		toast.error('Application Rejected !');
		apiService
			.updateApplication({
				unit_id: unitId,
				user_id: userId,
				status: 'rejected',
			})
			.then((status) => {
				setApplicationStatus(status);
				window.location.reload();
			});
	};

	return (
		<>
			{!unit && <div>Loading</div>}
			{unit && photos && (
				<div className='flex flex-col'>
					<div className='min-w-full'>
						<h2 className='mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>
							{property_name}
						</h2>
					</div>
					<div className='flex gap-2'>
						<div className='flex flex-col m-2'>
							<div className='mb-8'>
								<Image
									src={photos[0]}
									width={500}
									height={500}
									alt={`Apartment ${apartment_no}`}
									className='w-full h-auto rounded-lg shadow-lg'
								/>
							</div>

							<table className='w-full border-collapse bg-white rounded-lg shadow-md'>
								<tbody>
									<tr>
										<td className='px-4 py-2 font-semibold'>
											Apartment No:
										</td>
										<td className='px-4 py-2'>
											{apartment_no}
										</td>
									</tr>
									<tr>
										<td className='px-4 py-2 font-semibold'>
											Area (sq ft):
										</td>
										<td className='px-4 py-2'>
											{area}
										</td>
									</tr>
									<tr>
										<td className='px-4 py-2 font-semibold'>
											Availability:
										</td>
										<td className='px-4 py-2'>
											{availability
												? 'Available'
												: 'Unavailable'}
										</td>
									</tr>
									<tr>
										<td className='px-4 py-2 font-semibold'>
											Bathrooms:
										</td>
										<td className='px-4 py-2'>
											{bathrooms}
										</td>
									</tr>
									<tr>
										<td className='px-4 py-2 font-semibold'>
											Bedrooms:
										</td>
										<td className='px-4 py-2'>
											{bedrooms}
										</td>
									</tr>
									<tr>
										<td className='px-4 py-2 font-semibold'>
											Price ($):
										</td>
										<td className='px-4 py-2'>
											{price.toFixed(2)}
										</td>
									</tr>
								</tbody>
							</table>
						</div>

						{/* Table to display the applications */}
						<div className='m-2 w-full'>
							<table className='w-full bg-white rounded-lg shadow-md '>
								<thead>
									<tr>
										<th className='px-16 py-3 border-b'>
											Name
										</th>
										<th className='px-16 py-3 border-b'>
											Email ID
										</th>
										<th className='px-16 py-3 border-b'>
											Status
										</th>
										<th className='px-16 py-3 border-b'>
											Actions
										</th>
									</tr>
								</thead>
								<tbody>
									{applications.map(
										(application, index) => (
											<tr
												key={index}
												className={
													index % 2 === 0
														? 'bg-gray-100'
														: 'bg-white'
												}
											>
												<td className='px-4 py-2 text-center'>
													{application.Name}
												</td>
												<td className='px-4 py-2 text-center'>
													{
														application.email_id
													}
												</td>

												<td className='text-center px-4 py-2'>
													{application.status ===
													'approved' ? (
														<span class='bg-green-100 text-green-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300'>
															Approved
														</span>
													) : application.status ===
													  'rejected' ? (
														<span class='bg-red-100 text-red-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300'>
															Rejected
														</span>
													) : (
														<span class='bg-yellow-100 text-yellow-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300'>
															Pending
														</span>
													)}
												</td>
												<td className='px-4 py-2  text-center  flex flex-col gap-2  h-full'>
													<button
														disabled={
															!availability ||
															application.status ===
																'approved'
														}
														className={` text-white rounded-lg px-3 py-1  ${
															!availability ||
															application.status ===
																'approved'
																? 'cursor-not-allowed bg-green-300'
																: 'bg-green-500 hover:bg-green-600'
														}`}
														onClick={() =>
															onAccept(
																application.user_id,
																application.unit_id
															)
														}
													>
														Accept
													</button>
													<button
														disabled={
															application.status ===
															'rejected'
														}
														className={` text-white rounded-lg px-3 py-1  ${
															application.status ===
															'rejected'
																? 'cursor-not-allowed bg-red-300 '
																: 'hover:bg-red-600 bg-red-500'
														}`}
														onClick={() =>
															onReject(
																application.user_id,
																application.unit_id
															)
														}
													>
														Reject
													</button>
												</td>
											</tr>
										)
									)}
								</tbody>
							</table>
						</div>
					</div>
					<ToastContainer />
				</div>
			)}
		</>
	);
};

export default UnitDetails;
