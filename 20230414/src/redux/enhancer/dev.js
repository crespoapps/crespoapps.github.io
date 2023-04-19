import { applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import logger from '../../middleware/logger'

const enhancer = (history) => compose(
    applyMiddleware(logger, thunkMiddleware)
)

export default enhancer
