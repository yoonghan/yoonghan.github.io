import Image, { StaticImageData } from "next/image"
import styles from "./Profiler.module.css"

export interface IProfiler {
  name: string
  description: JSX.Element
  imgSrc: string | StaticImageData
  width?: number
  height?: number
}

export interface Props {
  profiles: Array<IProfiler>
}

const _getUser = (
  idx: number,
  name: string,
  description: JSX.Element,
  imgSrc: string | StaticImageData,
  width = 285,
  height = 385
) => (
  <div className={styles["user"]} key={"user_" + idx}>
    <Image src={imgSrc} alt={name} width={width} height={height} />
    <p className={styles.name}>{name}</p>
    <div className={styles["divider"]}></div>
    {description}
  </div>
)

const Profiler = ({ profiles }: Props) => {
  return (
    <div className={styles["profiler"]}>
      {profiles.map((profile, idx) =>
        _getUser(
          idx,
          profile.name,
          profile.description,
          profile.imgSrc,
          profile.width,
          profile.height
        )
      )}
    </div>
  )
}

export default Profiler
