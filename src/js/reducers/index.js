import { combineReducers } from 'redux'

import institution from './institution.js'
import institutions from './institutions.js'
import filings from './filings.js'
import filingPeriod from './filingPeriod.js'
import submission from './submission.js'
import upload from './upload.js'
import confirmation from './confirmation.js'
import edits from './edits.js'
import irs from './irs.js'
import signature from './signature.js'
import summary from './summary.js'
import parseErrors from './parseErrors.js'
import pagination from './pagination.js'
import paginationFade from './paginationFade.js'
import error from './error.js'
import user from './user.js'

export default combineReducers({
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
  paginationFade,
  error,
  user
})
