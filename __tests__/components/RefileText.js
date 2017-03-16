jest.unmock('../../src/js/components/RefileText.jsx')

import RefileText, { getStatus } from '../../src/js/components/RefileText.jsx'
import React from 'react'
import TestUtils from 'react-addons-test-utils'

describe('RefileText', () => {

  it('renders with provided props', () => {
    const rendered = RefileText({
      code: 3
    })

    expect(rendered).toBeDefined()
    expect(rendered.type).toBe('div')
  })

  it('fails to render without provided props', () => {
    console.error = jest.fn()
    const rendered = TestUtils.renderIntoDocument(<RefileText/>)
    expect(console.error).toHaveBeenCalledTimes(1)
  })

})

describe('getStaus', () => {
  it('returns as "in progess" if code === 7', () => {
    const rendered = getStatus(7)
    expect(rendered).toBe(null)
  })

  it('returns as "in progess" if code > 7', () => {
    const rendered = getStatus(8)
    expect(rendered.props.children[1].props.children).toBe('is in progress.')
  })

  it('returns as "has already been submitted" if code === 11', () => {
    const rendered = getStatus(11)
    expect(rendered.props.children[1].props.children).toBe('has already been submitted.')
  })
})
