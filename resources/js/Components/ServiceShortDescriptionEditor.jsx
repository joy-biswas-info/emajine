import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // import styles

const ServiceShortDescriptionEditor = ({
    shortDescription,
    setShortDescription,
}) => {
    const handleChange = (content, delta, source, editor) => {
        setShortDescription(content);
    };

    return (
        <div>
            <ReactQuill 
                value={shortDescription}
                onChange={handleChange}
                className="h-48 mb-12 block"
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

export default ServiceShortDescriptionEditor;
