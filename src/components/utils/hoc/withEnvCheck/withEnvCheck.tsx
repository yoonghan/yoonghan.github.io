import { hasEmptyValueInObject } from "../../common/object"
import { JSX } from "react"

export const withNonEmptyEnvCheck = <T extends { [key: string]: any }>(
  Component: (props: T) => JSX.Element,
  propsFn: () => T,
  errorMessage = "One of the enviroment variable is missing",
) =>
  function render() {
    const props = propsFn()

    return hasEmptyValueInObject(props) ? (
      <div>{errorMessage}</div>
    ) : (
      <Component {...props} />
    )
  }
