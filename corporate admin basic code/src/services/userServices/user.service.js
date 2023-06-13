import axiosConfig from "../../config/axiosConfig";
import Cookies from "universal-cookie";

const url = 'vendor-auth/';

export const vendorLogin = async (data) => {
    const login = await axiosConfig.post(url + 'vendor-login',data).then(res => {
        if(res.data.user !== undefined){
            return { status: 'success', data: res.data };
        }
        return { status: "error", message: "User not found." }
    }).catch((err) => {
        return { status: 'error', message: err.message };
    });

    return login;
}

export const getVendorDetails = async () => {
    const cookies = new Cookies();
    const userData = cookies.get('user');

    return axiosConfig.get('/users/' + userData.id).then(res => {
        if(res.data !== undefined){
            return { status: 'success', data: res.data };
        }
        return { status: "error", message: "User not found." }
    }).catch((err) => {
        return { status: 'error', message: err.message };
    });
}

export const skipThisMonthRequest = async () => {
    const cookies = new Cookies();
    const userData = cookies.get('user');

    return axiosConfig.post(url  + '/skip-this-month',{
        vendorId: userData.id
    }).then(res => {
        return res.data;
    }).catch((err) => {
        return { status: 'error', message: err.message };
    });
}