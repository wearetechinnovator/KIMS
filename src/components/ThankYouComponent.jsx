"use client"
import React, { useState } from 'react';

const ThankYouComponent = ({ data }) => {
    let updatedMsg;
    const encoded = localStorage.getItem('msg');
    if (encoded) {
        updatedMsg = decodeURIComponent(encoded);
    }

    return (
        <div
                    dangerouslySetInnerHTML={{ __html: updatedMsg || "" }}
                    className="main-heading main-list sub-heading"
                  />
    );
};

export default ThankYouComponent;
