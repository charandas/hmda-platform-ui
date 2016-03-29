var React = require('react');
var Link = require('react-router').Link;

var EditReports = React.createClass({

  getURI: function(report){
    return '/reports/' + this.props.institution.name + '/' + report.timestamp
  },

  render: function(){
    var self = this;
    return (
      <ul className="reports">
        {this.props.editReports.map(function(report, i){
          return (
            <li key={i}>
              <Link to={self.getReportURI(report)}>View edit report</Link> - {new Date(report.timestamp).toString().split(' ').splice(1, 3).join(' ')}
            </li>
          )
        })}
      </ul>
    )
  }
});


module.exports = EditReports;
