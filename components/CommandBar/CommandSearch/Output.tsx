interface Props {
  output: string | number
}

const Output = ({ output }: Props) => {
  return (
    <div className="output">
      Output: {output}
      <style jsx>{`
        .output {
          font-family: Inconsolata;
          font-size: 1rem;
          color: #029f02;
          position: absolute;
          top: 0;
          left: 0;
        }
      `}</style>
    </div>
  )
}

export default Output
