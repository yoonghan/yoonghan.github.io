import { useMemo } from "react"
import styles from "./Navigator.module.css"

interface Props {
	label: string
	links: Array<ILink>
	onLinkClick: (link: string | number) => void
}

interface ILink {
	id: string
	desc: string
	link: string | number
}

const Navigator = ({ links, onLinkClick, label }: Props) => {
	const createLinks = useMemo(() => {
		return links.map(({ id, desc, link }) => {
			return (
				<li
					className={styles.container}
					key={`navigator_${id}`}
					onClick={() => onLinkClick(link)}
					onKeyUp={() => onLinkClick(link)}
					tabIndex={0}
					// biome-ignore lint/a11y/noNoninteractiveElementToInteractiveRole: intentional use of menuitem for accessible navigation
					role="menuitem"
				>
					<span></span>
					<span>
						<i className={styles.dot}></i>
					</span>
					<div className={styles.content}>
						<p>{desc}</p>
					</div>
				</li>
			)
		})
	}, [links, onLinkClick])

	return (
		<aside>
			<span className={styles.sitemap}>Site Map:</span>
			<nav aria-label={label}>
				{
					// biome-ignore lint: expected
					<ul className={styles.mainContainer} role="menu">
						{createLinks}
					</ul>
				}
			</nav>
		</aside>
	)
}

export default Navigator