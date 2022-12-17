import { isEmptyString } from "./string"

export const hasEmptyValueInObject = (obj: {
  [key: string]: string | null | undefined
}) => Object.keys(obj).find((key) => isEmptyString(obj[key]))
