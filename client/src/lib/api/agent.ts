import axios from "axios";
import { store } from "../stores/store";
import { toast } from "react-toastify";
import { router } from "../../app/router/Routes";

const agent = axios.create({
	baseURL: import.meta.env.VITE_API_URL 
});

const sleep = (delay: number) => {
	return new Promise(resolve => setTimeout(resolve, delay));
};

agent.interceptors.request.use(config => {
	store.uiStore.isBusy();
	return config;
});

agent.interceptors.response.use(
	async response => {
		await sleep(1000);
		store.uiStore.isIdle();
		return response;
	},
	async error => {
		// console.log('axios error:' + error);
		// return Promise.reject(error);
		await sleep(1000);
		store.uiStore.isIdle();
		
		const { status, data } = error.response || {};
		switch(status) {
			case 400:
				if (data.errors){
					const modelStateErrors = [];
					for (const key in data.errors) {
						if (data.errors[key]) {
							modelStateErrors.push(data.errors[key]);
						}
					}
					throw modelStateErrors.flat();
				}else {
					toast.error(data.message || "Bad request - please check your input.");
				}
				break;
			case 401:
				toast.error("Unauthorized - please log in.");
				break;
			case 404:
				router.navigate("/not-found");
				break;
			case 500:
				router.navigate("/server-error", { state: { error: data } });
				break;
			default:
				toast.error("An unexpected error occurred - please try again.");
				break;
		}
		
		
		return Promise.reject(error);
	}
);

export default agent;