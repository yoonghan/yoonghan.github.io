import SpinGear from "@/components/Animate/SpinGear"
import Workflow from "@/components/Animate/Workflow"
import Wave from "@/components/Animate/Wave"

function SpinGearDemo() {
  return (
    <SpinGear title={"Spin Gear Demo"} className="flex items-center">
      <div className="p-2">Spin Gear Demo</div>
    </SpinGear>
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
