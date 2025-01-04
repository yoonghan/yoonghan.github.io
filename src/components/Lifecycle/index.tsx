import React from "react"
import Link from "../Link"
import styles from "./Lifecycle.module.css"

type Model = {
  label: string
  url: string
}

function Lifecycle({ models }: { models: Model[] }) {
  const drawArrow = (rotation: number) => (
    <svg
      fill="#000000"
      height="50px"
      width="50px"
      viewBox="0 0 200 200"
      transform={`rotate(${rotation * 90})`}
    >
      <g strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g>
        <path d="M197.007,48.479L139.348,0v28.623C63.505,32.538,3.006,95.472,3.006,172.271v27.741h40.099v-27.741 c0-54.682,42.527-99.614,96.243-103.47v28.156L197.007,48.479z"></path>{" "}
      </g>
    </svg>
  )

  const drawLink = (model: Model) => <Link href={model.url}>{model.label}</Link>

  if (models.length !== 4) {
    return <div>Not Supported, must be EXACTLY 4 elements.</div>
  }

  return (
    <div className={styles.container}>
      <div>{drawArrow(0)}</div>
      <div>{drawLink(models[0])}</div>
      <div>{drawArrow(1)}</div>

      <div>{drawLink(models[3])}</div>
      <div className={styles.circle}></div>
      <div>{drawLink(models[1])}</div>

      <div>{drawArrow(3)}</div>
      <div>{drawLink(models[2])}</div>
      <div>{drawArrow(2)}</div>
    </div>
  )
}

export default Lifecycle
