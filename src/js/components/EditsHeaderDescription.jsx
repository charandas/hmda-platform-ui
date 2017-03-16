import React, { PropTypes } from 'react'

export const getText = (editType, count) => {
  let id = null
  let title = null
  let desc = null

  switch (editType) {
    case 'syntactical':
      id = 'syntactical'
      title = count === 1 ? 'Syntactical Edit' : 'Syntactical Edits'
      desc = 'Syntactical edits check whether the loan/application register is in the correct format and whether the data covers the correct filing year. The loan/application register cannot be submitted until the filer corrects all syntactical edit errors and reuploads the updated loan/application register to the HMDA Platform.'
      break
    case 'validity':
      id = 'validity'
      title = count === 1 ? 'Validity Edit' : 'Validity Edits'
      desc = 'Validity edits check whether there are valid values in each data field. The data cannot be submitted until errors identified by the validity edits are corrected. The loan/application register cannot be submitted until the filer corrects all validity edit errors and reuploads the updated loan/application register to the HMDA Platform.'
      break
    case 'quality':
      id = 'quality'
      title = count === 1 ? 'Quality Edit' : 'Quality Edits'
      desc = 'Quality edits check whether entries in the individual data fields or combinations of data fields conform to expected values. The loan/application register cannot be submitted until the filer either confirms the accuracy of all values flagged by quality edits in the HMDA Platform, or corrects the flagged values and reuploads the updated loan/application register to the HMDA Platform.'
      break
    case 'macro':
      id = 'macro'
      title = count === 1 ? 'Macro Edit' : 'Macro Edits'
      desc = 'Macro quality edits check whether the submitted loan/application register as a whole conforms to expected values. The loan/application register cannot be submitted until the filer either confirms the accuracy of all the values flagged by the macro quality edits in the HMDA Platform or corrects the flagged values and reuploads the updated loan/application register to the HMDA Platform.'
      break
    default:
      throw new Error('Unexpected edit type. Unable to create edit description')
  }

  return {id, title, desc}
}

export const renderCSVLink = ({ count, type, onDownloadClick }) => {
  if(count === 0) return null
  let linkText = type

  return (
    <p><a href="#" onClick={(e) => {
      e.preventDefault()
      onDownloadClick(type)
    }}>Download {linkText} edits (CSV)</a></p>
  )
}

const EditsHeaderDescription = (props) => {
  const { type, count } = props
  const { id, title, desc } = getText(type, count)
  const headingClass = count === 0 ? 'text-green' : 'text-secondary'

  return (
    <header className="EditsHeaderDescription" id={id}>
      <h2 className={headingClass}>{count} {title}</h2>
      <p className="usa-font-lead">{desc}</p>
      {renderCSVLink(props)}
    </header>
  )
}

EditsHeaderDescription.propTypes = {
  type: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
  onDownloadClick: PropTypes.func.isRequired
}

export default EditsHeaderDescription
