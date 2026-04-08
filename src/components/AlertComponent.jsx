"use client"
import React, { useState } from 'react';

const AlertComponent = ({ data }) => {
    const [visible, setVisible] = useState(true);
    const type = data.type === "error" ? "danger" : data.type;
    const message = data.message;
    if (!visible || !type || !message) return null;

    return (
        <div
            className={`alert alert-${type} alert-dismissible fade show`}
            role="alert"
        >
            {message}
            <button
                type="button"
                className="btn-close"
                data-bs-dismiss="alert"
                aria-label="Close"
                onClick={() => setVisible(true)}
            ></button>
        </div>
    );
};

export default AlertComponent;
