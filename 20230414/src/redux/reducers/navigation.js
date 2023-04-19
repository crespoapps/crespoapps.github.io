import { GO_TO_PAGE } from "../actionTypes"

const initialState = {
    page: 'Keyz'
}

const navigation = (state = initialState, action) => {
    switch (action.type) {
        case GO_TO_PAGE: {
            return {
                ...state,
                page: action.payload.page
            }
        }
        default:
            return state;
    }
}

export default navigation
