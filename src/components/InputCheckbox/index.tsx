import classNames from "classnames"
import { useEffect, useRef, useState } from "react"
import { InputCheckboxComponent } from "./types"
import { check } from "prettier"

export const InputCheckbox: InputCheckboxComponent = ({ id, checked = false, disabled, onChange }) => {
  const { current: inputId } = useRef(`RampInputCheckbox-${id}`)
  const [isChecked, setIsChecked] = useState(() => {
    const savedCheck = localStorage.getItem(inputId)
    return savedCheck ? JSON.parse(savedCheck) : checked
  })

  useEffect(() => {
    localStorage.setItem(inputId, JSON.stringify(isChecked))
  }, [inputId, isChecked])

  const handleCheck = () => {
    const checkStatus = !isChecked
    setIsChecked(checkStatus)
    onChange(checkStatus)
  }

  return (
    <div className="RampInputCheckbox--container" data-testid={inputId}>
      <label
        className={classNames("RampInputCheckbox--label", {
          "RampInputCheckbox--label-checked": isChecked,
          "RampInputCheckbox--label-disabled": disabled,
        })}
        htmlFor={inputId}
      />
      <input
        id={inputId}
        type="checkbox"
        className="RampInputCheckbox--input"
        checked={isChecked}
        disabled={disabled}
        onChange={handleCheck}
      />
    </div>
  )
}
