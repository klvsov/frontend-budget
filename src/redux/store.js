import {configureStore} from '@reduxjs/toolkit';
import categoriesSlice from './CategoriesSlice'
import MoneySlice from "./MoneySlice";

export default configureStore({
    reducer: {
        categories: categoriesSlice,
        money: MoneySlice
    },
})