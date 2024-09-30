import axios from "axios";
import { getToken, removeToken, removeUser } from "../utils";

// Set up default config for http requests here
const axiosService = axios.create({
	baseURL: process.env.REACT_APP_API_URL,
});

axiosService.interceptors.request.use(async (config) => {
	const accessToken = getToken();
	if (accessToken) {
		config.headers["Authorization"] = `${accessToken}`;
	}

	return config;
})

axiosService.interceptors.response.use(
	(response) => {
		if (response && response.data) {
			return response.data;
		}
		return response;
	},
	(error) => {
		switch (error.response.status) {
			case 401:
				removeHeader("Authorization");
				removeToken()
				removeUser()
				window.location.href = "/login";

				break;
			case 500:
				if (error.response.data.message === 'jwt expired') {
					removeHeader("Authorization");
					removeToken()
					removeUser()
					window.location.href = "/login";
				}
				break;
			default:
				return Promise.reject(error);
		}
		return Promise.reject(error);
	}
);

const setHeader = (name, value) => {
	axiosService.defaults.headers.common[name] = value;
};

const removeHeader = (name) => {
	delete axiosService.defaults.headers.common[name];
};

export { axiosService, setHeader, removeHeader };
