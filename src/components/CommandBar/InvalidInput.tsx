import * as React from "react"

interface InvalidInputProps {
  invalidInput: string
}

const trimInput = (input: string) => {
  const _input = input.trim()
  return _input.length > 6 ? _input.substring(0, 4) + "..." : _input
}

const InvalidInput = ({ invalidInput }: InvalidInputProps) => {
  return (
    <div className="error">
      {trimInput(invalidInput)} - not found. type HELP.
      <style>{`
        .error {
          white-space: nowrap;
          font-family: Inconsolata;
          font-size: 1rem;
          color: #3333ff;
          position: absolute;
          top: 0;
          left: 0;
        }
      `}</style>
    </div>
  )
}

export default InvalidInput
