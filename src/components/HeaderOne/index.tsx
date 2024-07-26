interface Props {
  title: string
  isLined?: boolean
}

const HeaderOne = ({ title, isLined }: Props) => {
  return <h1 className={isLined ? "lined" : ""}>{title}</h1>
}

export default HeaderOne
