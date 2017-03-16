import React, { Component, PropTypes } from 'react'

const Summary = (props) => {
  if (!props.respondent || !props.file) return null

  return (
    <div className="Summary usa-grid-full" id="summary">
      <header>
        <h2>HMDA Filing Summary</h2>
        <p className="usa-font-lead">You have completed the verification process for your HMDA data. Please review the respondent and file information below from your HMDA file.</p>
      </header>
      <div className="info usa-grid-full">
        <div className="usa-width-one-half">
          <h3>Respondent Information</h3>
          <dl>
            <dt>Name:</dt>
            <dd>{props.respondent.name}</dd>
            <dt>Respondent ID:</dt>
            <dd>{props.respondent.id}</dd>
            <dt>Tax ID:</dt>
            <dd>{props.respondent.taxId}</dd>
            <dt>Agency:</dt>
            <dd>{props.respondent.agency}</dd>
            <dt>Contact Name:</dt>
            <dd>{props.respondent.contact && props.respondent.contact.name}</dd>
            <dt>Phone:</dt>
            <dd>{props.respondent.contact && props.respondent.contact.phone}</dd>
            <dt>Email</dt>
            <dd>{props.respondent.contact && props.respondent.contact.email}</dd>
          </dl>
        </div>
        <div className="usa-width-one-half">
          <h3>File Information</h3>
          <dl>
            <dt>File Name:</dt>
            <dd>{props.file.name}</dd>
            <dt>Year:</dt>
            <dd>{props.file.year}</dd>
            <dt>Total Loans/Applications:</dt>
            <dd>{props.file.totalLARS}</dd>
          </dl>
        </div>
      </div>

      <hr />
    </div>
  )
}

Summary.propTypes = {
  respondent: PropTypes.object,
  file: PropTypes.object
}

export default Summary
