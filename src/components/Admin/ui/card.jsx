import PropTypes from "prop-types"

export function Card({ className, ...props }) {
  return <div className={`bg-card text-card-foreground shadow-sm ${className}`} {...props} />
}

export function CardHeader({ className, ...props }) {
  return <div className={`flex flex-col space-y-1.5 pl-6 pt-6 pb-4 ${className}`} {...props} />
}

export function CardTitle({ className, ...props }) {
  return <h3 className={`text-2xl font-semibold leading-none tracking-tight ${className}`} {...props} />
}

export function CardDescription({ className, ...props }) {
  return <p className={`text-sm text-muted-foreground ${className}`} {...props} />
}

export function CardContent({ className, ...props }) {
  return <div className={`p-6 pt-0 ${className}`} {...props} />
}

export function CardFooter({ className, ...props }) {
  return <div className={`flex items-center p-6 pt-0 ${className}`} {...props} />
}

Card.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
}

CardHeader.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
}

CardTitle.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
}

CardDescription.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
}

CardContent.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
}

CardFooter.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
}
