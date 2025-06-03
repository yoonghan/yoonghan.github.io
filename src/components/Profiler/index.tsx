import Image, { StaticImageData } from "next/image"

interface IProfiler {
  name: string
  description: JSX.Element
  imgSrc: string | StaticImageData
  width?: number
  height?: number
}

interface Props {
  profiles: Array<IProfiler>
}

const _getUser = (
  idx: number,
  name: string,
  description: JSX.Element,
  imgSrc: string | StaticImageData,
  width = 285,
  height = 385,
) => (
  <div key={"user_" + idx}>
    <Image
      src={imgSrc}
      alt={name}
      width={width}
      height={height}
      className="mx-auto"
    />
    <div className="py-4 text-center border-b-2 mb-4">
      <strong>{name}</strong>
    </div>
    {description}
  </div>
)

const Profiler = ({ profiles }: Props) => {
  return (
    <div className="flex flex-col gap-16 md:flex-row md:gap-8">
      {profiles.map((profile, idx) =>
        _getUser(
          idx,
          profile.name,
          profile.description,
          profile.imgSrc,
          profile.width,
          profile.height,
        ),
      )}
    </div>
  )
}

export default Profiler
