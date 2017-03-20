import {
  sendFetch,
  getInstitution,
  getInstitutions,
  getFiling,
  getFilingFromUrl,
  getSubmission,
  getLatestSubmission,
  createSubmission,
  getUploadUrl,
  getEdits,
  postEdit,
  getIRS,
  getSignature,
  postSignature,
  getSummary,
  postQuality,
  setAccessToken,
  getAccessToken,
  getParseErrors,
  getEditsOfType
} from '../api'
import * as types from '../constants'
import fileSaver from 'file-saver'

let latestSubmissionId
let currentFilingPeriod

export function hasHttpError(json) {
  return !json || json.httpStatus > 399 ?
    true :
    false
}

export function refreshState() {
  return {
    type: types.REFRESH_STATE
  }
}

export function updateStatus(status) {
  return {
    type: types.UPDATE_STATUS,
    status: status
  }
}

export function requestInstitutions() {
  return {
    type: types.REQUEST_INSTITUTIONS
  }
}

export function receiveInstitutions(data) {
  return {
    type: types.RECEIVE_INSTITUTIONS,
    institutions: data.institutions
  }
}

export function requestInstitution() {
  return {
    type: types.REQUEST_INSTITUTION
  }
}

export function receiveInstitution(data) {
  return {
    type: types.RECEIVE_INSTITUTION,
    institution: data.institution
  }
}

export function requestEditPost() {
  return {
    type: types.REQUEST_EDIT_POST
  }
}

export function receiveEditPost(data) {
  return {
    type: types.RECEIVE_EDIT_POST,
    data: data
  }
}

export function requestFiling() {
  return {
    type: types.REQUEST_FILING
  }
}

export function receiveFiling(data) {
  return {
    type: types.RECEIVE_FILING,
    filing: data
  }
}

export function receiveFilings() {
  return {
    type: types.RECEIVE_FILINGS
  }
}

export function updateFilingPeriod(filingPeriod) {
  filingPeriod = filingPeriod + ''
  currentFilingPeriod = filingPeriod

  return {
    type: types.UPDATE_FILING_PERIOD,
    filingPeriod: filingPeriod
  }
}

export function requestSubmission() {
  return {
    type: types.REQUEST_SUBMISSION
  }
}

export function receiveSubmission(data) {
  latestSubmissionId = data.id.sequenceNumber

  return {
    type: types.RECEIVE_SUBMISSION,
    ...data
  }
}

export function requestCSV() {
  return {
    type: types.REQUEST_CSV
  }
}
export function requestEditsByType() {
    return {
      type: types.REQUEST_EDITS_BY_TYPE
    }
}

export function receiveEditsByType(data) {
  return {
    type: types.RECEIVE_EDITS_BY_TYPE,
    edits: data
  }
}

export function receiveError(error) {
  return {
    type: types.RECEIVE_ERROR,
    error: error
  }
}

export function fetchVerifyQuality(checked) {
  return dispatch => {
    return postQuality(latestSubmissionId, checked)
      .then(json => {
        if(hasHttpError(json)) throw new Error(JSON.stringify(dispatch(receiveError(json))))
        return dispatch(verifyQuality(checked))
      })
      .catch(err => console.error(err))
  }
}

export function verifyQuality(checked) {
  return {
    type: types.VERIFY_QUALITY,
    checked: checked
  }
}

export function clearFilings() {
  return {
    type: types.CLEAR_FILINGS
  }
}

function checkErrors(file) {
  const errors = []
  if(file) {
    if(file.size === 0) {
      errors.push('The file you uploaded does not contain any data. Please check your file and re-upload.')
    }
    if(file.name.split('.').slice(-1)[0] !== 'txt') {
      errors.push('The file you uploaded is not a text file (.txt). Please check your file and re-upload.')
    }
  }
  return errors
}

export function selectNewFile(file) {
  return {
    type: types.SELECT_NEW_FILE,
    file
  }
}

export function selectFile(file) {
  return {
    type: types.SELECT_FILE,
    file,
    errors: checkErrors(file)
  }
}

export function showConfirm(id, filing, code, file) {
  return {
    type: types.SHOW_CONFIRM,
    showing: true,
    id,
    filing,
    code
  }
}

export function hideConfirm() {
  return {
    type: types.HIDE_CONFIRM,
    showing: false
  }
}

export function uploadStart() {
  return {
    type: types.UPLOAD_START
  }
}

export function uploadComplete(xhrLoadEvent) {
  return {
    type: types.UPLOAD_COMPLETE,
    xhrLoadEvent
  }
}

export function uploadError() {
  return {
    type: types.UPLOAD_ERROR
  }
}

export function requestIRS() {
  return {
    type: types.REQUEST_IRS
  }
}

export function receiveIRS(data) {
  return {
    type: types.RECEIVE_IRS,
    msas: data.msas,
    totals: data.totals
  }
}

export function getPaginationRequestAction(target) {
  switch(target) {
    case 'parseErrors':
    return requestParseErrors()
  }
}

export function getPaginationReceiveAction(target, data) {
  switch(target) {
    case 'parseErrors':
    return receiveParseErrors(data)
  }
}

export function fetchPage(target, pathname) {
  return dispatch => {
    dispatch(getPaginationRequestAction(target))
    return sendFetch({pathname: pathname})
      .then(json => {
        if(hasHttpError(json)) throw new Error(JSON.stringify(dispatch(receiveError(json))))
        return dispatch(getPaginationReceiveAction(target, json))
      })
      .catch(err => console.error(err))
  }
}

export function fetchIRS() {
  return dispatch => {
    dispatch(requestIRS())
    return getIRS(latestSubmissionId)
      .then(json => {
        if(hasHttpError(json)) throw new Error(JSON.stringify(dispatch(receiveError(json))))
        dispatch(receiveIRS(json))
        return dispatch(updateStatus(
          {
            code: 9,
            message: 'validated'
          }
        ))
      })
      .catch(err => console.error(err))
  }
}

/*
this is just to set the isFetching value to true
*/
export function requestSignature() {
  return {
    type: types.REQUEST_SIGNATURE
  }
}

export function receiveSignature(data) {
  return {
    type: types.RECEIVE_SIGNATURE,
    timestamp: data.timestamp,
    receipt: data.receipt
  }
}

export function requestSignaturePost() {
  return {
    type: types.REQUEST_SIGNATURE_POST
  }
}

export function receiveSignaturePost(data) {
  return {
    type: types.RECEIVE_SIGNATURE_POST,
    timestamp: data.timestamp,
    receipt: data.receipt
  }
}

/* this is only to track if the signature checkbox is checked or not */
export function checkSignature(checked) {
  return {
    type: types.CHECK_SIGNATURE,
    checked: checked.checked
  }
}

export function fetchSignature() {
  return dispatch => {
    dispatch(requestSignature())
    return getSignature(latestSubmissionId)
      .then(json => {
        if(hasHttpError(json)) throw new Error(JSON.stringify(dispatch(receiveError(json))))
        dispatch(receiveSignature(json))
        return dispatch(updateStatus(
          {
            code: json.status.code,
            message: json.status.message
          }
        ))
      })
      .catch(err => console.error(err))
  }
}

export function updateSignature(signed) {
  return dispatch => {
    dispatch(requestSignaturePost())
    return postSignature(latestSubmissionId, signed)
      .then(json => {
        if(hasHttpError(json)) throw new Error(JSON.stringify(dispatch(receiveError(json))))
        dispatch(receiveSignaturePost(json))
        return dispatch(updateStatus(
          {
            code: json.status.code,
            message: json.status.message
          }
        ))
      })
      .catch(err => console.error(err))
  }
}

export function requestSummary() {
  return {
    type: types.REQUEST_SUMMARY
  }
}

export function receiveSummary(data) {
  return {
    type: types.RECEIVE_SUMMARY,
    respondent: data.respondent,
    file: data.file
  }
}

export function fetchSummary() {
  return dispatch => {
    dispatch(requestSummary())
    return getSummary(latestSubmissionId)
      .then(json => {
        if(hasHttpError(json)) throw new Error(JSON.stringify(dispatch(receiveError(json))))
        return dispatch(receiveSummary(json))
      })
      .catch(err => console.error(err))
  }
}

export function requestParseErrors() {
  return {
    type: types.REQUEST_PARSE_ERRORS
  }
}

export function receiveParseErrors(data) {
  return {
    type: types.RECEIVE_PARSE_ERRORS,
    transmittalSheetErrors: data.transmittalSheetErrors,
    larErrors: data.larErrors,
    pagination: {
      count: data.count,
      total: data.total,
      _links: data._links
    }
  }
}

export function fetchParseErrors() {
  return dispatch => {
    dispatch(requestParseErrors())
    return getParseErrors(latestSubmissionId)
      .then(json => {
        if(hasHttpError(json)) throw new Error(JSON.stringify(dispatch(receiveError(json))))
        return dispatch(receiveParseErrors(json))
      })
      .catch(err => console.error(err))
  }
}

// downloading the csv edit reports, no reducer required
export function fetchCSV(institutionId, filing, submissionId) {
  return dispatch => {
    dispatch(requestCSV())
    return getEdits({
      id: institutionId,
      filing: filing,
      submission: submissionId,
      params: {
        format: 'csv'
      }
    })
    .then(csv => {
      if(hasHttpError(csv)) throw new Error(JSON.stringify(dispatch(receiveError(csv))))
      return fileSaver.saveAs(new Blob([csv], {type: 'text/csv;charset=utf-16'}), `${submissionId}-full-edit-report.csv`)
    })
    .catch(err => console.error(err))
  }
}

export function fetchCSVByType(type) {
  return dispatch => {
    dispatch(requestCSV())
    return getEdits({
      suffix: `/edits/${type}`,
      submission: latestSubmissionId,
      params: {
        format: 'csv'
      }
    })
    .then(csv => {
      if(hasHttpError(csv)) throw new Error(JSON.stringify(dispatch(receiveError(csv))))
      return fileSaver.saveAs(new Blob([csv], {type: 'text/csv;charset=utf-16'}), `${latestSubmissionId}-${type}-edit-report.csv`)
    })
    .catch(err => console.error(err))
  }
}

/*
 * Wire upload together with xhr so progress can be tracked
 */
export function requestUpload(file) {
  return dispatch => {
    var data = new FormData()
    data.append('file', file)

    var xhr = new XMLHttpRequest()

    xhr.addEventListener('load', e => {
      const uploadResponse = JSON.parse(e.target.response)

      dispatch(updateStatus({
        code: uploadResponse.status.code,
        message: uploadResponse.status.message
      }))

      if(e.target.status !== 202) {
        return dispatch(uploadError())
      }

      dispatch(uploadComplete(e))

      dispatch(pollForProgress())
    })

    xhr.open('POST', getUploadUrl(latestSubmissionId));
    xhr.setRequestHeader('Cache-Control', 'no-cache');
    xhr.setRequestHeader('Authorization', 'Bearer ' + getAccessToken());
    xhr.setRequestHeader('Accept', 'application/json');
    xhr.send(data);

    dispatch(uploadStart())
    return Promise.resolve()
  }
}

/*
 * Signal that submission state should be wiped and a new submission should be created
 */

//
export function createNewSubmission(id, period, page = null) {
  return dispatch => {
    dispatch(refreshState())
    return dispatch(fetchNewSubmission(id, period))
  }
}

/*
 * Signal the creation of a new submission which will be used for subsequent actions
 */

export function fetchNewSubmission(id, period) {
  return dispatch => {
    dispatch(requestSubmission())
    return createSubmission(id, period)
      .then(json => {
        return new Promise((resolve, reject) => {
          if(hasHttpError(json)) throw new Error(JSON.stringify(dispatch(receiveError(json))))
          dispatch(receiveSubmission(json))
          resolve()
        })
      })
      .catch(err => console.error(err))
  }
}

/*
 * Get the latest submission via the api and dispatch an action with the results
 */
export function fetchSubmission() {
  return dispatch => {
    dispatch(requestSubmission())
    return getLatestSubmission()
      .then(json => {
        if(!json || json.httpStatus === 500) throw new Error(JSON.stringify(dispatch(receiveError(json))))
        if(json.httpStatus === 404){
          const splitPath = json.path.split('/')
          return dispatch(fetchNewSubmission(splitPath[2], splitPath[4]))
        }else{
          return dispatch(receiveSubmission(json))
        }
      })
      .catch(err => console.error(err))
  }
}

export function pollForProgress() {
  const poller = dispatch => {
    return getLatestSubmission()
      .then(json => {
        if(hasHttpError(json)) throw new Error(JSON.stringify(dispatch(receiveError(json))))
        return dispatch(receiveSubmission(json))
      })
      .then(json => {
        if(json.status.code < 8 && json.status.code !== 5){
          setTimeout(() => poller(dispatch), 500)
        }
      })
      .catch(err => console.error(err))
  }
  return poller
}

/*
 * Get progress by fetching submission data at /institution/<id>/filings/<id>/submissions/<id>
 * This may be replaced by a call for just the status and not all of the submission data
 */
export function fetchProgress(id) {
  return dispatch => {
    return getSubmission(id)
      .then(json => {
        if(hasHttpError(json)) throw new Error(JSON.stringify(dispatch(receiveError(json))))
        return dispatch(receiveSubmission(json))
      })
      .catch(err => console.error(err))
  }
}

/*
 * Get high level institution data at /institutions
 * Then get filing data for each institution at /institutions/<id>
 */
export function fetchInstitutions() {
  return dispatch => {
    dispatch(requestInstitutions())
    return getInstitutions()
      .then(json => {
        if(hasHttpError(json)) throw new Error(JSON.stringify(dispatch(receiveError(json))))
        return dispatch(receiveInstitutions(json))
      })
      .then(receiveAction => {
        dispatch(fetchEachInstitution(receiveAction.institutions))
      })
      .catch(err => console.error(err))
  }
}

/*
 * Given a list of institutions, dispatch fetch instructions for each of them
 */
export function fetchEachInstitution(institutions) {
  return dispatch => {
    return Promise.all(
      institutions.map( institution => {
        dispatch(fetchInstitution(institution))
      })
    )
  }
}

/*
 * Fetch an institution via the api and dispatch an action with the results
 */
export function fetchInstitution(institution, fetchFilings = true) {
  return dispatch => {
    dispatch(requestInstitution())
    return getInstitution(institution.id)
      .then(json => {
        if(hasHttpError(json)) throw new Error(JSON.stringify(dispatch(receiveError(json))))
        dispatch(receiveInstitution(json))
        if(json.filings && fetchFilings){
          return dispatch(fetchEachFiling(json.filings))
        }
      })
      .catch(err => console.error(err))
  }
}

/*
 * Given a list of filings, dispatch fetch instructions for each
 */
export function fetchEachFiling(filings) {
  return dispatch => {
    dispatch(clearFilings())
    return Promise.all(
      filings.filter(filing => {
        return filing.period === currentFilingPeriod
      }).map(filing => {
        return dispatch(fetchFiling(filing))
      })
    ).then(() => dispatch(receiveFilings()))
  }
}

/*
 * Fetch the filing for the current filing period given an institution
 * and dispatch an action with the results
 */
export function fetchFiling(filing) {
  return dispatch => {
    dispatch(requestFiling())
    return getFiling(filing.institutionId, filing.period)
      .then(json => {
        if(hasHttpError(json)) throw new Error(JSON.stringify(dispatch(receiveError(json))))
        return dispatch(receiveFiling(json))
      })
      .catch(err => console.error(err))
  }
}

export function fetchEditsByType() {
  return dispatch => {
    dispatch(requestEditsByType())
    return getEdits({submission: latestSubmissionId})
      .then(json => {
        if(hasHttpError(json)) throw new Error(JSON.stringify(dispatch(receiveError(json))))
        return dispatch(receiveEditsByType(json))
      })
      .catch(err => console.error(err))
  }
}

export function justifyUpdate(data) {
  return dispatch => {
    dispatch(requestEditPost())
    return postEdit(latestSubmissionId, data)
      .then((json) => {
        if(hasHttpError(json)) throw new Error(JSON.stringify(dispatch(receiveError(json))))
        return dispatch(receiveEditPost(json))
      })
      .catch(err => console.error(err))
  }
}
