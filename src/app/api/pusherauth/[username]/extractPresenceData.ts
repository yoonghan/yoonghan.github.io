import {
  isOnlyAlphabetsAndNumberAndSpace,
  removeAllWhiteSpaces,
  capitalizeFirstWord,
} from "@/util/regex"
import { Member } from "./route"

export const extractPresenceData = (
  username: string | string[] | undefined
): Member | null => {
  if (
    typeof username !== "string" ||
    username.trim() === "" ||
    !isOnlyAlphabetsAndNumberAndSpace(username)
  ) {
    return null
  }

  const trimmedUsername = username.trim()

  return {
    user_id: removeAllWhiteSpaces(trimmedUsername.toLocaleLowerCase()),
    user_info: { name: capitalizeFirstWord(trimmedUsername) },
  }
}
