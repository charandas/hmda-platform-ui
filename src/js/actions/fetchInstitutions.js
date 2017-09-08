import fetchEachInstitution from './fetchEachInstitution.js'
import receiveInstitutions from './receiveInstitutions.js'
import receiveError from './receiveError.js'
import hasHttpError from './hasHttpError.js'
import requestInstitutions from './requestInstitutions.js'
import { getInstitutions } from '../api/api.js'

function compare(a, b) {
  const idA = a.id.toUpperCase()
  const idB = b.id.toUpperCase()

  if (idA < idB) {
    return -1
  }
  if(idA > idB) {
    return 1
  }

  return 0
}

export default function fetchInstitutions() {
  return dispatch => {
    dispatch(requestInstitutions())
    return getInstitutions()
      .then(json => {
        return hasHttpError(json).then(hasError => {
          if(hasError){
            dispatch(receiveError(json))
            throw new Error(`${json.status}: ${json.statusText}`)
          }
          // sort
          console.log('response')
          console.log(json)
          const sorted = { institutions: json.institutions.sort(compare) }
          console.log('sorted')
          console.log(sorted)
          return dispatch(receiveInstitutions(json))
        })
      })
      .then(receiveAction => {
        return dispatch(fetchEachInstitution(receiveAction.institutions))
      })
      .catch(err => console.error(err))
  }
}
