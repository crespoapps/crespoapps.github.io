import { GO_TO_PAGE } from "./actionTypes"

export const goToPage = page => ({
  type: GO_TO_PAGE,
  payload: {
    page
  }
})
