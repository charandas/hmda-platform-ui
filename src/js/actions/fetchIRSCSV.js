import fileSaver from 'file-saver'
import receiveError from './receiveError.js'
import hasHttpError from './hasHttpError.js'
import requestIRSCSV from './requestIRSCSV.js'
import { getIRSCSV } from '../api/api.js'

// downloading the IRS csv, no reducer required
export default function fetchIRSCSV(institutionId, filing, submissionId) {
  return dispatch => {
    dispatch(requestIRSCSV())
    return getIRSCSV({
      id: institutionId,
      filing: filing,
      submission: submissionId
    })
    .then(csv => {
      return hasHttpError(csv).then(hasError => {
        if(hasError){
          dispatch(receiveError(csv))
          throw new Error(`${csv.status}: ${csv.statusText}`)
        }
        return fileSaver.saveAs(new Blob([csv], {type: 'text/csv;charset=utf-16'}), `${submissionId}-irs-report.csv`)
      })
    })
    .catch(err => console.error(err))
  }
}
