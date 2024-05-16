import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // import styles

const ServiceDescriptionEditor = ({ description, setDescription }) => {
    const handleChange = (content, delta, source, editor) => {
        setDescription(content);
    };

    return (
        <div>
            <ReactQuill
                value={description}
                onChange={handleChange}
                className="h-96 mb-12"
                modules={{
                    toolbar: [
                        [{ header: "1" }, { header: "2" }, { font: [] }],
                        [{ list: "ordered" }, { list: "bullet" }],
                        ["bold", "italic", "underline"],
                        ["image", "code-block"],
                    ],
                }}
                formats={[
                    "header",
                    "font",
                    "list",
                    "bullet",
                    "bold",
                    "italic",
                    "underline",
                    "image",
                    "code-block",
                ]}
            />
        </div>
    );
};

export default ServiceDescriptionEditor;
