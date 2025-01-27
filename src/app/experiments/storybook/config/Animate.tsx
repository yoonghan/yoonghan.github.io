import FontAwesomeAnimate from "@/components/Animate/FontAwesomeAnimate"
import Workflow from "@/components/Animate/Workflow"
import Wave from "@/components/Animate/Wave"
import { faUniversalAccess } from "@fortawesome/free-solid-svg-icons"
import Gauge from "@/components/Animate/Gauge"

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

function GaugeDemo() {
  return (
    <Gauge title={"Gauge Demo"}>
      <div className="p-2">Gauge Demo</div>
    </Gauge>
  )
}

function Animate() {
  return (
    <>
      <SpinGearDemo />
      <WorkflowDemo />
      <WaveDemo />
      <GaugeDemo />
    </>
  )
}

export default Animate
