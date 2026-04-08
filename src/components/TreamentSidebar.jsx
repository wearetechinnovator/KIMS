"use client"

import procedureData from "@/app/lib/getProcedure";
import { useEffect, useState } from "react";

const TreamentSidebar = ({ title, procedures, baseUrlOnlyLang, allSpeciality }) => {
    const [allProcedures, setAllProcedures] = useState([])
    const [staticTexts, setStaticTexts] = useState({});



    useEffect(() => {
        const fetchTexts = async () => {
            setStaticTexts({ ...await getStaticText() })
        };

        fetchTexts();
    }, []);


    useEffect(() => {
        setAllProcedures([...procedures]);
    }, [procedures])

    const selectSpeciality = async (e) => {
        const speltyId = e.target.value;
        if (!speltyId) {
            setAllProcedures([...procedures]);
            return;
        }

        const filterProcedures = await procedureData.getProcedureBySpeciality(speltyId);
        setAllProcedures([...filterProcedures]);
    };


    return (
        <>
            <div className="col-md-4 speciality-page-search-section">
                <div className="main-heading">
                    <h2 className="mb-2">{title}</h2>
                </div>
                <form action="">
                    <div className="input-group p-0 my-lg-3 my-3 position-relative justify-content-center">
                        {/* speciality-page-search */}
                        <select className="form-select" onChange={selectSpeciality}>
                            <option value={""}>{staticTexts['Select by Speciality']}</option>
                            {
                                allSpeciality?.map((sp, index) => {
                                    return <option value={sp.speciality?.documentId} key={index}>
                                        {sp.title}
                                    </option>
                                })
                            }
                        </select>
                        <button type='button' className="input-group-text border-0 search-btn-page">
                            <i className="fa-solid fa-angle-down"></i>
                        </button>
                    </div>
                </form>
                <div className="row">
                    {
                        allProcedures?.map((p, index) => {
                            return <div className="col-md-12" key={index}>
                                <div className="speciality-masterpage-card-content">
                                    <a href={baseUrlOnlyLang + "/procedure/" + p.procedure?.slug}>{p.title}</a>
                                </div>
                            </div>
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default TreamentSidebar