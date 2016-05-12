jest.dontMock('../src/js/InstitutionStatus.jsx');
jest.dontMock('../src/js/Resubmit.jsx');
jest.dontMock('../src/js/EditReports.jsx');

var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');

var InstitutionStatus = require('../src/js/InstitutionStatus.jsx');

var institution = {
  "name": "Wacky data",
  "status": {
    "code": 4,
    "message": ""
  },
  "editReports": [
    {
      "timestamp": 1457464448191,
      "edits": {
        "syntactical": 2,
        "validity": 1,
        "quality": 2,
        "macro": 1
      }
    }
  ]
}

describe('InstitutionStatus', function(){

  var statusComponent = <InstitutionStatus institution={institution}/>
  var status = TestUtils.renderIntoDocument(statusComponent);
  var statusNode = ReactDOM.findDOMNode(status);

  it('renders the component', function(){
    expect(statusNode).toBeDefined();
  });

  it('passes through the institution appropriately as props', function(){
    expect(status.props.institution).toEqual(institution);
  });

  /*
  it('properly renders needed child components', function(){
    expect(TestUtils.scryRenderedDOMComponentsWithTag(status, 'a').length).toEqual(4);
    expect(TestUtils.findRenderedDOMComponentWithClass(status, 'Resubmit')).toBeDefined();
    expect(TestUtils.findRenderedDOMComponentWithClass(status, 'EditReports')).toBeDefined();
  });
  */

});