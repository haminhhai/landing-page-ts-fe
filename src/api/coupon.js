import { axiosService } from "./axiosService";

const couponApi = {
    getPaginate(params) {
        const url = '/coupons';
        return axiosService.get(url, { params });
    },
    create(body) {
        const url = '/create-coupons';
        return axiosService.post(url, body);
    },
    take(body) {
        const url = '/take-coupon';
        return axiosService.post(url, body);
    },
    collectData(body) {
        const url = '/collect-customer';
        return axiosService.post(url, body);
    },
    update(id, body) {
        const url = `/coupon/${id}`;
        return axiosService.put(url, body);
    },
    delete(id) {
        const url = `/coupon/${id}`;
        return axiosService.delete(url);
    },
}

export default couponApi;