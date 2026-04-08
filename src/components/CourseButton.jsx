"use client";
import getStaticText from '@/helper/getStaticText';
import React, { useEffect, useState } from 'react';
import Form1 from './Forms/Form1';

const CourseButton = ({ corseCategory, courseName }) => {
  const [show, setShow] = useState(false);
  const [staticTexts, setStaticTexts] = useState({});

  useEffect(() => {
    const fetchTexts = async () => {
      const texts = await getStaticText();
      setStaticTexts(texts);
    };
    fetchTexts();
  }, []);

  return (
    <>
      {/* Button */}
        <a href="#" className="doctotal-btn" onClick={() => setShow(true)}>
          {staticTexts['Enquire Now'] || "Enquire Now"}
        </a>

      {/* Popup */}
      <div
        onClick={() => setShow(false)}
        style={{
          position: "fixed",
          top: "0",
          left: "0",
          width: "100%",
          height: "100vh",
          backgroundColor: "#00000012",
          display: show ? "grid" : "none",
          placeItems: "center",
          zIndex: "99999",
        }}
      >
        <div className='course-popup-form'
          onClick={(e) => e.stopPropagation()}
          style={{
            position: "relative",
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "7px",
            boxShadow: "0px 0px 10px #222",
            maxWidth: "600px",
            width: "100%",
          }}
        >
          {/* Close Button */}
          <div
            onClick={() => setShow(false)}
            style={{
              backgroundColor: "white",
              width: "30px",
              height: "30px",
              borderRadius: "100px",
              position: "absolute",
              right: "-15px",
              top: "-15px",
              display: "grid",
              placeItems: "center",
              cursor: "pointer",
              boxShadow: "0px 0px 5px black",
            }}
          >
            ❌
          </div>

          {/* Form goes here */}
          <Form1
            title="Request a Call Back"
            subject={`${corseCategory} : ${courseName}`}
          />
        </div>
      </div>
    </>
  );
};

export default CourseButton;
