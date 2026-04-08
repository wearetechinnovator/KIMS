"use client";
import { useState } from 'react';

const WatchVideoButton = ({ txt, id }) => {
    const [show, setShow] = useState(false)

    return (
        <>
            <div className="main-btn" >
                <a href='javascript:void(0)'  onClick={() => setShow(true)}>{txt}
                    <span><i className="fa-solid fa-arrow-right"></i></span>
                </a>
            </div>

            <div
                onClick={() => setShow(false)}
                style={{
                    position: "fixed",
                    top: '0',
                    left: '0',
                    width: "100%",
                    height: "100vh",
                    backgroundColor: '#00000012',
                    display: show ? "grid" : 'none',
                    placeItems: "center",
                    zIndex: '99999'
                }}>
                <div
                    onClick={(e) => {
                        e.stopPropagation();
                    }}
                    style={{
                        position: "relative",
                        backgroundColor: 'white',
                        padding: '10px',
                        borderRadius: "7px",
                        boxShadow: "0px 0px 10px #222"
                    }}
                >
                    <div
                        onClick={(e) => {
                            e.stopPropagation();
                            setShow(false)
                        }}
                        style={{
                            backgroundColor: "white",
                            width: '30px',
                            height: "30px",
                            borderRadius: '100px',
                            position: "absolute",
                            right: "-15px",
                            top: "-15px",
                            display: 'grid',
                            placeItems: "center",
                            cursor: 'pointer',
                            boxShadow: "0px 0px 5px black",

                        }}
                    >❌</div>
                    <iframe width="560" height="315" src={`https://www.youtube.com/embed/${id}?si=uQi_tVy9LN6UaOhE`} title={"Kimshealth"} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                </div>

            </div>

        </>
    )
}

export default WatchVideoButton;