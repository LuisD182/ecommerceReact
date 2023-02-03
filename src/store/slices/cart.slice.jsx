import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import getConfig from '../../utils/getConfig';
import { setIsLoading } from './isLoading.slice';

export const cartSlice = createSlice({
    name: 'cart',
    initialState: [],
    reducers: {
        setCart : (state, action) => {
                const cart = action.payload
                return cart
        }
    }
})


export const addProductsThunk = (aPurchase) => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios
        .post(`https://e-commerce-api-v2.academlo.tech/api/v1/cart`, aPurchase, getConfig())
        .then(res => dispatch(getCartThunk()))
        // .catch( () => alert("Please try again"))
        .finally(() => dispatch(setIsLoading(false)));
}

export const getCartThunk = () => dispatch => {
    dispatch(setIsLoading(true));
    return axios
        .get(`https://e-commerce-api-v2.academlo.tech/api/v1/cart`, getConfig())
        .then(res => dispatch(setCart(res.data)))
        .finally(() => dispatch(setIsLoading(false)));
}

export const purchaseCartThunk = () => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios
        .post('https://e-commerce-api-v2.academlo.tech/api/v1/purchases', {}, getConfig())
        .then(res => dispatch(getCartThunk()))
        .finally(() => dispatch(setIsLoading(false)));
}

export const deleteProductCartThunk = (id) => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios
        .delete(`https://e-commerce-api-v2.academlo.tech/api/v1/cart${id}`, getConfig())
        .then(() => dispatch(getCartThunk()))
        .finally(() => dispatch(setIsLoading(false)));
}


export const updateQuantityThunk = (id, quantity) => (dispatch) => {
    dispatch(setIsLoading(true));
    const body = {
        quantity: quantity
    }
    console.log(body);
    return axios
        .put(`https://e-commerce-api-v2.academlo.tech/api/v1/cart/${id}`, body, getConfig())
        .then(() => dispatch(getCartThunk()))
        .finally(() => dispatch(setIsLoading(false)));
}


export const { setCart } = cartSlice.actions;

export default cartSlice.reducer;
