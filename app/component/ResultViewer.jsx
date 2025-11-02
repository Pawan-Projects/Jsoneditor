"use client";
import React from "react";

export default function ResultViewer({ formData }) {
  return (
    <div className="p-4 border rounded-lg bg-gray-50">
      <h2 className="font-bold text-lg mb-2">Form Data Output</h2>
      <pre className="bg-white p-3 rounded text-sm border overflow-auto">
        {JSON.stringify(formData, null, 2)}
      </pre>
    </div>
  );
}
