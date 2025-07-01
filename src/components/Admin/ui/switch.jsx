"use client"

import { useState } from "react"
import PropTypes from "prop-types"

export function Switch({ defaultChecked, id, className, ...props }) {
  const [checked, setChecked] = useState(defaultChecked || false)

  const handleChange = (e) => {
    setChecked(e.target.checked)
    if (props.onChange) {
      props.onChange(e)
    }
  }

  return (
    <div className="flex items-center">
      <input type="checkbox" id={id} checked={checked} onChange={handleChange} className="sr-only" {...props} />
      <label
        htmlFor={id}
        className={`relative inline-flex h-6 w-11 cursor-pointer items-center rounded-full bg-gray-300 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
          checked ? "bg-green-600" : ""
        } ${className}`}
      >
        <span
          className={`inline-block h-5 w-5 rounded-full bg-white transition-transform ${
            checked ? "translate-x-5" : "translate-x-1"
          }`}
        />
      </label>
    </div>
  )
}

Switch.propTypes = {
  defaultChecked: PropTypes.bool,
  id: PropTypes.string,
  className: PropTypes.string,
  onChange: PropTypes.func,
}
