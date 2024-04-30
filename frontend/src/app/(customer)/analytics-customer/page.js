'use client';
import { useState } from 'react';
import apiService from '@/controllers/apiService';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from 'next/link';
import { Line } from "react-chartjs-2";
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

	const CustomerAnalytics = () => {
		const [bedrooms, setBedrooms] = useState('');
		const [bathrooms, setBathrooms] = useState('');
		const [min_area, setMinArea] = useState('');
		const [max_area, setMaxArea] = useState('');
		const [properties, setProperties] = useState([]);
		const [propertydata, setPropertyData] = useState([]);
		const [pincodedata, setPincodeData] = useState([]);
		const [isLoading, setIsLoading] = useState(false);

		const handleBathroomChange = (e) => {
			setBathrooms(e.target.value);
		};
	
		const handleBedroomChange = (e) => {
			setBedrooms(e.target.value);
		};

		const handleMinArea = (e) => {
			setMinArea(e.target.value);
		};
	
		const handleMaxArea = (e) => {
			setMaxArea(e.target.value);
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

		const handleSubmitAnalytics = (e) => {
			e.preventDefault();
			apiService
				.analyticsProperty({ min_area:min_area, max_area:max_area })
				.then((props) => {
					setPropertyData(props);
				  }).then(changeFlag(3))
				.catch((error) => {
					setIsLoading(false);
					console.log(error);
					toast.error('Could not get data!');
				});
		};

		const handlePincodeAnalytics = (e) => {
			e.preventDefault();
			apiService
				.analyticsPincode()
				.then((props) => {
					setPincodeData(props);
				  }).then(changeFlag(4))
				.catch((error) => {
					setIsLoading(false);
					console.log(error);
					toast.error('Could not get data!');
				});

		};

		const chartData = {
			labels: pincodedata.map(d => d.pincode.toString()), 
			datasets: [
			  {
				label: 'Average Rent',
				data: pincodedata.map(d => d.avg_rent),
				backgroundColor: 'rgba(255, 99, 132, 0.6)', 
			  },
			  {
				label: 'Average Area',
				data: pincodedata.map(d => d.avg_area),
				backgroundColor: 'rgba(54, 162, 235, 0.6)',
			  },
			],
		  };		

	return (
		<main className='flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6'>
			<div className='flex items-center'>
				<h1 className='font-semibold text-lg md:text-2xl'>
					Analytics
				</h1>
			</div>
			<div className="flex mt-10 sm:mx-auto sm:w-full sm:max-w-sm justify-between">
      {/* Form for Popularity Ratio */}
      <form
        className="space-y-6"
        onSubmit={handleSubmit}
        style={{ flex: 1, marginRight: '16px' }}
      >
        <div>
          <label className="block text-sm font-medium leading-6 text-gray-900">
            Bedrooms
          </label>
          <div className="mt-2">
            <input
              id="bedrooms"
              name="bedrooms"
              type="number"
              required
              value={bedrooms}
              onChange={handleBedroomChange}
              className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label className="block text-sm font-medium leading-6 text-gray-900">
              Bathrooms
            </label>
          </div>
          <div className="mt-2">
            <input
              id="bathrooms"
              name="bathrooms"
              type="number"
              required
              value={bathrooms}
              onChange={handleBathroomChange}
              className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-400 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-orange-400 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
          >
            Popularity Ratio
          </button>
        </div>
      </form>

      {/* Form for Property Analytics */}
      <form
        className="space-y-6"
        onSubmit={handleSubmitAnalytics}
        style={{ flex: 1 }}
      >
        <div>
          <label className="block text-sm font-medium leading-6 text-gray-900">
            Minimum Area
          </label>
          <div className="mt-2">
            <input
              id="min_area"
              name="min_area"
              type="number"
              required
              value={min_area}
              onChange={handleMinArea}
              className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label className="block text-sm font-medium leading-6 text-gray-900">
              Maximum Area
            </label>
          </div>
          <div className="mt-2">
            <input
              id="max_area"
              name="max_area"
              type="number"
              required
              value={max_area}
              onChange={handleMaxArea}
              className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-400 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-orange-400 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
          >
            Property Analytics
          </button>
        </div>
      </form>
    </div>

      {/* Form for Pincode Analytics */}
      <form
        className="space-y-6"
        onSubmit={handlePincodeAnalytics}
        style={{ flex: 1 }}
      >
		<div>
          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-orange-400 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
          >
            Pincode Analytics
          </button>
        </div>
		</form>

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
										href={`/property/${properties.property_id}`}
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
										Property Name
									</th>
									<th className='px-4 py-2'>
										Pincode
									</th>
									<th className='px-4 py-2'>
										Average Rating
									</th>
									<th className='px-4 py-2'>
										Number of Reviews
									</th>
								</tr>
							</thead>
							<tbody>
								{propertydata.map((item, index) => (
									<tr
										key={index}
										className={
											index % 2 === 0
												? 'bg-gray-100'
												: 'bg-white'
										}
									>
										<td className='border px-4 py-2 text-center'>
										<Link
												href={`/property/${item.property_id}`}
											>
											{item.name}
											</Link>								
										</td>
										<td className='border px-4 py-2 text-center'>
											{item.pincode}
										</td>
										<td className='border px-4 py-2 text-center'>
											{item.avg_rating}
										</td>
										<td className='border px-4 py-2 text-center'>
											{item.num_reviews}
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
					) : flag === 4 ? (
						<div className='overflow-x-auto'>
						<div>
							<h2>Pincode Data Chart</h2>
							<Line data={chartData} />
							<Bar data={chartData} />
						</div>
						<table className='min-w-full'>
							<thead>
								<tr>
									<th className='px-4 py-2'>
										Pincode
									</th>
									<th className='px-4 py-2'>
										Min Area
									</th>
									<th className='px-4 py-2'>
										Max Area
									</th>
									<th className='px-4 py-2'>
										Avg Area
									</th>
									<th className='px-4 py-2'>
										Min Rent
									</th>
									<th className='px-4 py-2'>
										Max Rent
									</th>
									<th className='px-4 py-2'>
										Avg Rent
									</th>
								</tr>
							</thead>
							<tbody>
								{pincodedata.map((item, index) => (
									<tr
										key={index}
										className={
											index % 2 === 0
												? 'bg-gray-100'
												: 'bg-white'
										}
									>
										<td className='border px-4 py-2 text-center'>
											{item.pincode}
										</td>
										<td className='border px-4 py-2 text-center'>
											{item.min_area}
										</td>
										<td className='border px-4 py-2 text-center'>
											{item.max_area}
										</td>
										<td className='border px-4 py-2 text-center'>
											{item.avg_area}
										</td>
										<td className='border px-4 py-2 text-center'>
											{item.min_rent}
										</td>
										<td className='border px-4 py-2 text-center'>
											{item.max_rent}
										</td>
										<td className='border px-4 py-2 text-center'>
											{item.avg_rent}
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
					) :(<p></p>)} </div>
		</main>
	);
};

export default CustomerAnalytics;
