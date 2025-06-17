import React from "react";

interface SOPProps {
  sop: {
    _id: string;
    title: string;
    content: string;
    priority: "low" | "medium" | "high";
    status: "draft" | "published" | "archived" | "completed";
    createdAt: string;
    updatedAt: string;
    createdBy?: string;
    updatedBy?: string;
  };
}

const SOP: React.FC<SOPProps> = ({ sop }) => {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "1rem",
        marginBottom: "1rem",
      }}
    >
      <h3>{sop.title}</h3>
      <p>
        <strong>Priority:</strong> {sop.priority}
      </p>
      <p>
        <strong>Status:</strong> {sop.status}
      </p>
      <p>
        <strong>Created:</strong> {new Date(sop.createdAt).toLocaleString()}
      </p>
      <p>
        <strong>Updated:</strong> {new Date(sop.updatedAt).toLocaleString()}
      </p>

      {/* Future: Display createdBy / updatedBy names if available */}
      {sop.createdBy && (
        <p>
          <strong>Created By:</strong> {sop.createdBy}
        </p>
      )}
      {sop.updatedBy && (
        <p>
          <strong>Updated By:</strong> {sop.updatedBy}
        </p>
      )}

      <div style={{ marginTop: "0.5rem" }}>
        <button onClick={() => console.log("Edit", sop._id)}>Edit</button>
        <button
          onClick={() => console.log("Delete", sop._id)}
          style={{ marginLeft: "1rem", color: "red" }}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default SOP;
