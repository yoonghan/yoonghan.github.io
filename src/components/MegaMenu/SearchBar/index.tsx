import "@yoonghan/walcron-microfrontend-shared/dist/style.css"
import { useCallback, useEffect, useState, useRef } from "react"
import { animated, useChain, useSpring, useSpringRef } from "@react-spring/web"
import { faSearch } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import CommandBar from "@/components/CommandBar"

enum Display {
  Menu,
  Command,
}

function SearchBar() {
  const [isJsEnabled, setIsJsEnabled] = useState(false)
  const displayRef = useRef(Display.Menu)

  const menuRef = useSpringRef()
  const commandRef = useSpringRef()
  const [springCommand, apiCommand] = useSpring(() => ({
    ref: commandRef,
    from: { display: "none", scale: 0, height: "0" },
  }))

  useChain([menuRef, commandRef])
  const [springButton, apiButton] = useSpring(() => ({
    from: { transform: "rotate(0deg)" },
  }))

  useChain([menuRef, commandRef])

  const onSwitchClick = useCallback(() => {
    if (displayRef.current === Display.Menu) {
      apiButton.start({
        to: { transform: "rotate(180deg)" },
      })
      apiCommand.start({
        to: { scale: 1, height: "4rem", display: "block" },
      })
      displayRef.current = Display.Command
    } else {
      apiCommand.start({
        to: { scale: 0, height: "0", display: "none" },
      })
      apiButton.start({
        to: { transform: "rotate(0deg)" },
      })
      displayRef.current = Display.Menu
    }
  }, [apiButton, apiCommand])

  useEffect(() => {
    setIsJsEnabled(true)
  }, [])

  return (
    isJsEnabled && (
      <div className="flex ml-auto">
        <animated.div style={{ ...springCommand }} data-testid="command-menu">
          <CommandBar commandPromptOnly={true} />
        </animated.div>
        <animated.button
          onClick={onSwitchClick}
          style={{ ...springButton }}
          aria-label="search"
        >
          {" "}
          <FontAwesomeIcon icon={faSearch} className="px-2" />
        </animated.button>
      </div>
    )
  )
}

export default SearchBar
