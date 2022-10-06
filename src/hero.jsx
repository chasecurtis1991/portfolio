import React from "react";

export default function Hero() {
    return (
        <section className="hero container mx-auto">
            <div className="mx-auto align-middle">
                <div className="flex flex-row flex-wrap hero-flex">
                    <div className="basis-1/2 py-40">
                        <h1 className="text-white name">Chase Curtis</h1>
                        <h2 className="text-white text-xl subtitle">Web Developer</h2>
                    </div>
                    <div className="basis-1/2 justify-end">
                        {/* <img className="hero-bg ml-auto" src="/src/assets/IMG_0930.PNG"/> */}
                    </div>
                </div>
            </div>
        </section>
    )
}

