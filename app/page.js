// "use client";
// import React, { useState, useEffect } from "react";

// export default function JsonSchemaEditor() {
//   const [schemaText, setSchemaText] = useState(`{
//   "title": "User Info",
//   "type": "object",
//   "properties": {
//     "name": { "type": "string" },
//     "age": { "type": "number" },
//     "email": { "type": "string" }
//   },
//   "required": ["name", "email"]
// }`);
//   const [schema, setSchema] = useState(null);
//   const [error, setError] = useState("");
//   const [formData, setFormData] = useState({});
//   const [isMounted, setIsMounted] = useState(false);

//   // ensure only runs client-side
//   useEffect(() => setIsMounted(true), []);

//   // Parse JSON safely when text changes
//   useEffect(() => {
//     if (!isMounted) return;

//     try {
//       if (!schemaText.trim()) {
//         setSchema(null);
//         setError("Schema cannot be empty.");
//         return;
//       }

//       const parsed = JSON.parse(schemaText);
//       setSchema(parsed);
//       setError("");
//     } catch {
//       setSchema(null);
//       setError("❌ Invalid JSON schema");
//     }
//   }, [schemaText, isMounted]);

//   // Handle form input change
//   const handleChange = (key, value) => {
//     setFormData((prev) => ({ ...prev, [key]: value }));
//   };

//   // Render dynamic form from JSON schema
//   const renderForm = () => {
//     if (!schema?.properties) return null;

//     return Object.entries(schema.properties).map(([key, prop]) => {
//       const isRequired = schema.required?.includes(key);
//       return (
//         <div key={key} style={{ marginBottom: "12px" }}>
//           <label style={{ fontWeight: "bold" }}>
//             {key} {isRequired && <span style={{ color: "red" }}>*</span>}
//           </label>
//           <br />
//           <input
//             type={prop.type === "number" ? "number" : "text"}
//             value={formData[key] || ""}
//             onChange={(e) =>
//               handleChange(key, prop.type === "number" ? +e.target.value : e.target.value)
//             }
//             style={{
//               width: "100%",
//               padding: "8px",
//               borderRadius: "6px",
//               border: "1px solid #ccc",
//               marginTop: "4px",
//             }}
//           />
//         </div>
//       );
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     alert("✅ Form Submitted:\n" + JSON.stringify(formData, null, 2));
//   };

//   return (
//     <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
//       <h2>🧩 JSON Schema Editor + Form Builder</h2>

//       <textarea
//         value={schemaText}
//         onChange={(e) => setSchemaText(e.target.value)}
//         rows={10}
//         style={{
//           width: "100%",
//           fontFamily: "monospace",
//           fontSize: "14px",
//           padding: "10px",
//           borderRadius: "8px",
//           border: "1px solid #ccc",
//         }}
//       />

//       {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}

//       {!error && schema && (
//         <>
//           <div
//             style={{
//               backgroundColor: "#f4f4f4",
//               padding: "15px",
//               marginTop: "20px",
//               borderRadius: "8px",
//             }}
//           >
//             <h3>✅ Parsed Schema Preview:</h3>
//             <pre>{JSON.stringify(schema, null, 2)}</pre>
//           </div>

//           <div
//             style={{
//               backgroundColor: "#fff",
//               padding: "20px",
//               marginTop: "20px",
//               border: "1px solid #ddd",
//               borderRadius: "8px",
//               boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
//             }}
//           >
//             <h3>📝 Auto-Generated Form</h3>
//             <form onSubmit={handleSubmit}>{renderForm()}
//               <button
//                 type="submit"
//                 style={{
//                   backgroundColor: "#0070f3",
//                   color: "white",
//                   border: "none",
//                   padding: "10px 16px",
//                   borderRadius: "6px",
//                   cursor: "pointer",
//                   marginTop: "10px",
//                 }}
//               >
//                 Submit
//               </button>
//             </form>
//           </div>
//         </>
//       )}
//     </div>
//   );
// }

"use client";
import { useState } from "react";
import SchemaEditor from "./component/SchemaEditor";
import FormRenderer from "./component/FormRenderer";
import ResultViewer from "./component/ResultViewer";
import "bootstrap/dist/css/bootstrap.min.css";

export default function HomePage() {

 const JsonSchema = {
        title: "Person",
        type: "object",
        properties: {
          name: { type: "string", title: "Full Name" },
          age: { type: "number", title: "Age" },
          gender: { type: "string", enum: ["male", "female", "other"], title: "Gender" },
          address: {
            type: "object",
            title: "Address",
            properties: {
              street: { type: "string", title: "Street" },
              city: { type: "string", title: "City" },
              state: { type: "string", title: "State" },
              zip: { type: "string", title: "ZIP Code" },
            },
          },
          pets: {
            type: "array",
            title: "Pets",
            items: {
              type: "object",
              properties: {
                name: { type: "string", title: "Pet Name" },
                type: { type: "string", title: "Animal Type" },
              },
            },
          },
        },
      }


      //json.stringyfy 3 value leta hai 1st (JsonDATA, Replacer, spaces) 
      //replacer = > filter karne ke liye ki kon si property leni hai json ki or kon si nhi , is case me hame sari chahiye isliye humne null rakha
      //spaces=> nested json data or main branch ke bich me kitne spaces ka indent rakhna hai usko batati hai ye 
      
  const [schemaText, setSchemaText] = useState(
    JSON.stringify(
      JsonSchema,
      null,
      2
    )
  );

  const [schema, setSchema] = useState(JsonSchema);
  const [formData, setFormData] = useState({});

  const handleUpdateSchema = () => {
    try {
      const parsed = JSON.parse(schemaText);
      setSchema(parsed);
    } catch (error) {
      alert("❌ Invalid JSON Schema!");
    }
  };

  return (
    <div className="container-fluid bg-light min-vh-100 p-4">
      <h1 className="text-center mb-4 font-bold text-2xl">🧠 JSON Form Builder (Next.js)</h1>

      <div className="row g-4">
        <div className="col-md-4">
          <SchemaEditor
            schemaText={schemaText}
            setSchemaText={setSchemaText}
            onUpdate={handleUpdateSchema}
          />
        </div>
        <div className="col-md-4">
          <FormRenderer schema={schema} setFormData={setFormData} />
        </div>
        <div className="col-md-4">
          <ResultViewer formData={formData} />
        </div>
      </div>
    </div>
  );
}
