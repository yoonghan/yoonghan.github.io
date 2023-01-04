import { hasEmptyValueInObject } from "../../common/object"

export const withNonEmptyEnvCheck = <T extends { [key: string]: any }>(
  Component: (prop: T) => JSX.Element,
  errorMessage = "One of the enviroment variable is missing"
) =>
  function render(props: T) {
    return hasEmptyValueInObject(props) ? (
      <div>{errorMessage}</div>
    ) : (
      <Component {...props} />
    )
  }
