"use client"

import React from "react"

import { useState } from "react"
import PropTypes from "prop-types"

export function Tabs({ defaultValue, className, children }) {
  const [activeTab, setActiveTab] = useState(defaultValue)

  // Filter children to find TabsList and TabsContent components
  const tabsList = children.find((child) => child.type === TabsList)
  const tabsContent = children.find((child) => child.type === TabsContent)

  // Clone TabsList and TabsContent with the activeTab state
  const clonedTabsList = tabsList
    ? React.cloneElement(tabsList, {
        activeTab,
        setActiveTab,
      })
    : null

  const clonedTabsContent = tabsContent
    ? React.cloneElement(tabsContent, {
        activeTab,
      })
    : null

  return (
    <div className={className}>
      {clonedTabsList}
      {clonedTabsContent}
    </div>
  )
}

export function TabsList({ children, activeTab, setActiveTab, className }) {
  // Clone TabsTrigger children with activeTab state
  const clonedChildren = React.Children.map(children, (child) => {
    if (child.type === TabsTrigger) {
      return React.cloneElement(child, {
        isActive: activeTab === child.props.value,
        onClick: () => setActiveTab(child.props.value),
      })
    }
    return child
  })

  return (
    <div className={`inline-flex h-10 items-center justify-center rounded-md bg-gray-100 p-1 ${className}`}>
      {clonedChildren}
    </div>
  )
}

export function TabsTrigger({ children, value, isActive, onClick, className }) {
  return (
    <button
      className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${
        isActive
          ? "bg-white text-foreground shadow-sm"
          : "text-muted-foreground hover:text-foreground hover:bg-gray-200"
      } ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export function TabsContent({ children, value, activeTab, className }) {
  if (value !== activeTab) {
    return null
  }

  return <div className={className}>{children}</div>
}

Tabs.propTypes = {
  defaultValue: PropTypes.string.isRequired,
  className: PropTypes.string,
  children: PropTypes.node,
}

TabsList.propTypes = {
  children: PropTypes.node,
  activeTab: PropTypes.string,
  setActiveTab: PropTypes.func,
  className: PropTypes.string,
}

TabsTrigger.propTypes = {
  children: PropTypes.node,
  value: PropTypes.string.isRequired,
  isActive: PropTypes.bool,
  onClick: PropTypes.func,
  className: PropTypes.string,
}

TabsContent.propTypes = {
  children: PropTypes.node,
  value: PropTypes.string.isRequired,
  activeTab: PropTypes.string,
  className: PropTypes.string,
}
