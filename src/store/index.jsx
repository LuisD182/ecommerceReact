import { configureStore } from '@reduxjs/toolkit'
import cartSlice  from './slices/cart.slice'
import isLoadingSlice from './slices/isLoading.slice'
import productsSlice  from './slices/products.slice'
import  purchasesSlice  from './slices/purchasesSlice'

export default configureStore({
    reducer: {
        isLoading : isLoadingSlice,
        products : productsSlice,
        purchases : purchasesSlice,
        cart : cartSlice,
    }
})
