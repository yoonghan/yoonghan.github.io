/**As angular triggers**/
var react_UserMgmt = function($scope){

    var reactFunc=undefined;

    var UserMgmt = React.createClass({
      getInitialState: function() {
        return {data: []};
      },
      componentDidMount: function() {
        //this.setState({data: this.props.data});
      },
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
                <th>UnsubscribeUser</th>
            </thead>
            <UserMgmtList data={this.state.data}/>
          </table>
        );
      }
    });

    var UserMgmtList = React.createClass({
      removeAction: function(maskId){
        $scope.removeUser(maskId);
      },
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
                <td>
                    <button type="button" className="btn btn-danger" id="user" onClick={this.removeAction.bind(this, usermgmt.maskId)}>Remove</button>
                </td>
            </tr>
          );
        }, this);
        return (
          <tbody>
            {userMgmtNodes}
          </tbody>
        );
      }
    });

    this.load = function(){
        reactFunc = React.render(
          <UserMgmt/>,
          document.getElementById('userMgmtContent')
        );
    }

    this.getReact = function(){
        return reactFunc;
    }

    return this;
}