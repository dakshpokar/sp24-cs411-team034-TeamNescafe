'use client'
import { useEffect, useState } from 'react';
import './AgentDashboard.css';

export default function AgentDashboard() {
    const [dashboardData, setDashboardData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const apiUrl = 'http://127.0.0.1:5000/api/get_unit_app_count';

                const response = await fetch(apiUrl, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'lI3z0QiFuifJmPc8', 
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch data from API');
                }

                const data = await response.json();

                console.log('API response data:', data);

                if (Array.isArray(data)) {
                    setDashboardData(data);
                } else {
                    console.error('Expected array, got:', typeof data);
                }
            } catch (error) {
                console.error('Error fetching data from API:', error.message);
            }
        };

        fetchData();
    }, []); 

    return (
        <div className="agent-dashboard">
            <h1>Agent Dashboard</h1>
            <table className="dashboard-table">
                <thead>
                    <tr>
                        <th>Apartment Number</th>
                        <th>Property Name</th>
                        <th>Number of Applications</th>
                    </tr>
                </thead>
                <tbody>
                    {dashboardData.map((item) => (
                        <tr key={item.apartment_num}>
                            <td>{item.apartment_num}</td>
                            <td>{item.property_name}</td>
                            <td>{item.num_applications}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
