import Figure from "@/components/Figure"

export function OrderedFigure() {
  return (
    <div style={{ background: "#222" }}>
      <Figure
        imageProps={{
          src: "/img/logo/logo-color.svg",
          height: 500,
          width: 500,
          alt: "Sample Image",
        }}
        imageCaption="Sample Caption"
      >
        <p>This is a sticky section</p>
      </Figure>
    </div>
  )
}

export function ReversedFigure() {
  return (
    <div style={{ background: "#222" }}>
      <Figure
        imageProps={{
          src: "/img/logo/logo-color.svg",
          height: 500,
          width: 500,
          alt: "Sample Image",
        }}
        imageCaption="Sample Caption"
        reversed={true}
      >
        <p>This is a sticky section</p>
      </Figure>
    </div>
  )
}
