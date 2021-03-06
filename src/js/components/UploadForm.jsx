import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ValidationProgress from './ValidationProgress.jsx'
import Dropzone from 'react-dropzone'
import {
  CREATED,
  UPLOADING,
  SIGNED
} from '../constants/statusCodes.js'

export const renderValidationProgress = (props) => {
  if(props.code < UPLOADING && !props.uploading) return null
  return <ValidationProgress file={props.file} code={props.code} id={props.id}/>
}

export const renderErrors = (errors) => {
  if(errors.length === 0) return null

  return(
    <div className="usa-alert usa-alert-error" role="alert">
      <div className="usa-alert-body">
        <ul className="usa-alert-text">
          {errors.map((error, i) => {
            return(<li key={i}>{error}</li>)
          })}
        </ul>
      </div>
    </div>
  )
}

export const getDropzoneText = ({ code, errors, filename }) => {
  let howToMessage = 'To begin uploading a file, drag it into this box or click here.'
  if(code >= CREATED) {
    howToMessage = 'To begin uploading a new file, drag it into this box or click here.'
  }
  let message = <p>{howToMessage}</p>

  if(code >= UPLOADING) {
    message = howToMessage
  }

  if(code === SIGNED) {
    message = <div>
      <p>Your submission is complete.</p>
      <p className="file-selected">{howToMessage}</p>
    </div>
  }

  if(filename) {
    message = <div>
      <p><strong>{filename}</strong> selected.</p>
      <p className="file-selected">{howToMessage}</p>
    </div>

    if(errors.length > 0) {
      message = <div>
        <p><strong>{filename}</strong> can not be uploaded.</p>
        <p>{howToMessage}</p>
      </div>
    }

    if(code >= UPLOADING) {
      message = <div>
        <p>Submission of <strong>{filename}</strong> is currently in progess.</p>
        <p className="file-selected">{howToMessage}</p>
      </div>
    }

    if(code === SIGNED) {
      message = <div>
        <p>Your submission of <strong>{filename}</strong> is complete.</p>
        <p className="file-selected">{howToMessage}</p>
      </div>
    }
  }

  return <button onClick={e=>e.preventDefault()}>{message}</button>
}

export default class Upload extends Component {
  constructor(props) {
    super(props)

    // handle the onDrop to set the file and show confirmation modal
    this.onDrop = acceptedFiles => {
      const {
        code,
        showConfirmModal,
        setFile,
        setNewFile
      } = this.props

      if(code >= UPLOADING) {
        showConfirmModal()
        setNewFile(acceptedFiles)
      } else {
        setFile(acceptedFiles)
      }
    }
  }

  // keeps the info about the file after leaving /upload and coming back
  componentDidMount() {
    if(this.props.code >= UPLOADING) this.props.pollSubmission()
  }

  render() {
    const dropzoneText = getDropzoneText(this.props)

    return (
      <section className="UploadForm">
        {renderErrors(this.props.errors)}
        <section className="container-upload">
          <Dropzone
            disablePreview={true}
            onDrop={this.onDrop}
            multiple={false}
            className="dropzone">
            {dropzoneText}
          </Dropzone>
        </section>
        {renderValidationProgress(this.props)}
      </section>
    )
  }
}

Upload.propTypes = {
  setFile: PropTypes.func,
  setNewFile: PropTypes.func,
  showConfirmModal: PropTypes.func,
  pollSubmission: PropTypes.func,
  uploading: PropTypes.bool,
  filename: PropTypes.string,
  file: PropTypes.object,
  code: PropTypes.number,
  errors: PropTypes.array
}
