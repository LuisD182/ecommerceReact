import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPurchasesThunk } from '../store/slices/purchasesSlice';

const Purchases = () => {

    const reduxPurchases = useSelector( state => state.purchases )
    const dispatch = useDispatch();

    useEffect ( ()=>{
        dispatch(getPurchasesThunk())
    }, [] )
    console.log(reduxPurchases);

    return (
        <div>
            <h1>Purchases</h1>

        </div>
    );
};

export default Purchases;