"use client";
import React from "react";

export default function SchemaEditor({ schemaText, setSchemaText, onUpdate }) {
  return (
    <div className="p-4 border rounded-lg bg-gray-50 d-flex flex-column">
      <h2 className="font-bold text-lg mb-2">🧱 JSON Schema Editor</h2>
      <textarea
        value={schemaText}
        onChange={(e) => setSchemaText(e.target.value)}
        rows={20}
        className="w-full p-2 border rounded font-mono text-sm bg-white"
      />
      <button
        onClick={onUpdate}
        className="mt-3 px-4 py-2 bg-dark text-white rounded hover:bg-blue-700"
      >
        Update Form
      </button>
    </div>
  );
}
