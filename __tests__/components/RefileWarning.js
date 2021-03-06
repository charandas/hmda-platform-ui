jest.unmock('../../src/js/components/RefileWarning.jsx')
jest.mock('../../src/js/containers/RefileButton.jsx')
jest.mock('../../src/js/api/api')

import RefileWarning from '../../src/js/components/RefileWarning.jsx'
import Wrapper from '../Wrapper.js'
import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-addons-test-utils'

const submission = {
  id: {
    institutionId: '1',
    period: '2017',
    sequenceNumber: 1
  }
}
const parseLocation = jest.fn(() => { return { id:'1', period: '2017', submission: 1 } })

describe('Refile Warning', () => {
  const parserText = 'Your file has formatting errors.Please update your file and click the \"Upload a new file\" button.'
  const refileText = 'Your file has syntactical and/or validity edits.Please review the edits below or download the edit report.Then update your file and select the \"upload a new file\" button.'
  const qualityText = 'Your file has quality edits.Please review the edits below or download the edit report.You must verify the edits and select the check box to confirm the data is accurate. If the data need to be corrected, please update your file and .'
  const macroText = 'Your file has macro quality edits.Please review the edits below or download the edit report.You must verify the edits and select the check box to confirm the data is accurate. If the data need to be corrected, please update your file and .'


  it('renders the correct elements for status code 5 and calls function on click', () => {

    const refileWarning = TestUtils.renderIntoDocument(
      <Wrapper>
        <RefileWarning
          code={5}
          syntacticalValidityEditsExist={true}
          submission={submission}
        />
      </Wrapper>
    )

    expect(TestUtils.scryRenderedDOMComponentsWithClass(refileWarning, 'usa-alert-text')[0].parentNode.textContent).toEqual(parserText)
  })

  it('renders the correct elements for status code 7', () => {
    const refileWarning = TestUtils.renderIntoDocument(
      <Wrapper>
        <RefileWarning
          code={7}
          syntacticalValidityEditsExist={true}
          submission={submission}
        />
      </Wrapper>
    )

    expect(TestUtils.scryRenderedDOMComponentsWithClass(refileWarning, 'usa-alert-text')[0].parentNode.textContent).toEqual(refileText)
  })

  it('renders no warning on synval if no synval edits exist', () => {
    const refileWarning = TestUtils.renderIntoDocument(
      <Wrapper>
        <RefileWarning
          code={7}
          syntacticalValidityEditsExist={false}
          submission={submission}
          page={'syntacticalvalidity'}
        />
      </Wrapper>
    )

    expect(TestUtils.scryRenderedDOMComponentsWithClass(refileWarning, 'usa-alert-text').length).toEqual(0)
  })

  it('renders the correct elements for quality', () => {
    const refileWarning = TestUtils.renderIntoDocument(
      <Wrapper>
        <RefileWarning
          code={8}
          qualityVerified={false}
          submission={submission}
          page={'quality'}
        />
      </Wrapper>
    )

    expect(TestUtils.scryRenderedDOMComponentsWithClass(refileWarning, 'usa-alert-text')[0].parentNode.textContent).toEqual(qualityText)
  })

  it('renders no warning on quality if verified', () => {
    const refileWarning = TestUtils.renderIntoDocument(
      <Wrapper>
        <RefileWarning
          code={8}
          qualityVerified={true}
          submission={submission}
          page={'quality'}
        />
      </Wrapper>
    )

    expect(TestUtils.scryRenderedDOMComponentsWithClass(refileWarning, 'usa-alert-text').length).toEqual(0)
  })

  it('renders the correct elements for macro', () => {
    const refileWarning = TestUtils.renderIntoDocument(
      <Wrapper>
        <RefileWarning
          code={8}
          macroVerified={false}
          submission={submission}
          page={'macro'}
        />
      </Wrapper>
    )

    expect(TestUtils.scryRenderedDOMComponentsWithClass(refileWarning, 'usa-alert-text')[0].parentNode.textContent).toEqual(macroText)
  })

  it('renders no warning on macro if verified', () => {
    const refileWarning = TestUtils.renderIntoDocument(
      <Wrapper>
        <RefileWarning
          code={8}
          macroVerified={true}
          submission={submission}
          page={'macro'}
        />
      </Wrapper>
    )

    expect(TestUtils.scryRenderedDOMComponentsWithClass(refileWarning, 'usa-alert-text').length).toEqual(0)
  })
  it('renders the correct elements for status code > 8', () => {
    const refileWarning = TestUtils.renderIntoDocument(
      <Wrapper>
        <RefileWarning
          code={10}
          syntacticalValidityEditsExist={false}
          submission={submission}
        />
      </Wrapper>
    )

    expect(TestUtils.scryRenderedDOMComponentsWithClass(refileWarning, 'usa-alert-text').length).toEqual(0)
    expect(TestUtils.scryRenderedDOMComponentsWithTag(refileWarning, 'a').length).toEqual(0)
  })

})
