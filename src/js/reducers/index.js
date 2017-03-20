import { combineReducers } from 'redux'
import {
  RECEIVE_ERROR,
  REFRESH_STATE,
  REQUEST_INSTITUTION,
  RECEIVE_INSTITUTION,
  REQUEST_INSTITUTIONS,
  RECEIVE_INSTITUTIONS,
  CLEAR_FILINGS,
  UPDATE_FILING_PERIOD,
  REQUEST_FILING,
  RECEIVE_FILING,
  RECEIVE_FILINGS,
  REQUEST_SUBMISSION,
  RECEIVE_SUBMISSION,
  SELECT_FILE,
  SELECT_NEW_FILE,
  SHOW_CONFIRM,
  HIDE_CONFIRM,
  PICK_SORT,
  UPLOAD_PROGRESS,
  UPLOAD_COMPLETE,
  UPLOAD_ERROR,
  REQUEST_EDITS_BY_TYPE,
  RECEIVE_EDITS_BY_TYPE,
  REQUEST_EDIT_POST,
  RECEIVE_EDIT_POST,
  REQUEST_IRS,
  RECEIVE_IRS,
  REQUEST_SIGNATURE,
  RECEIVE_SIGNATURE,
  REQUEST_SIGNATURE_POST,
  RECEIVE_SIGNATURE_POST,
  REQUEST_SUMMARY,
  RECEIVE_SUMMARY,
  VERIFY_QUALITY,
  UPDATE_STATUS,
  CHECK_SIGNATURE,
  REQUEST_PARSE_ERRORS,
  RECEIVE_PARSE_ERRORS
} from '../constants'

const defaultInstitution = {
  isFetching: false,
  id: '',
  name: ''
}

const defaultFilings = {
  filings: [],
  isFetching: false,
}

const defaultStatus = {
  code: 0,
  message: ''
}

const defaultSubmission = {
  id: null,
  status: defaultStatus,
  isFetching: false,
}

const defaultUpload = {
  uploading: false,
  file: null,
  newFile: null,
  errors: []
}

const defaultConfirmation = {
  showing: false,
  code: 0,
  id: null,
  filing: null
}

const defaultParseErrors = {
  isFetching: false,
  transmittalSheetErrors: [],
  larErrors: []
}

const defaultEdits = {
  isFetching: false,
  fetched: false,
  types: {
    syntactical: {edits: []},
    validity: {edits: []},
    quality: {edits: [], verified: false},
    macro: {edits: []}
  }
}

const defaultIRS = {
  isFetching: false,
  msas: [],
  totals: {}
}

const defaultSummary = {
  isFetching: false,
  respondent: {},
  file: {}
}

const defaultPagination = {
  parseErrors: null
}

const defaultError = null


//empty action logger, temporary / for debugging
export const auth = (state = {}, action) => {
  return state
}


export const error = (state = defaultError, action) => {
  switch(action.type) {
    case RECEIVE_ERROR:
    return action.error

    case REFRESH_STATE:
    return defaultError

    case '@@router/LOCATION_CHANGE':
    return defaultError

    default:
    return state
  }
}


export const institution = (state = defaultInstitution, action) => {
  switch(action.type) {
    case REQUEST_INSTITUTION:
    return {
      ...state,
      isFetching: true
    }

    case RECEIVE_INSTITUTION:
    return {
      isFetching: false,
      id: action.institution.id,
      name: action.institution.name
    }

    default:
    return state
  }
}


/*
 * Set isFetching to true when institutions are being requested
 * Set isFetching to false and populate the institutions key
 *   when data is received
 */
export const institutions = (state = {}, action) => {
  switch (action.type) {
  case REQUEST_INSTITUTIONS:
    return {
      ...state,
      isFetching: true
    }
  case RECEIVE_INSTITUTIONS:
    return {
      isFetching: false,
      institutions: action.institutions
    }
  default:
    return state
  }
}


/*
 * Populate a list with data on every filing period for each institution
 * When an filing data for an institution is received, it is added to the list
 * When clear filings is dispatched, empty the list
 */
export const filings = (state = defaultFilings, action) => {
  switch (action.type) {
  case REQUEST_FILING:
    return {
      ...state,
      isFetching: true
    }
  case RECEIVE_FILING:
    return {
      ...state,
      filings: [...state.filings, action.filing]
    }
  case CLEAR_FILINGS:
    return defaultFilings
  case RECEIVE_FILINGS:
      return {
        ...state,
        isFetching: false
      }
  default:
    return state
  }
}


/*
 * Set the default current filing period
 */
export const filingPeriod = (state = '2017', action) => {
  switch (action.type) {
  case UPDATE_FILING_PERIOD:
    return action.filingPeriod
  default:
    return state
  }
}


/*
 * Maintain data on the current upload
 */
export const upload = (state = defaultUpload, action) => {
  switch (action.type) {
  case SELECT_FILE:
    return {
      ...state,
      file: action.file,
      errors: action.errors
    }
  case SELECT_NEW_FILE:
    return {
      ...state,
      newFile: action.file
    }
  case REFRESH_STATE:
    return defaultUpload
  default:
    return state
  }
}


/*
 * Track confirmation modal for refiling
 */
export const confirmation = (state = defaultConfirmation, action) => {
  switch (action.type) {
  case SHOW_CONFIRM:
    return {
      showing: action.showing,
      id: action.id,
      filing: action.filing,
      code: action.code
    }
  case HIDE_CONFIRM:
    return {
      ...state,
      showing: action.showing,
    }
  default:
    return state
  }
}


/*
 * Maintain the status of the current submission
 * Set isFetching to true when a request is made
 * Set isFetching to false and update the submission when new data is received
 * Update the submission status code and message when the upload completes or fails
 */
export const submission = (state = defaultSubmission, action) => {
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
        status: status(state.status, action)
      }
    case REFRESH_STATE:
      return defaultSubmission
    default:
      return state
  }
}


export const status = (state = defaultStatus, action) => {
  switch(action.type) {
    case UPDATE_STATUS:
      return action.status
    default:
      return state
  }
}


export const edits = (state = defaultEdits, action) => {
  switch (action.type) {
    case REQUEST_EDITS_BY_TYPE:
      return {
        ...state,
        isFetching: true
      }
    case RECEIVE_EDITS_BY_TYPE:
      return {
        ...state,
        types: action.edits,
        isFetching: false,
        fetched: true
      }
    case RECEIVE_EDIT_POST: {
      const clonedState = {...state}
      const edits = []
      state.types.macro.edits.forEach((edit) => {
        if(edit.edit !== action.data.edit) edits.push(edit)
        else edits.push({
          ...edit,
          justifications: action.data.justifications
        })
      })

      clonedState.types.macro.edits = edits
      return clonedState
    }
    case VERIFY_QUALITY: {
      const clonedState = {...state}
      clonedState.types.quality.verified = action.checked
      return clonedState
    }
    case REFRESH_STATE: {
      return defaultEdits
    }
    default:
      return state
  }
}



export const irs = (state = defaultIRS, action) => {
  switch (action.type) {

    case REQUEST_IRS:
      return {
        ...state,
        isFetching: true
      }

    case RECEIVE_IRS:
      return {
        ...state,
        isFetching: false,
        msas: action.msas,
        totals: action.totals
      }

    default:
      return state
  }
}

const defaultSignature = {
  isFetching: false,
  timestamp: null,
  receipt: null,
  status: defaultSubmission.status,
  checked: false
}

export const signature = (state = defaultSignature, action) => {
  switch (action.type) {

    case REQUEST_SIGNATURE:
      return {
        ...state,
        isFetching: true
      }

    case RECEIVE_SIGNATURE:
      return {
        ...state,
        isFetching: false,
        timestamp: action.timestamp,
        receipt: action.receipt
      }

    case REQUEST_SIGNATURE_POST:
      return {
        ...state,
        isFetching: true
      }

    case RECEIVE_SIGNATURE_POST:
      return {
        ...state,
        isFetching: false,
        timestamp: action.timestamp,
        receipt: action.receipt
      }

    case CHECK_SIGNATURE:
      return {
        ...state,
        isFetching: false,
        checked: action.checked
      }

    default:
      return state
  }
}


export const summary = (state = defaultSummary, action) => {
  switch (action.type) {
    case REQUEST_SUMMARY:
      return {
        ...state,
        isFetching: true
      }

    case RECEIVE_SUMMARY:
      return {
        ...state,
        isFetching: false,
        respondent: action.respondent,
        file: action.file
      }

    default:
      return state
  }
}


export const parseErrors = (state = defaultParseErrors, action) => {
  switch(action.type) {
    case REQUEST_PARSE_ERRORS:
      return {
        ...state,
        isFetching: true
      }

    case RECEIVE_PARSE_ERRORS:
      return {
        isFetching: false,
        transmittalSheetErrors: action.transmittalSheetErrors,
        larErrors: action.larErrors
      }

    default:
      return state
  }
}


export const pagination = (state = defaultPagination, action) => {
  switch(action.type) {
    case RECEIVE_PARSE_ERRORS:
      return {
        ...state,
        parseErrors: action.pagination
      }

    default:
      return state
  }
}


export default combineReducers({
  auth,
  institution,
  institutions,
  filings,
  filingPeriod,
  submission,
  upload,
  confirmation,
  edits,
  irs,
  signature,
  summary,
  parseErrors,
  pagination,
  error
})
