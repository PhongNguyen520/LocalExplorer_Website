"use client"

import * as React from "react"
import { cn } from "../../../utils/cn"

export function ChartContainer({ children, className, config }) {
  return (
    <div className={cn("w-full", className)}>
      {children}
    </div>
  )
}

export function ChartTooltip({ content, ...props }) {
  // Bọc lại recharts Tooltip, truyền content vào
  const { Tooltip } = require("recharts")
  return <Tooltip {...props} content={content} />
}

export function ChartTooltipContent({ active, payload, label, hideLabel }) {
  if (!active || !payload || !payload.length) return null
  return (
    <div className="rounded-lg border bg-background p-2 shadow-sm min-w-[120px]">
      {!hideLabel && (
        <div className="mb-1 text-xs font-medium text-muted-foreground">
          {label}
        </div>
      )}
      {payload.map((entry, idx) => (
        <div key={idx} className="flex items-center gap-2 text-sm">
          <span
            className="inline-block w-2 h-2 rounded-full"
            style={{ background: entry.color }}
          />
          <span className="font-medium">{entry.value.toLocaleString()} ₫</span>
        </div>
      ))}
    </div>
  )
} 