import axiosConfig from "../../config/axiosConfig";
import Cookies from "universal-cookie";

const url = 'product/';

const cookies = new Cookies();
const userData = cookies.get('user');

export const createProductCategory = async (data) => {
    const create = await axiosConfig.post(url + 'create-product-category',data).then(res => {
        return res.data;
    }).catch((err) => {
        return { status: 'error', message: err.message };
    });

    return create;
}

export const getAllCategoryByVendor = async () => {

    return axiosConfig.get(url + 'product-category-list/' + userData.id, {
        params:{
            fetchType: "all"
        }
    }).then(res => {
        return res.data;
    }).catch((err) => {
        return { status: 'error', message: err.message };
    });
}

export const editProductCategory = async (data) => {
    return await axiosConfig.put(url + 'edit-product-category', data).then(res => {
        return res.data;
    }).catch((err) => {
        return {status: 'error', message: err.message};
    });
}

export const getAllSubCategoryByVendor = async (data) => {
    return axiosConfig.get(url + 'product-sub-category-by-vendor/' + userData.id, {
        params:{
            fetchType: "all"
        }
    }).then(res => {
        return res.data;
    }).catch((err) => {
        return { status: 'error', message: err.message };
    });
}

export const createProductSubCategory = async (data) => {
    const create = await axiosConfig.post(url + 'create-product-sub-category',data).then(res => {
        return res.data;
    }).catch((err) => {
        return { status: 'error', message: err.message };
    });

    return create;
}

export const editProductSubCategory = async (data) => {
    const edit = await axiosConfig.put(url + 'edit-product-sub-category',data).then(res => {
        return res.data;
    }).catch((err) => {
        return { status: 'error', message: err.message };
    });

    return edit;
}

export const createProduct = async (data) => {
    const create = await axiosConfig.post(url + 'create-product',data).then(res => {
        return res.data;
    }).catch((err) => {
        return { status: 'error', message: err.message };
    });

    return create;
}

export const getAllProductsByVendor = async () => {
    return axiosConfig.get(url + 'product-by-vendor/' + userData.id, {
        params:{
            fetchType: "all"
        }
    }).then(res => {
        return res.data;
    }).catch((err) => {
        return { status: 'error', message: err.message };
    });
}

export const fetchSubCategoryByCategory = async (categoryId) => {
    return axiosConfig.get('interest/sub-interest-by-id/' + categoryId, {
        params:{
            fetchType: "all"
        }
    }).then(res => {
        return res.data;
    }).catch((err) => {
        return { status: 'error', message: err.message };
    });
}

export const editProduct = async (data) => {
    const edit = await axiosConfig.post(url + 'edit-product',data).then(res => {
        return res.data;
    }).catch((err) => {
        return { status: 'error', message: err.message };
    });

    return edit;
}

export const removeProduct = async (data) => {
    const remove = await axiosConfig.post(url + 'delete-product',data).then(res => {
        return res.data;
    }).catch((err) => {
        return { status: 'error', message: err.message };
    });

    return remove;
}