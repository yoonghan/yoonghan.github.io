/**As angular triggers**/
var react_UserMgmt = function($scope, React){

    var reactFunc=undefined;

    var UserMgmt = React.createClass({displayName: "UserMgmt",
      getInitialState: function() {
        return {data: []};
      },
      componentDidMount: function() {
        //this.setState({data: this.props.data});
      },
      render: function() {
        return (
          React.createElement("table", {className: "table table-bordered table-hover"},
            React.createElement("thead", null,
                React.createElement("th", null, "First Name"),
                React.createElement("th", null, "Mid Name"),
                React.createElement("th", null, "Last Name"),
                React.createElement("th", null, "Gender"),
                React.createElement("th", null, "Contact No"),
                React.createElement("th", null, "Email"),
                React.createElement("th", null, "UnsubscribeUser")
            ),
            React.createElement(UserMgmtList, {data: this.state.data})
          )
        );
      }
    });

    var UserMgmtList = React.createClass({displayName: "UserMgmtList",
      removeAction: function(maskId){
        $scope.removeUser(maskId);
      },
      render: function() {
        var userMgmtNodes = this.props.data.map(function (usermgmt) {
          return (
            React.createElement("tr", null,
                React.createElement("td", null,
                    usermgmt.firstName
                ),
                React.createElement("td", null,
                    usermgmt.midName
                ),
                React.createElement("td", null,
                    usermgmt.lastName
                ),
                React.createElement("td", null,
                    usermgmt.gender=="O"? "Others" : (usermgmt.gender=="M" ? "Male" : "Female")
                ),
                React.createElement("td", null,
                    usermgmt.ctcNo
                ),
                React.createElement("td", null,
                    usermgmt.email
                ),
                React.createElement("td", null,
                    React.createElement("button", {type: "button", className: "btn btn-danger", id: "user", onClick: this.removeAction.bind(this, usermgmt.maskId)}, "Remove")
                )
            )
          );
        }, this);
        return (
          React.createElement("tbody", null,
            userMgmtNodes
          )
        );
      }
    });

    this.load = function(){
        reactFunc = React.render(
          React.createElement(UserMgmt, null),
          document.getElementById('userMgmtContent')
        );
    }

    this.getReact = function(){
        return reactFunc;
    }

    return this;
}