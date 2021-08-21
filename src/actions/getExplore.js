import axios from 'axios';

export const GET_INFO = 'GET_INFO';

export const getExploreInfo = () => (dispatch) => {
	axios.get('https://api.recollect.today/explore').then((res) => {
		dispatch({
			type: GET_INFO,
			payload: {
				users: res.data.users,
			},
		});
	});
};
