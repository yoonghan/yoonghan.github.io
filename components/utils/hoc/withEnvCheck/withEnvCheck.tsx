import { isEmptyString } from "../../common/string"

export const withNonEmptyEnvCheck =
  <T extends { [key: string]: any }>(
    Component: (prop: T) => JSX.Element,
    errorMessage = "One of the enviroment variable is missing"
  ) =>
  (props: T) => {
    const hasEmptyValue = Object.keys(props).find((key) =>
      isEmptyString(props[key])
    )
    return hasEmptyValue ? <div>{errorMessage}</div> : <Component {...props} />
  }
