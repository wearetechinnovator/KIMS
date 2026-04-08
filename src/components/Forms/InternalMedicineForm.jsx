"use client";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import getStaticText from "@/helper/getStaticText";
import { getBaseUrl } from "@/helper/getBaseUrl";

const InternalMedicineForm = ({ type, title, subject }) => {
  const [basePath, setBasePath] = useState("");
  const [staticText, setStaticText] = useState({});
  const APPLICATION_FEE = 2000;

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    // Personal Details
    fullName: "",
    fatherHusbandName: "",
    motherName: "",
    mailingAddress: "",
    tel: "",
    email: "",
    gender: "",
    nationality: "Indian",
    personWithDisability: "No", // Yes/No
    disabilityType: "", // OH / CH / VH / HH
    disabilityPercent: "",
    category: "", // GEN / SC / ST / OBC / U R etc
    languageSpeak: "",
    languageWrite: "",
    dateOfBirth: "",
    // Eligibility
    undergradDegreeYear: "2025",
    ugCollegeUniversityName: "",
    mdmsPart1Year: "2025",
    mdmsPart1Details: "",
    mdmsCollegeUniversityName: "",
    collegeMailingAddress: "",
    registeredWithIndiaMedCouncil: "No", // Yes/No
    stateCouncilName: "",
    regNumber: "",
    regDate: "",
    // Certificate of Medical Fitness
    fitnessNameFullMailingAddress: "",
    criminalOffensePending: "No", // Yes / No
    // References
    clinicalRefName: "",
    clinicalRefOfficialAddress: "",
    clinicalRefTel: "",
    clinicalRefEmail: "",
    academicRefName: "",
    academicRefOfficialAddress: "",
    academicRefTel: "",
    academicRefEmail: "",
    // Uploads
    prescriptionFilename: "",
    prescriptionAttachment: "",
    docmentFilename: "",
    docmentAttachment: "",
    // Declaration
    declarationAccepted: false,
  });

  // --- static text + basePath init ---
  useEffect(() => {
    const init = async () => {
      setStaticText(await getStaticText());
      setBasePath(getBaseUrl(true, true));
    };
    init();
  }, []);

  // ---------- helpers ----------
  const validateEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email).toLowerCase());
  const validatePhone = (phone) => /^\+?\d{7,15}$/.test(String(phone).replace(/\s+/g, ""));

  const acceptedFileExt = [".jpg", ".jpeg", ".png", ".pdf"];

  const convertFileToBase64 = (file, fileKey, fileNameKey) =>
    new Promise((resolve, reject) => {
      if (!file) return reject("No file");
      const ext = "." + file.name.split(".").pop().toLowerCase();
      if (!acceptedFileExt.includes(ext)) return reject("Invalid file type");
      const reader = new FileReader();
      reader.onload = () => {
        resolve({ data: reader.result, name: file.name });
      };
      reader.onerror = () => reject("File reading error");
      reader.readAsDataURL(file);
    });

  const handleFileChange = async (e, attachmentKey, filenameKey) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const { data, name } = await convertFileToBase64(file);
      setFormData((p) => ({ ...p, [attachmentKey]: data, [filenameKey]: name }));
    } catch (err) {
      toast("Invalid file. Allowed: jpg, jpeg, png, pdf", { type: "error" });
    }
  };

  // ---------- validation ----------
  const validateForm = () => {
    // Required fields as per screenshot: fullName, father's name maybe optional but DOB, gender, address, email/tel?
    // We'll enforce a reasonable set: fullName, mailingAddress, dateOfBirth, gender, email, tel, declaration
    const required = [
      { field: "fullName", label: "Full Name" },
      { field: "mailingAddress", label: "Mailing Address" },
      { field: "dateOfBirth", label: "Date of Birth" },
      { field: "gender", label: "Gender" },
      { field: "email", label: "Email" },
      { field: "tel", label: "Contact Number" },
    ];

    for (let item of required) {
      if (!formData[item.field] || String(formData[item.field]).trim() === "") {
        toast(`${item.label} is required`, { type: "error" });
        return false;
      }
    }
    if (!validateEmail(formData.email)) {
      toast("Enter a valid email address", { type: "error" });
      return false;
    }
    if (!validatePhone(formData.tel)) {
      toast("Enter a valid phone number (7-15 digits)", { type: "error" });
      return false;
    }
    if (!formData.declarationAccepted) {
      toast("Please accept the declaration", { type: "error" });
      return false;
    }
    return true;
  };

  // ---------- submit ----------
  const handleSubmit = async () => {
    if (!validateForm()) return;
    setLoading(true);
    try {
      // Build HTML message (friendly summary)
      const htmlMsg = `
        <ul>
          <li><strong>Full Name:</strong> ${formData.fullName}</li>
          <li><strong>Father/Husband Name:</strong> ${formData.fatherHusbandName}</li>
          <li><strong>Mother's Name:</strong> ${formData.motherName}</li>
          <li><strong>Mailing Address:</strong> ${formData.mailingAddress}</li>
          <li><strong>Tel:</strong> ${formData.tel}</li>
          <li><strong>Email:</strong> ${formData.email}</li>
          <li><strong>Gender:</strong> ${formData.gender}</li>
          <li><strong>Nationality:</strong> ${formData.nationality}</li>
          <li><strong>Person with Disability:</strong> ${formData.personWithDisability} ${formData.personWithDisability === "Yes" ? `(${formData.disabilityType} - ${formData.disabilityPercent}%)` : ""}</li>
          <li><strong>Category:</strong> ${formData.category}</li>
          <li><strong>Languages:</strong> Speak: ${formData.languageSpeak} | Write: ${formData.languageWrite}</li>
          <li><strong>Date of Birth:</strong> ${formData.dateOfBirth}</li>
          <li><strong>UG Degree Year:</strong> ${formData.undergradDegreeYear}</li>
          <li><strong>UG College/University:</strong> ${formData.ugCollegeUniversityName}</li>
          <li><strong>MD/DNB/MRCP Part 1 Year:</strong> ${formData.mdmsPart1Year}</li>
          <li><strong>MD/DNB/MRCP Part 1 Details:</strong> ${formData.mdmsPart1Details}</li>
          <li><strong>MD/MS College/University:</strong> ${formData.mdmsCollegeUniversityName}</li>
          <li><strong>College Mailing Address:</strong> ${formData.collegeMailingAddress}</li>
          <li><strong>Registered with Indian/State Medical Council:</strong> ${formData.registeredWithIndiaMedCouncil}</li>
          <li><strong>State Council Name:</strong> ${formData.stateCouncilName}</li>
          <li><strong>Registration No:</strong> ${formData.regNumber}</li>
          <li><strong>Registration Date:</strong> ${formData.regDate}</li>
          <li><strong>Address:</strong> ${formData.fitnessNameFullMailingAddress}</li>
          <li><strong>Any criminal offenses pending:</strong> ${formData.criminalOffensePending}</li>
          <li><strong>Clinical Ref:</strong> ${formData.clinicalRefName} | ${formData.clinicalRefTel} | ${formData.clinicalRefEmail} | ${formData.clinicalRefOfficialAddress}</li>
          <li><strong>Academic Ref:</strong> ${formData.academicRefName} | ${formData.academicRefTel} | ${formData.academicRefEmail} | ${formData.academicRefOfficialAddress}</li>
          <li><strong>Page URL:</strong> ${document.location.href}</li>
        </ul>
      `;

      const payload = {
        data: htmlMsg,
        formType: type,
        subject: subject,
        ...formData,
      };

      // send request
      const res = await fetch("/api/send-mail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        ...formData
      });

      const json = await res.json();
      if (res.status !== 200) {
        throw new Error(json.err || "Failed to submit");
      }

      toast("Application submitted successfully", { type: "success" });

      // Redirect with encoded htmlMsg
            const encoded = encodeURIComponent(htmlMsg);
            // Store in localStorage
            localStorage.setItem('msg', encoded);
            // Redirect
            window.location.href = `${basePath}/thank-you`;
    } catch (err) {
      console.error(err);
      toast(err?.message || "Something went wrong", { type: "error" });
    } finally {
      setLoading(false);
    }
  };

  // ---------- UI ----------
  return (
    <section className="section">
      <div className="container">
        <div className="book-appointment-card">
          <div className="main-heading text-center mb-4">
            <h2>{title}</h2>
          </div>

          <div className="bg-field p-3">
            {/* Personal Details */}
            <h4 className="mb-3">Personal Details</h4>
            <div className="row">
              <div className="col-md-12 mb-3">
                <label>Full Name of Applicant (in Capital letters) *</label>
                <input className="form-control" value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })} />
              </div>

              <div className="col-md-12 mb-3">
                <label>Father's / Husband's Name</label>
                <input className="form-control" value={formData.fatherHusbandName}
                  onChange={(e) => setFormData({ ...formData, fatherHusbandName: e.target.value })} />
              </div>

              <div className="col-md-12 mb-3">
                <label>Mother's Name</label>
                <input className="form-control" value={formData.motherName}
                  onChange={(e) => setFormData({ ...formData, motherName: e.target.value })} />
              </div>

              <div className="col-md-12 mb-3">
                <label>Name & Full Mailing Address (in capital letters)</label>
                <textarea className="form-control" rows={3} value={formData.mailingAddress}
                  onChange={(e) => setFormData({ ...formData, mailingAddress: e.target.value })} />
              </div>

              <div className="col-md-6 mb-3">
                <label>Tel</label>
                <input className="form-control" value={formData.tel}
                  onChange={(e) => setFormData({ ...formData, tel: e.target.value })} />
              </div>

              <div className="col-md-6 mb-3">
                <label>Email</label>
                <input className="form-control" value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
              </div>

              <div className="col-md-3 mb-3">
                <label>Gender</label>
                <div>
                  <label className="me-2">
                    <input type="radio" name="gender" value="Male" checked={formData.gender === "Male"}
                      onChange={(e) => setFormData({ ...formData, gender: e.target.value })} /> Male
                  </label>
                  <label>
                    <input type="radio" name="gender" value="Female" checked={formData.gender === "Female"}
                      onChange={(e) => setFormData({ ...formData, gender: e.target.value })} /> Female
                  </label>
                </div>
              </div>

              <div className="col-md-3 mb-3">
                <label>Nationality</label>
                <div>
                  <label className="me-2">
                    <input type="radio" name="nationality" value="Indian" checked={formData.nationality === "Indian"}
                      onChange={(e) => setFormData({ ...formData, nationality: e.target.value })} /> Indian
                  </label>
                  <label>
                    <input type="radio" name="nationality" value="Other" checked={formData.nationality === "Other"}
                      onChange={(e) => setFormData({ ...formData, nationality: e.target.value })} /> Other
                  </label>
                </div>
              </div>

              <div className="col-md-3 mb-3">
                <label>Person with Disabilities</label>
                <div>
                  <label className="me-2">
                    <input type="radio" name="pwd" value="Yes" checked={formData.personWithDisability === "Yes"}
                      onChange={(e) => setFormData({ ...formData, personWithDisability: e.target.value })} /> Yes
                  </label>
                  <label>
                    <input type="radio" name="pwd" value="No" checked={formData.personWithDisability === "No"}
                      onChange={(e) => setFormData({ ...formData, personWithDisability: e.target.value, disabilityType: "", disabilityPercent: "" })} /> No
                  </label>
                </div>
              </div>

              {formData.personWithDisability === "Yes" && (
                <>
                  <div className="col-md-3 mb-3">
                    <label>Disability Type</label>
                    <select className="form-select" value={formData.disabilityType}
                      onChange={(e) => setFormData({ ...formData, disabilityType: e.target.value })}>
                      <option value="">Select</option>
                      <option value="OH">OH</option>
                      <option value="VH">VH</option>
                      <option value="HH">HH</option>
                    </select>
                  </div>

                  <div className="col-md-3 mb-3">
                    <label>Percentage of Disability (%)</label>
                    <input type="number" min="0" max="100" className="form-control" value={formData.disabilityPercent}
                      onChange={(e) => setFormData({ ...formData, disabilityPercent: e.target.value })} />
                  </div>
                </>
              )}

              <div className="col-md-3 mb-3">
                <label>Category</label>
                <select className="form-select" value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}>
                  <option value="">Select</option>
                  <option value="GEN">GEN</option>
                  <option value="SC">SC</option>
                  <option value="ST">ST</option>
                  <option value="OBC">OBC</option>
                  <option value="UR">UR</option>
                </select>
              </div>

              <div className="col-md-3 mb-3">
                <label>Speak</label>
                <select className="form-select" value={formData.languageSpeak}
                  onChange={(e) => setFormData({ ...formData, languageSpeak: e.target.value })}>
                  <option value="">Select</option>
                  <option value="ENG">English</option>
                  <option value="KAN">Kannda</option>
                  <option value="HINDI">Hindi</option>
                  <option value="MLM">Malayalam</option>
                  <option value="TAM">Tamil</option>
                </select>
              </div>

              <div className="col-md-3 mb-3">
                <label>Write</label>
                <select className="form-select" value={formData.languageWrite}
                  onChange={(e) => setFormData({ ...formData, languageWrite: e.target.value })}>
                  <option value="">Select</option>
                  <option value="ENG">English</option>
                  <option value="KAN">Kannda</option>
                  <option value="HINDI">Hindi</option>
                  <option value="MLM">Malayalam</option>
                  <option value="TAM">Tamil</option>
                </select>
              </div>

              <div className="col-md-3 mb-3">
                <label>Date of Birth</label>
                <input type="date" className="form-control" value={formData.dateOfBirth}
                  onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })} />
              </div>
            </div>

            {/* Eligibility */}
            <h4 className="mt-4 mb-3">Eligibility</h4>
            <div className="row">
              <div className="col-md-3 mb-3">
                <label>Undergraduate Degree Year</label>
                <select className="form-select" value={formData.undergradDegreeYear}
                  onChange={(e) => setFormData({ ...formData, undergradDegreeYear: e.target.value })}>
                  <option value="1984">1984</option>
                  <option value="1985">1985</option>
                  <option value="1986">1986</option>
                  <option value="1987">1987</option>
                  <option value="1988">1988</option>
                  <option value="1989">1989</option>
                  <option value="1990">1990</option>
                  <option value="1991">1991</option>
                  <option value="1992">1992</option>
                  <option value="1993">1993</option>
                  <option value="1994">1994</option>
                  <option value="1995">1995</option>
                  <option value="1996">1996</option>
                  <option value="1997">1997</option>
                  <option value="1998">1998</option>
                  <option value="1999">1999</option>
                  <option value="2000">2000</option>
                  <option value="2001">2001</option>
                  <option value="2002">2002</option>
                  <option value="2003">2003</option>
                  <option value="2004">2004</option>
                  <option value="2005">2005</option>
                  <option value="2006">2006</option>
                  <option value="2007">2007</option>
                  <option value="2008">2008</option>
                  <option value="2009">2009</option>
                  <option value="2010">2010</option>
                  <option value="2011">2011</option>
                  <option value="2012">2012</option>
                  <option value="2013">2013</option>
                  <option value="2014">2014</option>
                  <option value="2015">2015</option>
                  <option value="2016">2016</option>
                  <option value="2017">2017</option>
                  <option value="2018">2018</option>
                  <option value="2019">2019</option>
                  <option value="2020">2020</option>
                  <option value="2021">2021</option>
                  <option value="2022">2022</option>
                  <option value="2023">2023</option>
                  <option value="2024">2024</option>
                  <option value="2025">2025</option>
                </select>
              </div>

              <div className="col-md-9 mb-3">
                <label>College / University Name</label>
                <input className="form-control" value={formData.ugCollegeUniversityName}
                  onChange={(e) => setFormData({ ...formData, ugCollegeUniversityName: e.target.value })} />
              </div>

              <div className="col-md-3 mb-3">
                <label>MD/DNB/MRCP Part 1</label>
                <select className="form-select" value={formData.mdmsPart1Year}
                  onChange={(e) => setFormData({ ...formData, mdmsPart1Year: e.target.value })}>
                  <option value="1984">1984</option>
                  <option value="1985">1985</option>
                  <option value="1986">1986</option>
                  <option value="1987">1987</option>
                  <option value="1988">1988</option>
                  <option value="1989">1989</option>
                  <option value="1990">1990</option>
                  <option value="1991">1991</option>
                  <option value="1992">1992</option>
                  <option value="1993">1993</option>
                  <option value="1994">1994</option>
                  <option value="1995">1995</option>
                  <option value="1996">1996</option>
                  <option value="1997">1997</option>
                  <option value="1998">1998</option>
                  <option value="1999">1999</option>
                  <option value="2000">2000</option>
                  <option value="2001">2001</option>
                  <option value="2002">2002</option>
                  <option value="2003">2003</option>
                  <option value="2004">2004</option>
                  <option value="2005">2005</option>
                  <option value="2006">2006</option>
                  <option value="2007">2007</option>
                  <option value="2008">2008</option>
                  <option value="2009">2009</option>
                  <option value="2010">2010</option>
                  <option value="2011">2011</option>
                  <option value="2012">2012</option>
                  <option value="2013">2013</option>
                  <option value="2014">2014</option>
                  <option value="2015">2015</option>
                  <option value="2016">2016</option>
                  <option value="2017">2017</option>
                  <option value="2018">2018</option>
                  <option value="2019">2019</option>
                  <option value="2020">2020</option>
                  <option value="2021">2021</option>
                  <option value="2022">2022</option>
                  <option value="2023">2023</option>
                  <option value="2024">2024</option>
                  <option value="2025">2025</option>
                </select>
              </div>

              <div className="col-md-9 mb-3">
                <label>Details</label>
                <input className="form-control" value={formData.mdmsPart1Details}
                  onChange={(e) => setFormData({ ...formData, mdmsPart1Details: e.target.value })} />
              </div>

              <div className="col-md-12 mb-3">
                <label>College/University Name</label>
                <input className="form-control" value={formData.mdmsCollegeUniversityName}
                  onChange={(e) => setFormData({ ...formData, mdmsCollegeUniversityName: e.target.value })} />
              </div>

              <div className="col-md-12 mb-3">
                <label>Name & Full Mailing Address (in capital letters)</label>
                <textarea className="form-control" rows={3} value={formData.collegeMailingAddress}
                  onChange={(e) => setFormData({ ...formData, collegeMailingAddress: e.target.value })} />
              </div>

              <div className="col-md-6 mb-3">
                <label>Registration with Indian/State Medical Council?</label>
                <div>
                  <label className="me-2">
                    <input type="radio" name="registeredCouncil" value="Yes"
                      checked={formData.registeredWithIndiaMedCouncil === "Yes"}
                      onChange={(e) => setFormData({ ...formData, registeredWithIndiaMedCouncil: e.target.value })} /> Yes
                  </label>
                  <label>
                    <input type="radio" name="registeredCouncil" value="No"
                      checked={formData.registeredWithIndiaMedCouncil === "No"}
                      onChange={(e) => setFormData({ ...formData, registeredWithIndiaMedCouncil: e.target.value, stateCouncilName: "", regNumber: "", regDate: "" })} /> No
                  </label>
                </div>
              </div>

              <div className="col-md-6 mb-3">
                <label>Name of State Council</label>
                <input className="form-control" value={formData.stateCouncilName}
                  onChange={(e) => setFormData({ ...formData, stateCouncilName: e.target.value })} />
              </div>

              <div className="col-md-6 mb-3">
                <label>Reg. No</label>
                <input className="form-control" value={formData.regNumber}
                  onChange={(e) => setFormData({ ...formData, regNumber: e.target.value })} />
              </div>

              <div className="col-md-6 mb-3">
                <label>Date of Registration</label>
                <input type="date" className="form-control" value={formData.regDate}
                  onChange={(e) => setFormData({ ...formData, regDate: e.target.value })} />
              </div>
            </div>

            {/* Certificate of Medical Fitness */}
            <h4 className="mt-4 mb-3">Certificate of Medical Fitness</h4>
            <p>I hereby state that I am not suffering from any medical condition either acute or chronic which can affect my training in KIMSHEALTH in an adverse manner. I have not been treated / treated for any chronic illness in the past (specify if indicated).</p>
            <div className="mb-3">
              <label>Address (Name & Full Mailing Address in capital letters)</label>
              <textarea className="form-control" rows={4} value={formData.fitnessNameFullMailingAddress}
                onChange={(e) => setFormData({ ...formData, fitnessNameFullMailingAddress: e.target.value })} />
            </div>

            <div className="mb-3">
              <label>If any criminal offences or pending cases against you?</label>
              <div>
                <label className="me-2">
                  <input type="radio" name="criminal" value="Yes" checked={formData.criminalOffensePending === "Yes"}
                    onChange={(e) => setFormData({ ...formData, criminalOffensePending: e.target.value })} /> Yes
                </label>
                <label>
                  <input type="radio" name="criminal" value="No" checked={formData.criminalOffensePending === "No"}
                    onChange={(e) => setFormData({ ...formData, criminalOffensePending: e.target.value })} /> No
                </label>
              </div>
            </div>

            {/* Reference */}
            <h4 className="mt-4 mb-3">Reference</h4>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label>Clinical Reference (Name)</label>
                <input className="form-control" value={formData.clinicalRefName}
                  onChange={(e) => setFormData({ ...formData, clinicalRefName: e.target.value })} />
              </div>
              <div className="col-md-6 mb-3">
                <label>Academic Reference (Name)</label>
                <input className="form-control" value={formData.academicRefName}
                  onChange={(e) => setFormData({ ...formData, academicRefName: e.target.value })} />
              </div>

              <div className="col-md-6 mb-3">
                <label>Clinical Reference Official Address</label>
                <textarea className="form-control" rows={2} value={formData.clinicalRefOfficialAddress}
                  onChange={(e) => setFormData({ ...formData, clinicalRefOfficialAddress: e.target.value })} />
              </div>

              <div className="col-md-6 mb-3">
                <label>Academic Reference Official Address</label>
                <textarea className="form-control" rows={2} value={formData.academicRefOfficialAddress}
                  onChange={(e) => setFormData({ ...formData, academicRefOfficialAddress: e.target.value })} />
              </div>

              <div className="col-md-3 mb-3">
                <label>Clinical Ref Tel</label>
                <input className="form-control" value={formData.clinicalRefTel}
                  onChange={(e) => setFormData({ ...formData, clinicalRefTel: e.target.value })} />
              </div>

              <div className="col-md-3 mb-3">
                <label>Clinical Ref Email</label>
                <input className="form-control" value={formData.clinicalRefEmail}
                  onChange={(e) => setFormData({ ...formData, clinicalRefEmail: e.target.value })} />
              </div>

              <div className="col-md-3 mb-3">
                <label>Academic Ref Tel</label>
                <input className="form-control" value={formData.academicRefTel}
                  onChange={(e) => setFormData({ ...formData, academicRefTel: e.target.value })} />
              </div>

              <div className="col-md-3 mb-3">
                <label>Academic Ref Email</label>
                <input className="form-control" value={formData.academicRefEmail}
                  onChange={(e) => setFormData({ ...formData, academicRefEmail: e.target.value })} />
              </div>
            </div>

            {/* Uploads */}
            <h4 className="mt-4 mb-3">Uploads</h4>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label>Upload photo *</label>
                <input type="file" className="form-control" accept=".jpg,.jpeg,.png,.pdf"
                  onChange={(e) => handleFileChange(e, "prescriptionAttachment", "prescriptionFilename")} />
                {formData.prescriptionFilename && <small className="d-block mt-1">{formData.prescriptionFilename}</small>}
              </div>

              <div className="col-md-6 mb-3">
                <label>Upload Payment Details *</label>
                <input type="file" className="form-control" accept=".jpg,.jpeg,.png,.pdf"
                  onChange={(e) => handleFileChange(e, "docmentAttachment", "docmentFilename")} />
                {formData.docmentFilename && <small className="d-block mt-1">{formData.docmentFilename}</small>}
              </div>
            </div>

            {/* Declaration + Fee */}
            <div className="mt-4 mb-3">
              <div className="form-check mb-2">
                <input type="checkbox" className="me-2" id="declaration"
                  checked={formData.declarationAccepted}
                  onChange={(e) => setFormData({ ...formData, declarationAccepted: e.target.checked })} />
                <label className="form-check-label" htmlFor="declaration">
                  I hereby declare that all the particulars furnished in the application form are correct to the best of my knowledge.
                </label>
              </div>

              <div className="mb-3">
                <strong>Application Fee: </strong> ₹{APPLICATION_FEE}

              </div>

              <div class="from-btn text-center">
                <button type="button" onClick={handleSubmit} disabled={loading} class="btn d-inline-block w-auto mt-2">Submit {loading && <i className="fas fa-spinner fa-spin ms-2 "></i>}</button>


                <a href="#" data-bs-toggle="modal" data-bs-target="#bankAccount" className="btn d-inline-block w-auto ms-3 mt-2"
                > Bank Details For Application Fee
                </a>


              </div>
            </div>
          </div>
          {/* end custom-from */}
        </div>


<div class="modal fade" id="bankAccount" tabindex="-1" aria-hidden="true" style={{zIndex:'9999'}}>
  <div class="modal-dialog modal-dialog-centered modal-lg">
    <div class="modal-content border-0 shadow-lg rounded-4">
      <div class="modal-header text-white rounded-top-4" style={{backgroundColor: '#c13434'}}>
        <h5 class="modal-title fw-semibold">
          Bank Details for Application Fee
        </h5>
        <button
          type="button"
          class="btn-close btn-close-white"
          data-bs-dismiss="modal"
          aria-label="Close"
        ></button>
      </div>

      <div class="modal-body  p-4">
        <div class="text-center mb-4">
          <h4 class="fw-bold mb-1">Application Fee ₹ 2,000 /-</h4>
        </div>

        <ul class="list-group list-group-flush border rounded-3">
          <li class="list-group-item">
            <strong>Name of Beneficiary:</strong> KIMS Healthcare Management Ltd
          </li>
          <li class="list-group-item">
            <strong>Beneficiary Contact No:</strong> 0471-3041396, 3041393
          </li>
          <li class="list-group-item">
            <strong>Beneficiary Email ID:</strong>
            <a href="mailto:rajakumar.m@kimshealth.org">rajakumar.m@kimshealth.org</a> /
            <a href="mailto:vishnu.ms@kimshealth.org">vishnu.ms@kimshealth.org</a>
          </li>
          <li class="list-group-item">
            <strong>Name &amp; Address of Bank:</strong><br />
            State Bank of India, Commercial Branch,<br />
            Sree Ganesh Kripa, Jas Hotel Road, Thycaud,<br />
            Trivandrum – 695014, Kerala, India<br />
            <strong>Phone:</strong> 0471-2339891
          </li>
          <li class="list-group-item"><strong>MICR Code:</strong> 695002021</li>
          <li class="list-group-item"><strong>Account Type:</strong> Cash Credit Account</li>
          <li class="list-group-item"><strong>Account Number:</strong> 30123158726</li>
          <li class="list-group-item"><strong>IFSC Code:</strong> SBIN0004350</li>
        </ul>
      </div>

      <div class="modal-footer justify-content-center border-0 pb-4">
        <button
          type="button"
          class="btn btn-outline-secondary px-4"
          data-bs-dismiss="modal"
        >
          Close
        </button>
      </div>
    </div>
  </div>
</div>


      </div>
    </section>
  );
};

export default InternalMedicineForm;
