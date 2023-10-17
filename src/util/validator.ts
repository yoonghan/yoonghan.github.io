import {
  is,
  greaterThan,
  matchesPattern,
  not,
  equalTo,
  undefined,
  allOf,
  hasSize,
} from "hamjest"

export const inputMatcher = allOf(
  is(not(equalTo(undefined()))),
  matchesPattern(/^[a-z|A-Z|0-9|!|\$|@|?|#|%|\^]+$/),
  hasSize(greaterThan(5))
)

export const emailMatcher = matchesPattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)

export const validInput = (value?: string) => inputMatcher.matches(value)

export const validEmail = (email: string) => emailMatcher.matches(email)
