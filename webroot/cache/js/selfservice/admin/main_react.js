var odata = [
  {author: "Pete Hunt", text: "This is one comment"},
  {author: "Jordan Walke", text: "This is *another* comment"}
];

var UserMgmt = React.createClass({
  render: function() {
    return (
      <table className="table table-bordered table-hover">
        <thead>
            <th>First Name</th>
            <th>Mid Name</th>
            <th>Last Name</th>
            <th>Gender</th>
            <th>Contact No</th>
            <th>Email</th>
        </thead>
        <UserMgmtList data={this.props.data} />
      </table>
    );
  }
});

var UserMgmtList = React.createClass({
  render: function() {
    var userMgmtNodes = this.props.data.map(function (usermgmt) {
      return (
        <tr>
            <td>
                {usermgmt.firstName}
            </td>
            <td>
                {usermgmt.midName}
            </td>
            <td>
                {usermgmt.lastName}
            </td>
            <td>
                {usermgmt.gender=="O"? "Others" : (usermgmt.gender=="M" ? "Male" : "Female")}
            </td>
            <td>
                {usermgmt.ctcNo}
            </td>
            <td>
                {usermgmt.email}
            </td>
        </tr>
      );
    });
    return (
      <div className="userMgmtList">
        {userMgmtNodes}
      </div>
    );
  }
});

/**As angular triggers**/
var react_UserMgmt = function(data){
    React.render(
      <UserMgmt data={data}/>,
      document.getElementById('userMgmtContent')
    );
}