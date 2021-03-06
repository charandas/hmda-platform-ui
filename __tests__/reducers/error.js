jest.unmock('../../src/js/reducers/error.js')
import * as types from '../../src/js/constants'
import excludeTypes from './excludeTypes.js'
import error from '../../src/js/reducers/error.js'

const defaultError = null

describe('error reducer', () => {
  it('should return the initial state on empty action', () => {
    expect(
      error(undefined, {})
    ).toEqual(defaultError)
  })

  it('should update the error state when encountered', () => {
    expect(
      error(defaultError, {type: types.RECEIVE_ERROR, error: 'an error'})
    ).toEqual('an error')
  })

  it('should refresh error state', () => {
    expect(
      error({}, {type: types.REFRESH_STATE})
    ).toEqual(defaultError)
  })

  it('shouldn\'t modify state on an unknown action type', () => {
    excludeTypes(types.REFRESH_STATE, types.RECEIVE_ERROR)
      .forEach(v => expect(error({}, v))
        .toEqual({})
      )
  })
})
