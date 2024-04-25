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
	const params = useParams()
	const {id} = params;
	const [unit, setUnit] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [applications, setApplications] = useState([]);
	const [applicationStatus, setApplicationStatus] = useState([]);

	useEffect(() => {
		apiService.unitDetails({unit_id:id}).then((unitDetails) => {
			setUnit(unitDetails);
		}).then((abc) => {
            apiService.getApplications({unit_id:id}).then((app) => {
                setApplications(app);});
			});
	}, []);

	const { apartment_no, area, availability, bathrooms, bedrooms, photos, price, property_name } = unit;

	const onAccept = (userId, unitId) => {
		toast.success('Application Accepted !');
		console.log(userId, unitId);
		apiService.updateApplication({unit_id:unitId, user_id: userId, status:"approved"}).then((status) => {
			setApplicationStatus(status);
			window.location.reload();
		});
	  };
	  
	  const onReject = (userId, unitId) => {
		toast.error('Application Rejected !');
		apiService.updateApplication({unit_id:unitId, user_id: userId, status:"rejected"}).then((status) => {
			setApplicationStatus(status);
			window.location.reload();
		});
	  };

	return (<div> {!unit && <div>Loading</div>}
		{ unit && photos && 
		(<div className="max-w-lg mx-auto p-4">
			<div className='sm:mx-auto sm:w-full sm:max-w-sm'>
				<h2 className='mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>
					{property_name}
				</h2>
			</div>
		  <div className="mb-8">
			<img
			  src={photos[0]}
			  alt={`Apartment ${apartment_no}`}
			  className="w-full h-auto rounded-lg shadow-lg"
			/>
		  </div>
	
		  <table className="w-full border-collapse bg-white rounded-lg shadow-md">
			<tbody>
			  <tr>
				<td className="px-4 py-2 font-semibold">Apartment No:</td>
				<td className="px-4 py-2">{apartment_no}</td>
			  </tr>
			  <tr>
				<td className="px-4 py-2 font-semibold">Area (sq ft):</td>
				<td className="px-4 py-2">{area}</td>
			  </tr>
			  <tr>
				<td className="px-4 py-2 font-semibold">Availability:</td>
				<td className="px-4 py-2">{availability ? 'Available' : 'Unavailable'}</td>
			  </tr>
			  <tr>
				<td className="px-4 py-2 font-semibold">Bathrooms:</td>
				<td className="px-4 py-2">{bathrooms}</td>
			  </tr>
			  <tr>
				<td className="px-4 py-2 font-semibold">Bedrooms:</td>
				<td className="px-4 py-2">{bedrooms}</td>
			  </tr>
			  <tr>
				<td className="px-4 py-2 font-semibold">Price ($):</td>
				<td className="px-4 py-2">{price.toFixed(2)}</td>
			  </tr>
			</tbody>
		  </table>
		  <div className="max-w-lg mx-auto p-4">
      {/* Table to display the applications */}
      <table className="w-full border-collapse bg-white rounded-lg shadow-md">
        <thead>
          <tr>
            <th className="px-16 py-3 border-b">Name</th>
            <th className="px-16 py-3 border-b">Email ID</th>
            <th className="px-16 py-3 border-b">Status</th>
            <th className="px-16 py-3 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {applications.map((application, index) => (
            <tr key={index}>
              <td className="px-16 py-3 border-b">{application.Name}</td>
              <td className="px-16 py-3 border-b">{application.email_id}</td>
              <td className="px-16 py-3 border-b">{application.status}</td>
              <td className="px-16 py-3 border-b">
                <button
                  className="mr-2 bg-green-500 text-white rounded-lg px-3 py-1 hover:bg-green-600"
                  onClick={() => onAccept(application.user_id, application.unit_id)}
                >
                  Accept
                </button>
                <button
                  className="bg-red-500 text-white rounded-lg px-3 py-1 hover:bg-red-600"
                  onClick={() => onReject(application.user_id, application.unit_id)}
                >
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
	<ToastContainer />

		</div>)}</div>
	  );
};

export default UnitDetails;
