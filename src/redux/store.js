import {combineReducers, configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import CategoriesSlice from './CategoriesSlice'
import MoneySlice from "./MoneySlice";
import AuthSlice from "./AuthSlice";

const combinedReducer = combineReducers({
    auth: AuthSlice,
    categories: CategoriesSlice,
    money: MoneySlice
});

const rootReducer = (state, action) => {
    if(action.type === "auth/logoutAsync/fulfilled") {
        return combinedReducer(undefined, action);
    }
    return combinedReducer(state, action);
}

export default configureStore({
    reducer: rootReducer,
    middleware: [...getDefaultMiddleware({
        serializableCheck: false
    })]
})