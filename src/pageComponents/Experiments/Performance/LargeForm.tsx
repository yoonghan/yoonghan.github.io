import React, { FormEvent, memo, useEffect, useReducer, useRef } from "react"
import { ChangeEvent, useCallback, useMemo, useState } from "react"

type FormProps = {
  [string: string]: string | number
}

const noOfFields = 100
const isEmpty = (value: null | undefined | string | number) => {
  return (
    value === null ||
    value === undefined ||
    (typeof value === "string" && value.trim() === "") ||
    value === 0
  )
}

const reducer = (
  state: string[],
  action: { type: "ADD"; fieldIdUpdated: string }
) => {
  switch (action.type) {
    case "ADD":
      return [...state, action.fieldIdUpdated]
    default:
      return state
  }
}

const LargeForm = ({}) => {
  const [monitoredUpdate, dispatch] = useReducer(reducer, [])

  const printableMonitorData = useMemo(() => {
    if (monitoredUpdate.length > 1) {
      return monitoredUpdate
        .slice(-5)
        .reduce((acc, fieldId) => `${acc}, ${fieldId}`, "")
    } else {
      return ""
    }
  }, [monitoredUpdate])

  const updateMonitor = useCallback((fieldIdUpdated: string) => {
    dispatch({ type: "ADD", fieldIdUpdated })
  }, [])

  return (
    <>
      <div style={{ paddingBottom: 10 }}>
        Goal is to not rerender the whole form, and only rerender inputs that
        will change. However if this form has related changes it will not cause
        a re-render. This is the prop drilling method.
      </div>
      <div>
        <strong>Last 5 Rerendered Input:</strong> {printableMonitorData}
      </div>
      <InputForm updateMonitor={updateMonitor} />
    </>
  )
}

const InputForm = ({
  updateMonitor,
}: {
  updateMonitor: (id: string) => void
}) => {
  const [form, setForm] = useState<FormProps>({
    field1: "hello",
    field2: "world",
    field3: "test field",
  })
  const [formFilled, setFormFilled] = useState<string>()

  const callSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      const nonEmptyObjects = Object.entries(form).filter(
        ([_, value]) => !isEmpty(value)
      )
      if (nonEmptyObjects.length !== 0) {
        setFormFilled(nonEmptyObjects.map(([key, value]) => key).join(", "))
      } else {
        setFormFilled(undefined)
      }
      return false
    },
    [form]
  )

  const updateForm = (
    input: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = input.target
    setForm((form) => ({
      ...form,
      [id]: value,
    }))
  }

  const printableFormData = useMemo(() => JSON.stringify(form), [form])

  return (
    <>
      <div>
        <strong>Updated Form:</strong> {printableFormData}
      </div>
      <br />
      {formFilled && (
        <div className="alert danger">Field filled: {formFilled}</div>
      )}
      <form onSubmit={callSubmit}>
        {Array(noOfFields)
          .fill(0)
          .map((_key, index) => (
            <MemoizeInput
              id={`field${index}`}
              updateForm={updateForm}
              form={form}
              key={index}
              updateMonitor={updateMonitor}
              dependantField={`field${index + 1}`}
            />
          ))}{" "}
        {/* No point to memo this as form will change */}
        <button type="submit">Submit</button>
      </form>
    </>
  )
}

type InputProps = {
  id: string
  form: FormProps
  updateForm: (input: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
  updateMonitor: (id: string) => void
  dependantField: string
}

const InputField = ({
  id,
  form,
  updateForm,
  updateMonitor,
  dependantField,
}: InputProps) => {
  useEffect(() => {
    updateMonitor(id)
  }, [form, id, updateMonitor])

  const renderInput = useMemo(
    () =>
      id.endsWith("5") || id.endsWith("0") ? (
        <select name="cars" id={id} value={form[id]} onChange={updateForm}>
          <option value="">Empty</option>
          <option value="volvo">Volvo</option>
          <option value="saab">Saab</option>
          <option value="opel">Opel</option>
          <option value="audi">Audi</option>
        </select>
      ) : (
        <input
          type="text"
          defaultValue={form[id]}
          id={id}
          onChange={updateForm}
        ></input>
      ),
    [form, id, updateForm]
  )

  return (
    <fieldset
      style={{ paddingBottom: 10, marginBottom: 10, display: "flex", gap: 2 }}
    >
      <label htmlFor={id}>
        {id}, dependant on {dependantField}({form[dependantField]})
      </label>
      {renderInput}
      {isEmpty(form[id]) && (
        <div style={{ color: "red", paddingLeft: 1 }}>Cannot be empty</div>
      )}
    </fieldset>
  )
}

function inputFormComparator(prevForm: InputProps, nextForm: InputProps) {
  return (
    prevForm.form[prevForm.id] === nextForm.form[nextForm.id] &&
    prevForm.form[prevForm.dependantField] ===
      nextForm.form[nextForm.dependantField]
  )
}

const MemoizeInput = memo(InputField, inputFormComparator)

export default LargeForm
