import {
  ReactNode,
  TextareaHTMLAttributes,
  KeyboardEvent,
  ChangeEvent,
} from "react"

const TextArea = ({
  onSubmit,
  value,
  onChange,
  additionalProps,
  children,
}: {
  onSubmit: () => void
  value: string
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void
  additionalProps?: TextareaHTMLAttributes<HTMLTextAreaElement>
  children?: ReactNode
}) => {
  const onKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && (event.shiftKey || event.altKey)) {
      event.preventDefault()
      const targetChange: any = {
        target: {
          value: `${value}\r\n`,
        } as any,
      }
      onChange(targetChange)
    } else if (event.key === "Enter") {
      event.preventDefault()
      onSubmit()
    }
  }

  return (
    <textarea
      value={value}
      onChange={onChange}
      {...additionalProps}
      onKeyDown={onKeyDown}
    >
      {children}
    </textarea>
  )
}

export default TextArea
