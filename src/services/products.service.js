import axios from 'axios';

export const ProductsService = {
	getProducts: async query => {
		try {
			const response = await axios.get(
				`https://vpic.nhtsa.dot.gov/api/vehicles/GetParts?name=${query}&format=json`
			);

			return response.data;
		} catch (error) {
			console.log(error);
		}
	},
	getDetailsProduct: async id => {
		try {
			const response = await axios.get(
				`https://vpic.nhtsa.dot.gov/api/vehicles/getmanufacturerdetails/${id}?format=json`
			);
			return response.data;
		} catch (error) {
			console.log(error);
		}
	},
};
