module.exports = {
  withRouter: (component:any) => {
    component.defaultProps = {
      ...component.defaultProps,
      router: { pathname: '/test', route: '/test' }
    }
    return component
  }
}
