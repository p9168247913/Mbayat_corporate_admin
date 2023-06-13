import axiosConfig from "../../config/axiosConfig";
import Cookies from "universal-cookie";

const url = 'vendor-order/';

export const getAllVendorOrders = async () => {
    const cookies = new Cookies();
    const userData = cookies.get('user');
    return await axiosConfig.get(url + 'order-by-vendor/' + userData.id).then(res => {
        return res.data;
    }).catch((err) => {
        return {status: 'error', message: err.message};
    });
}

export const updateOrderStatus = async (data) => {
    return await axiosConfig.post(url + 'update-order-status',data).then(res => {
        return res.data;
    }).catch((err) => {
        return {status: 'error', message: err.message};
    });
}

export const createMysteryBox = async (data) => {
    return await axiosConfig.post(url + 'create-mystery-box',data).then(res => {
        return res.data;
    }).catch((err) => {
        return {status: 'error', message: err.message};
    });
}

export const getHistoryOfMysteryBox = async (vendorId) => {
    return await axiosConfig.get(url + 'history-of-mystery-box' ,{
        params:{
            vendorId,
        }
    }).then(res => {
        return res.data;
    }).catch((err) => {
        return {status: 'error', message: err.message};
    });
}

export const historyBoxByDate = async (vendorId,date) => {
    return await axiosConfig.get(url + 'get-mystery-box-by-date' ,{
        params:{
            vendorId,
            date,
        }
    }).then(res => {
        return res.data;
    }).catch((err) => {
        return {status: 'error', message: err.message};
    });
}