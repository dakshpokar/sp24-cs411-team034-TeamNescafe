'use client';
import { useState, useEffect } from 'react';
import apiService from '@/controllers/apiService';
import { useParams } from 'next/navigation';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import Link from 'next/link';

const PropertyDetails = () => {
	const params = useParams()
	const {id} = params;
	const [property, setProperty] = useState([]);
	const [review, setReview] = useState([]);
	const [rating, setRating] = useState([]);

	const handleReviewInput = (r) => {
		setReview(r);
	};

	const handleRatingInput = (r) => {
		setRating(r);
	};

	const handleAddReview = () => {
		const data = {
			"property_id": id,
			"comment": review,
			"rating": rating
		}
		apiService.addReview(data).then(()=>{
			window.location.reload();
		}).catch(() => {
			toast.error('Can\'t post multiple reviews for a property.');
		});

	};

	useEffect(() => {
		apiService.propertyDetails({property_id:id}).then((propertyDetails) => {
			setProperty(propertyDetails);
		});
	}, []);

	const { name, address, latitude, longitude, company_name, pincode, photos, avgRating, reviews, units } = property;

	return (<div> {!property && <div>Loading</div>}
		{ property && photos && 
		(<div className="max-w-2xl mx-auto p-4">
			<h2 className='py-6 font-bold'>
				{name}
			</h2>
		  <div className="mb-8">
			<img
			  src={photos[0]}
			  alt={`Property ${name}`}
			  className="w-full h-auto rounded-lg shadow-lg"
			/>
		  </div>

		  <table className="w-full border-collapse bg-white rounded-lg shadow-md">
			<tbody>
			  <tr>
				<td className="px-4 py-2 font-semibold">Company Name:</td>
				<td className="px-4 py-2">{company_name}</td>
			  </tr>
			  <tr>
				<td className="px-4 py-2 font-semibold">Average Rating:</td>
				<td className="px-4 py-2">{avgRating.toFixed(2)}/5</td>
			  </tr>
			  <tr>
				<td className="px-4 py-2 font-semibold">Address:</td>
				<td className="px-4 py-2">{address}</td>
			  </tr>
			  <tr>
				<td className="px-4 py-2 font-semibold">Pincode:</td>
				<td className="px-4 py-2">{pincode}</td>
			  </tr>
			</tbody>
		  </table>
		  <div className="w-full border-collapse rounded-lg shadow-md my-4 py-4">
			<h3 className="font-semibold p-2">Units:</h3>
			{units.map((unit, index) => (
				<Link href={`/unit_details/${unit.unit_id}`}>
					<p className='px-4 py-1'>{unit.apartment_no}</p>
				</Link>
			))}
		  </div>
		  <div className="my-4">
            <h3 className="font-semibold mb-2">Reviews</h3>
            {reviews.map((review, index) => (
              <div key={index} className="w-full border-collapse rounded-lg shadow-md my-4 py-4">
				<div className="flex justify-between items-center px-2">
					<p className="font-semibold px-2">{review.user_name}</p>
					<p className="px-2">{review.rating}/5</p>
				</div>
				<p className='px-4 py-1'>{review.comment}</p>
				<p className="text-sm text-gray-500 px-4 py-2">
					{new Date(review.created_at).toLocaleDateString()}
				</p>
			</div>
            ))}
			<input
				type="text"
				placeholder="Enter your review..."
				className="mb-2 border rounded p-2 w-full"
				onChange={(e) => handleReviewInput(e.target.value)}
			/>
			<select
				className="mb-2 border rounded p-2 w-full"
				onChange={(e) => handleRatingInput(e.target.value)}
				>
				<option value="">Select Rating</option>
				<option value="1">1</option>
				<option value="2">2</option>
				<option value="3">3</option>
				<option value="4">4</option>
				<option value="5">5</option>
				</select>
			<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
				onClick={() => handleAddReview()}>
				Add Review
			</button>
          </div>
		</div>)}
		<ToastContainer /></div>
	  );
};

export default PropertyDetails;
