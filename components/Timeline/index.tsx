import { useMemo } from "react"
import styles from "./Timeline.module.css"

interface Props {
  events: Array<IEvent>
}

interface IEvent {
  id: string
  date: string
  special?: string
  desc: string
  faIcon?: string
}

const Timeline = ({ events }: Props) => {
  const createLinks = useMemo(() => {
    return events.map(({ id, faIcon, date, special, desc }, idx) => (
      <li key={`timeline_${id}`}>
        <span></span>
        <span>
          {faIcon ? (
            <i className={`${styles.icon} ${faIcon}`}></i>
          ) : (
            <i className={styles.dot}></i>
          )}
        </span>
        <div className={styles.content}>
          <p>
            <strong>{date}</strong>
          </p>
          {special && <p>[{special}]</p>}
          <p>{desc}</p>
        </div>
      </li>
    ))
  }, [events])

  return <ul className={styles.container}>{createLinks}</ul>
}

export default Timeline
