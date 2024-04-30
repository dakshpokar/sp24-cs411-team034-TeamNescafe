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
			params,
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
	submitApplication: async (data) =>
		post('customer/submit_application', data, true),
	listProperties: async (params) =>
		get('customer/list_properties', true, params),
	myApplications: async () => get('customer/my_applications', true),
	agentDashboard: async () => get('agent/get_unit_app_count', true),
	getRoommates: async () => get('customer/get_roommates', true),
	unitDetails: async (params) =>
		get('agent/get_unit_from_id', true, params),
	applicationStatus: async (params) =>
		get('customer/check_application_status', true, params),
	propertyDetails: async (params) =>
		get('customer/get_property_from_id', true, params),
	addReview: async (data) =>
		post('customer/add_review', data, true),
	addPreferences: async (data) =>
		post('customer/submit_preferences', data, true),
	getApplications: async (data) =>
		get('agent/get_applications_for_unit', true, data),
	updateApplication: async (data) =>
		post('agent/update_application', data, true),
	advancedPropertiesFilter: async (params) =>
		get('customer/advanced_properties_filter', true, params),
	analyticsPopularProperties: async (params) => get('analytics/popular_properties', true, params),
	analyticsAppsPerUser: async () => get('analytics/apps_per_user', true),
	analyticsProperty: async (params) => get('analytics/property_ratings_by_area', true, params),
	analyticsPincode: async () => get('analytics/pincode_analytics', true),
};

export default apiService;
