import axiosConfig from "../../config/axiosConfig";
import Cookies from "universal-cookie";

const url = 'vendor-home/';

export const getDashboardData = async () => {
    const cookies = new Cookies();
    const userData = cookies.get('user');
    const userId = userData.id;
    return await axiosConfig.get(url + 'vendor-home-data/' + userId).then(res => {
        return res.data;
    }).catch((err) => {
        return {status: 'error', message: err.message};
    });
}