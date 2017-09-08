jest.unmock('../../src/js/components/InstitutionNameAndId.jsx')

import InstitutionNameAndId from '../../src/js/components/InstitutionNameAndId.jsx'
import Wrapper from '../Wrapper.js'
import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-addons-test-utils'

describe('InstitutionNameAndId', () => {
  it('renders the institution name and id', () => {
    const nameAndId = TestUtils.renderIntoDocument(
      <Wrapper>
        <InstitutionNameAndId id="123456" name="Bank0" />
      </Wrapper>
    )
    const nameAndIdNode = ReactDOM.findDOMNode(nameAndId)

    expect(nameAndIdNode).toBeDefined()
    expect(nameAndIdNode.textContent).toEqual('Bank0 - 123456')
  })
})
