import React, { Component, PropTypes } from 'react'

const showConfirmation = (code) => {
  if(code < 11) return null;

  return (
    <div className="usa-alert usa-alert-success margin-top-0">
      <div className="usa-alert-body">
        <h3 className="usa-alert-heading">IRS report verified.</h3>
        <p className="usa-alert-text">You have verifed your IRS report.</p>
      </div>
    </div>
  )
}

const showWarning = (props) => {
  if(props.status.code > 9) return null

  return (
    <div className="usa-alert usa-alert-warning margin-top-0">
      <div className="usa-alert-body">
        <h3 className="usa-alert-heading">All edits haven't been verified.</h3>
        <p className="usa-alert-text">You can not verify the IRS report until all edits have been verified and the report has been generated.</p>
      </div>
    </div>
  )
}

const IRSReport = (props) => {
  if (!props.msas) return null
  const isChecked = props.status.code > 10 ? true : false
  const isDisabled = props.status.code > 9 ? false : true

  return (
    <div className="IRSReport" id="irs">
      <div className="padding-2 bg-color-gray-lightest">
        <h2 className="margin-top-0">Institution Register Summary</h2>
        <p className="usa-font-lead margin-top-half margin-bottom-0">All MSA/MDs where my institution has a home or branch office (and took loan/applications in that office) are listed on the IRS. Each MSA/MD listed is an MSA/MD in which we have a home or branch office. No depository institutions, including mortgage subsidiaries, are considered to have a branch office in any MSA/MD where they have acted.</p>
        <p className="usa-font-lead">Please review each of the <strong>{props.msas.length}</strong> MSA/MDs listed below. If you disagree please correct and re-upload the updated file.</p>
      </div>

      <div className="border margin-bottom-5 padding-1">
        {showWarning(props)}

        <table width="100%">
          <thead>
            <tr>
              <th colSpan="4"></th>
              <th colSpan="4">Loan Type</th>
              <th colSpan="3">Property Type</th>
              <th colSpan="3">Loan Purpose</th>
            </tr>
            <tr>
              <th>MSA/MD</th>
              <th>MSA/MD Name</th>
              <th>Total LARs</th>
              <th>Total Amt. <span>(in thousands)</span></th>
              <th>CONV</th>
              <th>FHA</th>
              <th>VA</th>
              <th>FSA/RHS</th>
              <th>1-4 Family</th>
              <th>MFD</th>
              <th>Multi-Family</th>
              <th>Home Purchase</th>
              <th>Home Improvement</th>
              <th>Refinance</th>
            </tr>
          </thead>
          <tbody>
            {props.msas.map((msa, i) => {
              return <tr key={i}>
                {Object.keys(msa).map((data, i) => {
                  return <td key={i}>{msa[data]}</td>
                })}
              </tr>
            })}
          </tbody>
        </table>

        <ul className="usa-unstyled-list">
          <li>
            <input id="irs-verify"
              name="irs-verify"
              type="checkbox"
              value="irs-verify"
              onChange={e => props.onIRSClick(e.target.checked)}
              checked={isChecked}
              disabled={isDisabled} />
            <label htmlFor="irs-verify" className="max-width-100">I have verified that all of the submitted data is correct and agree with the accuracy of the values listed.</label>
          </li>
        </ul>

        {showConfirmation(props.status.code)}
      </div>
    </div>
  )
}

IRSReport.propTypes = {
  msas: PropTypes.array,
  receipt: PropTypes.string,
  timestamp: PropTypes.number,
  status: PropTypes.object,
  onIRSClick: PropTypes.func.isRequired
}

IRSReport.defaultProps = {
  msas: [],
  status: {
    code: null
  }
}

export default IRSReport
