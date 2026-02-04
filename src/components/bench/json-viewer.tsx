"use client";

import { useState } from "react";

interface Props {
  data: unknown;
  label?: string;
  defaultOpen?: boolean;
}

export function JsonViewer({ data, label = "Details", defaultOpen = false }: Props) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="rounded border bg-gray-50">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between px-3 py-2 text-left text-xs font-medium text-gray-600 hover:bg-gray-100"
      >
        <span>{label}</span>
        <span className="text-gray-400">{open ? "▲" : "▼"}</span>
      </button>
      {open && (
        <pre className="max-h-80 overflow-auto border-t px-3 py-2 text-xs text-gray-700">
          {JSON.stringify(data, null, 2)}
        </pre>
      )}
    </div>
  );
}
