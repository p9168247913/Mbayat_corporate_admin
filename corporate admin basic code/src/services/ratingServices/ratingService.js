import axiosConfig from "../../config/axiosConfig";
import Cookies from "universal-cookie";

const url = 'vendor-order/';

export const getAllRatingLists = async () => {
    const cookies = new Cookies();
    const userData = cookies.get('user');

    return await axiosConfig.get(url + 'product-reviews-by-vendor/' + userData.id).then(res => {
        return res.data;
    }).catch((err) => {
        return {status: 'error', message: err.message};
    });
}