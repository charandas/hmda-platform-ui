import getPaginationReceiveAction from './getPaginationReceiveAction.js'
import receiveError from './receiveError.js'
import hasHttpError from './hasHttpError.js'
import getPaginationRequestAction from './getPaginationRequestAction.js'

import { fetch } from '../api/fetch.js'

export default function fetchPage(target, pathname) {
  return dispatch => {
    dispatch(getPaginationRequestAction(target))
    return fetch({pathname: pathname})
      .then(json => {
        return new Promise(resolve => {
        setTimeout(() => resolve(hasHttpError(json).then(hasError => {
          if(hasError) throw new Error(JSON.stringify(dispatch(receiveError(json))))
          return dispatch(getPaginationReceiveAction(target, json))
        })), 0)
      })
      })
      .catch(err => console.error(err))
  }
}
