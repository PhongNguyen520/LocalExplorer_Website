import React, { useEffect } from "react";

export function Dialog({ open, onOpenChange, children }) {
 useEffect(() => {
    if (!open) return;
    const handleEsc = (e) => {
      if (e.key === "Escape") onOpenChange(false);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [open, onOpenChange]);

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/30" onClick={() => onOpenChange(false)} />
      {children}
    </div>
  );
}

export function DialogContent({ children, className = "" }) {
  return (
    <div className={`relative bg-white rounded-lg shadow-lg p-6 z-50 ${className}`}>
      {children}
    </div>
  );
}

export function DialogHeader({ children }) {
  return <div className="mb-4">{children}</div>;
}
export function DialogTitle({ children }) {
  return <h2 className="text-xl font-bold mb-1">{children}</h2>;
}
export function DialogDescription({ children }) {
  return <p className="text-slate-500 text-sm">{children}</p>;
} 