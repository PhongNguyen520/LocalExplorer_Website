import PropTypes from "prop-types"

export function Badge({ className, variant = "default", ...props }) {
  const variants = {
    default: "bg-primary text-primary-foreground hover:bg-primary/80",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
    destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/80",
    outline: "text-foreground border border-input hover:bg-accent hover:text-accent-foreground",
  }

  return (
    <div
      className={`inline-flex items-center rounded-full border px-1.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${variants[variant]} ${className}`}
      {...props}
    />
  )
}

Badge.propTypes = {
  className: PropTypes.string,
  variant: PropTypes.oneOf(["default", "secondary", "destructive", "outline"]),
  children: PropTypes.node,
}
