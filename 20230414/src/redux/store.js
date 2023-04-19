import { configureStore } from '@reduxjs/toolkit'
import logger from '../middleware/logger'
import rootReducer from './reducers'

const store = configureStore({
    middleware: [logger],
    reducer: rootReducer
})

export default store
