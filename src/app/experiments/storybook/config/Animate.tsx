import FontAwesomeAnimate from "@/components/Animate/FontAwesomeAnimate"
import Workflow from "@/components/Animate/Workflow"
import Wave from "@/components/Animate/Wave"
import { faUniversalAccess } from "@fortawesome/free-solid-svg-icons"

function SpinGearDemo() {
  return (
    <FontAwesomeAnimate
      title={"Universal Access Demo"}
      className="flex items-center"
      faIcon={faUniversalAccess}
      animate="bounce"
    >
      <div className="p-2">Bounce universal Demo</div>
    </FontAwesomeAnimate>
  )
}

function WorkflowDemo() {
  return (
    <Workflow title={"Workflow Demo"} className="flex items-center">
      <div className="p-16">Workflow Demo</div>
    </Workflow>
  )
}

function WaveDemo() {
  return (
    <Wave title={"waveDemo"}>
      <div className="p-2">Wave Demo</div>
    </Wave>
  )
}

function Animate() {
  return (
    <>
      <SpinGearDemo />
      <WorkflowDemo />
      <WaveDemo />
    </>
  )
}

export default Animate
