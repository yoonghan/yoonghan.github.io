interface Props {
  invalidCommand: string
}

const InvalidCommand = ({ invalidCommand }: Props) => {
  return (
    <div className="error">
      Msg: {invalidCommand}
      <style jsx>{`
        .error {
          font-family: Inconsolata;
          font-size: #f90101;
          color: 1rem;
          position: absolute;
          top: 0;
          left: 0;
        }
      `}</style>
    </div>
  )
}

export default InvalidCommand
