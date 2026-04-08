"use client"
import { getBaseUrl } from '@/helper/getBaseUrl';
import getStaticText from '@/helper/getStaticText';
import React, { useEffect, useRef, useState } from 'react';

const SearchBox = ({ query }) => {
  const [basePath, setBasePath] = useState("");
  const [basePathOnlyLang, setBasePathOnlyLang] = useState("");
  const [searchQ, setSearchQ] = useState(query || "");
  const [staticTexts, setStaticTexts] = useState({});

  useEffect(() => {
    const fetchTexts = async () => {
      setStaticTexts({ ...(await getStaticText()) });
    };
    fetchTexts();
  }, []);

  useEffect(() => {
    setBasePath(getBaseUrl(true, true));
    setBasePathOnlyLang(getBaseUrl(true, false));
  }, []);

  const searchWeb = () => {
    const searchText = searchQ.trim();
    if (!searchText) {
      alert("Please enter a search term.");
      return;
    }
    const encodedQuery = encodeURIComponent(searchText);
    location.href = `${basePath}/search/?query=${encodedQuery}`;
  };

  return (
    <>
      <input
        type="text"
        className="form-control"
        placeholder={(staticTexts['Search Text'] || "Search") + " ...."}
        value={searchQ}
        id="headerSearchIcon"
        onChange={(e) => setSearchQ(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            searchWeb();
          }
        }}
      />
      <a
        href={`${basePath}/search/?query=${encodeURIComponent(searchQ)}`}
        className="input-group-text"
        id="from-icon"
        onClick={(e) => {
          if (!searchQ.trim()) {
            e.preventDefault();
            alert("Please enter a search term.");
          }
        }}
      >
        <i className="fa-solid icon-magnifier"></i>
      </a>
    </>
  );
};

export default SearchBox;
