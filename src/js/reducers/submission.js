import { RECEIVE_SUBMISSION,REQUEST_SUBMISSION,UPDATE_STATUS,REFRESH_STATE } from '../constants'
import { UNINITIALIZED } from '../constants/statusCodes.js'

const defaultSubmission = {
  id: null,
  status: {
    code: UNINITIALIZED,
    message: ''
  },
  isFetching: false,
}

/*
 * Maintain the status of the current submission
 * Set isFetching to true when a request is made
 * Set isFetching to false and update the submission when new data is received
 * Update the submission status code and message when the upload completes or fails
 */
export default (state = defaultSubmission, action) => {
  let currentSubmission

  switch (action.type) {
    case RECEIVE_SUBMISSION:
      return {
        isFetching: false,
        id: action.id,
        status: action.status
      }
    case REQUEST_SUBMISSION:
      return {
        ...state,
        isFetching: true
      }
    case UPDATE_STATUS:
      return {
        ...state,
        status: action.status
      }
    case REFRESH_STATE:
      return defaultSubmission
    default:
      return state
  }
}
