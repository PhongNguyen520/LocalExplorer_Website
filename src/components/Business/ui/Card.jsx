const Card = ({ children, className = "", hover = false, onClick, ...props }) => {
  return (
    <div
      className={`bg-white rounded-lg border border-gray-200 ${hover ? "card-hover" : ""} ${className}`}
      onClick={onClick}
      tabIndex={onClick ? 0 : undefined}
      role={onClick ? "button" : undefined}
      style={onClick ? { cursor: "pointer" } : undefined}
      {...props}
    >
      {children}
    </div>
  );
};

const CardHeader = ({ children, className = "" }) => {
  return <div className={`px-6 py-4 border-b border-gray-200 ${className}`}>{children}</div>
}

const CardContent = ({ children, className = "" }) => {
  return <div className={`px-6 py-4 ${className}`}>{children}</div>
}

const CardTitle = ({ children, className = "" }) => {
  return <h3 className={`text-lg font-semibold text-gray-900 ${className}`}>{children}</h3>
}

const CardDescription = ({ children, className = "" }) => {
  return <p className={`text-sm text-gray-600 ${className}`}>{children}</p>
}

export { Card, CardHeader, CardContent, CardTitle, CardDescription }
