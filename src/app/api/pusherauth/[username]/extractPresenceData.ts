import {
  isOnlyAlphabetsAndNumberAndSpace,
  removeAllWhiteSpaces,
  capitalizeFirstWord,
} from "@/util/regex"

type Member = {
  user_id: string
  user_info: {
    name: string
  }
}

export const extractPresenceData = (
  username: string | string[] | undefined,
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
