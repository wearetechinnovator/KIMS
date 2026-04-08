"use client"
import getStaticText from '@/helper/getStaticText';
import React, { useEffect, useState, useRef } from 'react'
import langLoc from '@/helper/getLangLoc';
import getCurrentLangLocClient from '@/helper/getCurrentLangLocClient';
import { toast } from 'react-toastify';
import { getBaseUrl } from '@/helper/getBaseUrl';



const FormInternationalFacilities = ({ title, type, subject }) => {
  const [basePath, setBasePath] = useState();
  const [staticTexts, setStaticTexts] = useState({});
  const [allLocation, setAllLocation] = useState();
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [formData, setFormData] = useState({
    name: "", number: "+1", location: '', emailId: ''
  });

  const phoneInputRef = useRef(null);

  const itiRef = useRef(null);

  const [loading, setLoading] = useState(false);

  // Init intlTelInput once
  useEffect(() => {
    if (typeof window !== "undefined" && phoneInputRef.current) {
      // eslint-disable-next-line no-undef
      itiRef.current = intlTelInput(phoneInputRef.current, {
        utilsScript:
          "https://cdn.jsdelivr.net/npm/intl-tel-input@19.5.5/build/js/utils.js",
        initialCountry: "us",
      });

      phoneInputRef.current.addEventListener("countrychange", (e) => {
        setFormData((prev) => ({
          ...prev,
          number: e.target.value,
        }));
      });

      phoneInputRef.current.addEventListener("input", (e) => {

        setFormData((prev) => ({
          ...prev,
          number: e.target.value,
        }));
      });
    }
  }, []);


  const sendMail = async () => {
    setLoading(true);
    if ([formData.name, formData.number, formData.emailId, formData.location].some((field) => !field || field === "")) {
      toast("Fill the required fields", {
        theme: 'light',
        type: 'error',
        closeOnClick: true
      })
      setLoading(false);
      return;
    }

    // ✅ Validate phone number (10–13 digits, optional + at start)
    if (!/^\+?\d{10,13}$/.test(formData.number)) {
      toast("Enter a valid mobile number", {
        theme: 'light',
        type: 'error',
        closeOnClick: true
      })
      setLoading(false);
      return;
    }

    try {
      const htmlMsg = `
        <ul>
          <li><strong> Subject: </strong> ${`${subject}`}</li>
          <li><strong> Name: </strong> ${formData.name}</li>
          <li><strong> Mobile Number: </strong> ${formData.number}</li>
          <li><strong> Location: </strong> ${formData.location}</li>
          <li><strong> Email: </strong> ${formData.emailId}</li>
          <li><strong> Page URL: </strong> ${document.location.href}</li>
        </ul>`;
      const req = await fetch("/api/send-mail", {
        method: 'POST',
        'headers': {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ data: htmlMsg, formType: type ? type : "Contact", locationData: "trivandrum", subject }),
      });

      const res = await req.json();

      if (req.status !== 200) {
        setLoading(false);
        return toast(res.err, {
          theme: 'light',
          type: 'error',
          closeOnClick: true
        })
      }

      toast("Successfully sent", {
        theme: 'light',
        type: 'success',
        closeOnClick: true
      })

      // Redirect with encoded htmlMsg
            const encoded = encodeURIComponent(htmlMsg);
            // Store in localStorage
            localStorage.setItem('msg', encoded);
            // Redirect
            window.location.href = `${basePath}/thank-you`;

      // Remove data
      setFormData({ name: "", number: "+1", location: '', emailId: '' });
      setSelectedLocation("");
      setLoading(false);
      return;


    } catch (error) {

      setLoading(false);
      return toast("Something went wrong", {
        theme: 'light',
        type: 'error',
        closeOnClick: true
      })
    }

  }


  useEffect(() => {
    const fetchTexts = async () => {
      setStaticTexts({ ...await getStaticText() })
    };
    setBasePath(getBaseUrl(true, true));
    fetchTexts();
  }, []);

  useEffect(() => {
    const get = async () => {
      setAllLocation(await langLoc.getLocations())

      const loc = (await getCurrentLangLocClient()).loc;
      setSelectedLocation(loc.slug);

      setFormData({
        ...formData, location: loc.title
      })
    }

    get()

  }, [])


  return (
    <>
      <h3>{staticTexts[title]}</h3>
      <div className="row">
        <div className="col-md-12 mb-3">
          <input type="text" className="form-control" placeholder={staticTexts['Name']}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            value={formData.name}
          />
        </div>
        <div className="col-md-12 mb-3">
          <input type="text" className="form-control"
            placeholder={staticTexts['Enter Your Location']}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            value={formData.location}
          />
        </div>
        <div className="col-md-12 mb-3">
          <input
              type="tel"
              ref={phoneInputRef}
              className="form-control"
              placeholder={staticTexts["Enter Mobile Number"]}
              defaultValue={formData.number} // let intlTelInput handle formatting
            />
        </div>
        
        <div className="col-md-12 mb-3">
          <input type="text" className="form-control"
            placeholder={staticTexts['Enter Your Email']}
            onChange={(e) => setFormData({ ...formData, emailId: e.target.value })}
            value={formData.emailId}
          />
        </div>
        <div className="col-md-12 mb-3 text-center">
          <button className="btn mb-lg-0 mb-2 hospital-primarybtn px-5 py-2" disabled={loading} onClick={sendMail}>
            {staticTexts['Submit']}
            {loading && <i className="fas fa-spinner fa-spin ms-1"></i>}
          </button>
        </div>
      </div>
    </>
  )
}

export default FormInternationalFacilities