import { connect } from 'react-redux'
import Upload from '../components/UploadForm.jsx'
import { selectFile, requestUpload, createNewSubmission } from '../actions'

function mapStateToProps(state) {
  const {
    uploading,
    file,
    errors
  } = state.app.upload || {
    uploading: false,
    file: null,
    errors: []
  }

  const filingPeriod = state.app.filingPeriod || null
  
  return {
    uploading,
    file,
    filingPeriod,
    errors
  }
}

function mapDispatchToProps(dispatch) {
  return {
    handleSubmit: (e, file) => {
      e.preventDefault()
      if(file){
        dispatch(requestUpload(file))
      }
    },

    setFile: e => {
      if(!e.target.files) return
      dispatch(selectFile(e.target.files[0]))
      e.target.value = null
    },

    refileLink: (id, period) => {
      dispatch(createNewSubmission(id, period))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Upload)
