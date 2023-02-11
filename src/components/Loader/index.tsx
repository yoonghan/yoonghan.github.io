import { useSpring, animated } from "@react-spring/web"

const loaderStyle = (styleprops: any) => {
  return {
    position: "absolute" as "absolute",
    border: "5px solid white",
    borderRadius: "100%",
    height: styleprops.diameter,
    left: "50%",
    opacity: styleprops.opacity,
    top: "50%",
    transform: "translateX(-50%) translateY(-50%)",
    width: styleprops.diameter,
    zIndex: 1,
  }
}

const Loader = () => {
  const iLoader = useSpring({
    from: { opacity: 0, diameter: 0 },
    to: async (next: any) => {
      while (1) {
        await next({ opacity: 1, diameter: 50 })
      }
    },
    config: { duration: 600 },
    reset: true,
  })

  return (
    <div style={{ display: "none" }} id="walcron_loader">
      <animated.div style={loaderStyle(iLoader)} data-testid="walcron_loader" />
    </div>
  )
}

export default Loader
