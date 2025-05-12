/* eslint-disable react-hooks/rules-of-hooks */
import React, { FormEvent, useEffect, useReducer, useState } from "react"
import { ChangeEvent, useCallback, useMemo } from "react"
import { createContainer } from "react-tracked"

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
  if (action.type === "ADD") {
    return [...state, action.fieldIdUpdated]
  }
  return state
}

const formValue = () =>
  useState<FormProps>({
    field1: "hello",
    field2: "world",
    field3: "test field",
  })

const { Provider, useTracked } = createContainer(formValue)

const LargeForm2 = () => {
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
    <Provider>
      <div style={{ paddingBottom: 10 }}>
        Exact copy of LargeForm. Using react-tracked, but codes defers alot.
        <ol>
          <li>
            Input render array must now be static, as rerender handles
            internally.
          </li>
          <li>Less code, with full selector use.</li>
        </ol>
      </div>
      <div>
        <strong>Last 5 Rerendered Input:</strong> {printableMonitorData}
      </div>
      <InputForm updateMonitor={updateMonitor} />
    </Provider>
  )
}

const InputForm = ({
  updateMonitor,
}: {
  updateMonitor: (id: string) => void
}) => {
  const [form] = useTracked()
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

  const printableFormData = useMemo(() => JSON.stringify(form), [form])

  //Note 1: Memo this to prevent re-render
  const renderStaticArray = useMemo(
    () =>
      Array(noOfFields)
        .fill(0)
        .map((_key, index) => (
          <InputField
            id={`field${index}`}
            key={index}
            updateMonitor={updateMonitor}
            dependantField={`field${index + 1}`}
          />
        )),
    [updateMonitor]
  )

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
        {renderStaticArray}
        <button type="submit">Submit</button>
      </form>
    </>
  )
}

type InputProps = {
  id: string
  updateMonitor: (id: string) => void
  dependantField: string
}

const InputField = ({ id, updateMonitor, dependantField }: InputProps) => {
  const [form, setForm] = useTracked()

  const updateForm = useCallback(
    (input: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { id, value } = input.target

      setForm((form) => ({
        ...form,
        [id]: value,
      }))
    },
    [setForm]
  )

  useEffect(() => {
    updateMonitor(id)
  }, [id, updateMonitor, form])

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

export default LargeForm2
