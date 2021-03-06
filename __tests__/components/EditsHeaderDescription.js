jest.unmock('../../src/js/components/EditsHeaderDescription.jsx')

import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-addons-test-utils'
import Wrapper from '../Wrapper.js'
import EditsHeaderDescription, {
  getText,
  renderCSVLink
} from '../../src/js/components/EditsHeaderDescription.jsx'

describe('EditsHeaderDescription', function() {
  const header = TestUtils.renderIntoDocument(
    <Wrapper>
      <EditsHeaderDescription
        type="syntactical"
        count={1}
      />
    </Wrapper>
  )
  const headerNode = ReactDOM.findDOMNode(header)

  it('renders the header', function(){
    expect(headerNode).toBeDefined()
  })

  it('sets the prop appropriately', function(){
    expect(header.props.children.props.type).toEqual('syntactical')
    expect(header.props.children.props.count).toEqual(1)
  })
})

describe('getText', () => {
  it('throws error if bad type', () => {
    try {
      getText('thisIsNotAType', 1)
    } catch(err) {
      expect(err.message).toEqual('Unexpected edit type. Unable to create edit description')
    }
  })

  it('throws error if missing type', () => {
    try {
      getText('', 1)
    } catch(err) {
      expect(err.message).toEqual('Unexpected edit type. Unable to create edit description')
    }
  })

  const syntacticalDesc = 'Syntactical edits check whether the loan/application register is in the correct format and whether the data covers the correct filing year. The loan/application register cannot be submitted until the filer corrects all syntactical edit errors and reuploads the updated loan/application register to the HMDA Platform.'

  it('returns syntactical with 0 edits', () => {
    const returned = getText('syntactical', 0)
    expect(returned).toEqual({
      id: 'syntactical',
      title: 'Syntactical Edits',
      desc: syntacticalDesc
    })
  })

  it('returns syntactical with 1 edit', () => {
    const returned = getText('syntactical', 1)
    expect(returned).toEqual({
      id: 'syntactical',
      title: ' type of Syntactical Edit',
      desc: syntacticalDesc
    })
  })

  it('returns syntactical with 2 edits', () => {
    const returned = getText('syntactical', 2)
    expect(returned).toEqual({
      id: 'syntactical',
      title: ' types of Syntactical Edits',
      desc: syntacticalDesc
    })
  })

  const validityDesc = 'Validity edits check whether there are valid values in each data field. The data cannot be submitted until errors identified by the validity edits are corrected. The loan/application register cannot be submitted until the filer corrects all validity edit errors and reuploads the updated loan/application register to the HMDA Platform.'

  it('returns validity with 0 edits', () => {
    const returned = getText('validity', 0)
    expect(returned).toEqual({
      id: 'validity',
      title: 'Validity Edits',
      desc: validityDesc
    })
  })

  it('returns validity with 1 edit', () => {
    const returned = getText('validity', 1)
    expect(returned).toEqual({
      id: 'validity',
      title: ' type of Validity Edit',
      desc: validityDesc
    })
  })

  it('returns validity with 2 edits', () => {
    const returned = getText('validity', 2)
    expect(returned).toEqual({
      id: 'validity',
      title: ' types of Validity Edits',
      desc: validityDesc
    })
  })

  const qualityDesc = 'Quality edits check whether entries in the individual data fields or combinations of data fields conform to expected values. The loan/application register cannot be submitted until the filer either confirms the accuracy of all values flagged by quality edits in the HMDA Platform, or corrects the flagged values and reuploads the updated loan/application register to the HMDA Platform.'

  it('returns quality with 0 edits', () => {
    const returned = getText('quality', 0)
    expect(returned).toEqual({
      id: 'quality',
      title: 'Quality Edits',
      desc: qualityDesc
    })
  })

  it('returns quality with 1 edit', () => {
    const returned = getText('quality', 1)
    expect(returned).toEqual({
      id: 'quality',
      title: ' type of Quality Edit',
      desc: qualityDesc
    })
  })

  it('returns quality with 2 edits', () => {
    const returned = getText('quality', 2)
    expect(returned).toEqual({
      id: 'quality',
      title: ' types of Quality Edits',
      desc: qualityDesc
    })
  })

  const macroDesc = 'Macro quality edits check whether the submitted loan/application register as a whole conforms to expected values. The loan/application register cannot be submitted until the filer either confirms the accuracy of all the values flagged by the macro quality edits in the HMDA Platform or corrects the flagged values and reuploads the updated loan/application register to the HMDA Platform.'

  it('returns macro with 0 edits', () => {
    const returned = getText('macro', 0)
    expect(returned).toEqual({
      id: 'macro',
      title: 'Macro Edits',
      desc: macroDesc
    })
  })
  
  it('returns macro with 1 edit', () => {
    const returned = getText('macro', 1)
    expect(returned).toEqual({
      id: 'macro',
      title: ' type of Macro Edit',
      desc: macroDesc
    })
  })

  it('returns macro with 2 edits', () => {
    const returned = getText('macro', 2)
    expect(returned).toEqual({
      id: 'macro',
      title: ' types of Macro Edits',
      desc: macroDesc
    })
  })
})
