import axiosConfig from "../../config/axiosConfig";
import Cookies from "universal-cookie";

const url = 'payment/';

export const getAllPaymentLists = async () => {
    const cookies = new Cookies();
    const userData = cookies.get('user');

    return await axiosConfig.get(url + 'all-payments', {
        params: {
            fetchType: 'all',
            vendorId: userData.id,
        }
    }).then(res => {
        return res.data;
    }).catch((err) => {
        return {status: 'error', message: err.message};
    });
}