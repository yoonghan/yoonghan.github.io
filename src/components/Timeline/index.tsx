import type { IconProp } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import styles from "./Timeline.module.css"

interface Props {
	events: Array<IEvent>
}

export interface IEvent {
	id: string
	date: string
	special?: string
	desc: string
	faIcon?: IconProp
}

const Timeline = ({ events }: Props) => {
	const createLinks = events.map(({ id, faIcon, date, special, desc }) => (
		<li key={`timeline_${id}`}>
			<span></span>
			<span>
				{faIcon ? (
					<i className={`${styles.icon}`}>
						<FontAwesomeIcon icon={faIcon} />
					</i>
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

	return <ul className={styles.container}>{createLinks}</ul>
}

export default Timeline