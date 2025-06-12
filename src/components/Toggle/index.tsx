import styles from "./Toggle.module.css"

interface ToggleProps {
  label: string
  disabled?: boolean
  checked?: boolean
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const Toggle = ({ label, disabled, checked, onChange }: ToggleProps) => (
  <label className={styles.container}>
    <input
      type="checkbox"
      disabled={disabled}
      checked={checked}
      onChange={onChange}
    />
    <span className="pl-4 font-bold">{label}</span>
  </label>
)

export default Toggle
