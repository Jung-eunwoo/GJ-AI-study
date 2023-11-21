import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import contactReducer from './reducers/contactSlice'
import logger from 'redux-logger'

export default configureStore({
    reducer:{
        contact:contactReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger)
})