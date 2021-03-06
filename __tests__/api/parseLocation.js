import parseLocation from '../../src/js/api/parseLocation'

describe('parse location', () => {
  it('parses the global location properly', () => {
    expect(
      parseLocation({pathname: '/testid/testfiling'})
    ).toEqual({id: 'testid', filing: 'testfiling'})
    expect(
      parseLocation({pathname:'/'})
    ).toEqual(null)
  })
})
