const logger = store => next => action => {
    const result = next(action)
    const isReduxForm = typeof action !== 'function' && action.type.indexOf('redux-form') > 0
    if (isReduxForm) {
        return result
    }
    console.group(action.type)
    console.info('dispatching', action)
    console.log('next state', store.getState())
    console.groupEnd(action.type)
    return result
}

export default logger