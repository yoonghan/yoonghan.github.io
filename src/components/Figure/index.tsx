import Image, { type ImageProps } from "next/image"
import { ReactNode } from "react"

function Figure({
  imageProps,
  imageCaption,
  children,
  reversed,
}: {
  imageProps: ImageProps
  imageCaption: string
  children: ReactNode
  reversed?: boolean
}) {
  const { alt, src, className, ...img } = imageProps

  return (
    <div
      className={`grid grid-cols-1 items-center gap-6 md:gap-8  ${
        reversed
          ? "md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]"
          : "md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]"
      } !items-start`}
    >
      <figure className={reversed ? "md:order-1" : ""}>
        <Image {...img} alt={alt} src={src} className="mx-auto" />
        <Image
          src="/img/arrow.svg"
          className="hidden md:block w-12 -my-8 relative z-10 mx-auto ml-[55%]"
          aria-hidden={true}
          alt="Arrow to describe figure image"
          width={50}
          height={100}
        />
        <figcaption className="hidden md:block bg-gradient-to-br font-medium from-orange-500 via-orange-300 to-yellow-200 p-8 py-12 text-center items-center flex justify-center skew-y-2 skew-x-3">
          <div className="w-full -skew-y-2 -skew-x-3">{imageCaption}</div>
        </figcaption>
      </figure>
      <div className="md:sticky md:top-4">{children}</div>
    </div>
  )
}

export default Figure
