import axios from 'axios';

const baseURL = process.env.BASEURL;
console.log('baseURL', baseURL);

const get = async (endpoint, isAuthorised = false, params = {}) => {
	let headers = {};
	try {
		if (isAuthorised) {
			const token = localStorage.getItem('token');
			headers = { Authorization: `${token}` };
		}

		const response = await axios.get(baseURL + endpoint, {
			headers,
			params
		});
		return response.data;
	} catch (error) {
		console.error('Error in GET request', error);
		throw error;
	}
};

const post = async (endpoint, data, isAuthorised = false) => {
	let headers = {};
	try {
		if (isAuthorised) {
			const token = localStorage.getItem('token');
			headers = { Authorization: `${token}` };
		}
		const response = await axios.post(baseURL + endpoint, data, {
			headers,
		});
		return response.data;
	} catch (error) {
		console.error('Error in POST request', error);
		throw error;
	}
};

const apiService = {
	login: async (data) => post('auth/login', data),
	signup: async (data) => post('auth/sign_up', data),
	listProperties: async () => get('customer/list_properties'),
	myApplications: async () => get('customer/my_applications', true),
	agentDashboard: async () => get('agent/get_unit_app_count', true),
	getRoommates: async () => get('customer/get_roommates', true),
	unitDetails: async (params) => get('agent/get_unit_from_id', true, params),
	propertyDetails: async (params) => get('customer/get_property_from_id', true, params)
};

export default apiService;
