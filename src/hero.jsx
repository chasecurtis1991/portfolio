import React from "react";
import HeroBg from "./assets/Rectangle.svg"

export default function Hero() {
    return (
        <>
            <h1 className="absolute ml-60 my-32 align-middle text-white">Chase Curtis</h1>
            <h2 className="absolute ml-60 my-48 text-white text-xl">Web Developer</h2>
            <img src={HeroBg} className="w-full"/>
        </>
    )
}

