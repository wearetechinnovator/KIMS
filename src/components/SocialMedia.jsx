"use client"

import { useEffect, useState } from "react";
import getStaticText from "@/helper/getStaticText";

const SocialMedia = ({ socialWidgetID }) => {
    const [staticTexts, setStaticTexts] = useState({});
    const [widgetID] = useState(
        socialWidgetID || "elfsight-app-ee9a0b8c-7785-49ab-be28-50eff9d278a3"
    );
    const [loadWidget, setLoadWidget] = useState(false);

    useEffect(() => {
        const fetchTexts = async () => {
            setStaticTexts({ ...(await getStaticText()) });
        };
        fetchTexts();
    }, []);

    useEffect(() => {
        const handleLoad = () => {
            setLoadWidget(true);
        };

        if (document.readyState === "complete") {
            handleLoad();
        } else {
            window.addEventListener("load", handleLoad);
        }

        return () => window.removeEventListener("load", handleLoad);
    }, []);

    useEffect(() => {
        if (!loadWidget) return;

        const script = document.createElement("script");
        script.src = "https://static.elfsight.com/platform/platform.js";
        script.async = true;
        script.defer = true;

        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, [loadWidget]);

    return (
        <section className="section">
            <div className="container">
                <h2>{staticTexts["Social Media Updates"]}</h2>

                {loadWidget && (
                    <div className={widgetID} data-elfsight-app-lazy></div>
                )}
            </div>
        </section>
    );
};

export default SocialMedia;