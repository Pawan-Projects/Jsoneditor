"use client";
import React, { useEffect, useRef } from "react";

export default function FormRenderer({ schema, setFormData }) {
  const editorRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    async function loadEditor() {
      if (!schema) return;

      // ✅ Dynamically import JSONEditor properly
      const { JSONEditor } = await import("@json-editor/json-editor");

      // Destroy previous instance if it exists
      if (editorRef.current) {
        editorRef.current.destroy();
        editorRef.current = null;
      }

      // ✅ Correct way to initialize
      const editor = new JSONEditor(containerRef.current, {
        schema,
        theme: "bootstrap5",
        disable_collapse: false,
        disable_edit_json: false,
        disable_properties: false,
      });

      editor.on("change", () => {
        setFormData(editor.getValue());
      });

      editorRef.current = editor;
    }

    loadEditor();

    return () => {
      if (editorRef.current) {
        editorRef.current.destroy();
        editorRef.current = null;
      }
    };
  }, [schema]);

  return (
    <div className="p-4 border rounded-lg bg-gray-50">
      <h2 className="font-bold text-lg mb-2">🧩 Form Renderer</h2>
      <div ref={containerRef}></div>
    </div>
  );
}
