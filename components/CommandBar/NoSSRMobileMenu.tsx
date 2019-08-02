import * as React from "react";
import { withRouter } from 'next/router';
import ButtonsBar from "../ButtonsBar";
import { WithRouterProps } from "next/dist/client/with-router";

const AVAILABLE_MENUS = ['Home', 'About', 'Work'];

interface NoSSRMobileMenuProps extends WithRouterProps {

}

class NoSSRMobileMenu extends React.PureComponent<NoSSRMobileMenuProps, {}> {
  constructor(props:any) {
    super(props);
  }

  componentDidMount() {
  }

  _getIndex = () => {
    const routerLocation = this.props.router.route;
    switch(routerLocation) {
      case '/':
        return 0;
      case '/about':
        return 1;
      case '/work':
        return 2;
      default:
        return 0;
    }
  }

  render() {
    return (
      <React.Fragment>
        <ButtonsBar menuTexts={AVAILABLE_MENUS} activeIndex={this._getIndex()}/>
      </React.Fragment>
    );
  }
}

export default withRouter(NoSSRMobileMenu);
