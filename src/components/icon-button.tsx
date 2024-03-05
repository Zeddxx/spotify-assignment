import React from "react"

interface IconButtonProps {
    type: "icon" | "button"
    title?: string
    className?: string
    children: React.ReactNode
    disabled?: boolean
    onClick?: () => void
}

const IconButton = ({ type, title, className, children, onClick, disabled = false } : IconButtonProps) => {
  return (
    <button onClick={onClick} disabled={disabled} title={title} className={`${type === "icon" ? 'rounded-full' : ''} ${className || ""} ${disabled && 'cursor-not-allowed opacity-65'}`}>
        {children}
    </button>
  )
}
export default IconButton