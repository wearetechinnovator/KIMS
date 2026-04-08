"use client"
import { getBaseUrl } from '@/helper/getBaseUrl';
import langLoc from '@/helper/getLangLoc';
import getStaticText from '@/helper/getStaticText';
import React, { useEffect, useState } from 'react'

const HospitalFilter = ({ title, selectedLocation }) => {
    const [allLocation, setAllLocation] = useState();
    const [basePathOnlyLang, setBasePathOnlyLang] = useState()
    const [staticTexts, setStaticTexts] = useState({});



    useEffect(() => {
        const fetchTexts = async () => {
            setStaticTexts({ ...await getStaticText() })
        };

        fetchTexts();
    }, []);

    useEffect(() => {
        const get = async () => {
            setAllLocation(await langLoc.getLocations())
            setBasePathOnlyLang(getBaseUrl(true, false))
        }

        get()

    }, [])


    const onLocationChange = (e) => {
        const url = e.target.value;
        window.open(url, '_self', 'noreferrer');

    }

    return (
        <>
            <div className="row justify-content-between">
                <div className="col-md-8 col-12">
                    <div className="main-heading">
                        <h2>{title}</h2>
                    </div>
                </div>
                <div className="col-md-3 col-12 hospital-mainpage-form mb-lg-0 mb-4">
                    {/* <form action="">
                        <div className="input-group p-0 position-relative justify-content-center">
                            
                            <button className="input-group-text border-0 search-btn-page">
                                <i className="fa-solid fa-angle-down"></i>
                            </button>
                        </div>
                    </form> */}
                    <select value={basePathOnlyLang + "/" + selectedLocation.slug} className="form-select " onChange={onLocationChange}>
                        <option value={basePathOnlyLang + "/hospital"}>{staticTexts['All Hospital']}</option>
                        {
                            allLocation?.map((loc, i) => {
                                return <option value={basePathOnlyLang + "/" + loc.slug} key={i}>{loc.title}</option>
                            })
                        }

                    </select>
                </div>
            </div>
        </>
    )
}

export default HospitalFilter;