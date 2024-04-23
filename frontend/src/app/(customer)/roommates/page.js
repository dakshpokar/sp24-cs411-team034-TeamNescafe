'use client';

import apiService from '@/controllers/apiService';
import { useState, useEffect } from 'react';

const Roommates = () => {
	const [roommates, setRoommates] = useState([]);
	const [filteredRoommates, setFilteredRoomates] = useState([]);
	const [search, setSearch] = useState('');

	useEffect(() => {
		apiService.getRoommates().then((roommatesData) => {
			setRoommates(roommatesData);
			setFilteredRoomates(roommatesData);
		});
	}, []);

	useEffect(() => {
		let filtered = roommates.filter((roommate) => {
			return roommate.first_name.toLowerCase().includes(search.toLowerCase()) || roommate.last_name.toLowerCase().includes(search.toLowerCase());
		})
		setFilteredRoomates(filtered);
	}, [search]);
	return (
		<main className='flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6'>
			<div className='flex items-center'>
				<h1 className='font-semibold text-lg md:text-2xl'>
					Roommates
				</h1>
			</div>
			<input type='text' placeholder='Search' className='p-2 border rounded-md' onChange={(e)=>setSearch(e.target.value)} />
			<div className='overflow-x-auto'>
				<table className='min-w-full'>
					<thead>
						<tr>
							<th className='px-4 py-2'>
								Name
							</th>
							<th className='px-4 py-2'>
								Similarity
							</th>
						</tr>
					</thead>
					<tbody className='text-center'>
						{filteredRoommates.map((roommate, index) => (
							<tr
								key={index}
								className={
									index % 2 === 0
										? 'bg-gray-100'
										: 'bg-white'
								}
							>
								<td className='border px-4 py-2'>
									{roommate.first_name} {roommate.last_name}
								</td>
								<td className='border px-4 py-2 '>
									{Math.round(roommate.similarity_ratio * 100)}%
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</main>
	);
}

export default Roommates;