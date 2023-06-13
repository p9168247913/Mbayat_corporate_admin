import axiosConfig from "../../config/axiosConfig";
import Cookies from "universal-cookie";

const url = 'interest/';

export const getUserByInterest = async () => {
    const cookies = new Cookies();
    const userData = cookies.get('user');
    const interestId = userData.interests[0] ? userData.interests[0].id : "";
    return await axiosConfig.get(url + 'get-user-by-interest/' + interestId, {
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