'use client';
import { useState } from 'react';

export default function SignUp() {
  const [email_id, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [phone_number, setPhoneNumber] = useState('');
  const [gender, setGender] = useState('');
  const [date_of_birth, setDateOfBirth] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      email_id,
      password,
      first_name,
      last_name,
      phone_number,
      gender,
      date_of_birth
    };
    try {
		const response = await fetch('http://127.0.0.1:3000/api/sign_up', {
		  method: 'POST',
		  headers: {
			'Content-Type': 'application/json'
		  },
		  body: JSON.stringify(formData)
		});
		if (!response.ok) {
		  throw new Error('Network response was not ok');
		}
		const responseData = await response.json();
		console.log(responseData);
	  } catch (error) {
		console.error('There was a problem with the fetch operation:', error.message);
	  }  
	};

  return (
    <div>
      <h1>Sign Up</h1>
	  <div className='flex justify-center items-center h-screen'>
      <form onSubmit={handleSubmit}>
        <label>Email:</label>
        <input 
		className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
 		type="email" value={email_id} onChange={(e) => setEmail(e.target.value)} required />
        <br />
        <label>Password:</label>
        <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
		type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <br />
        <label>First Name:</label>
        <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
		type="text" value={first_name} onChange={(e) => setFirstName(e.target.value)} required />
        <br />
        <label>Last Name:</label>
        <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
		type="text" value={last_name} onChange={(e) => setLastName(e.target.value)} required />
        <br />
        <label>Phone Number:</label>
        <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
		type="text" value={phone_number} onChange={(e) => setPhoneNumber(e.target.value)} required />
        <br />
        <label>Gender:</label>
        <select className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
		value={gender} onChange={(e) => setGender(e.target.value)} required>
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        <br />
        <label>Date of Birth:</label>
        <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
		type="date" value={date_of_birth} onChange={(e) => setDateOfBirth(e.target.value)} required />
        <br />
			<div className='flex items-center justify-between'>
				<button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
				type="submit">Sign Up</button>
			</div>
      </form>
    </div>
	</div>
  );
}

