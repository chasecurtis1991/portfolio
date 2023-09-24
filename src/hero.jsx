import React from "react";

export default function Hero() {
  return (
    <>
      <section className="hero container mx-auto my-10">
        <div className="mx-auto align-middle">
          <div className="flex flex-col md:flex-row flex-wrap justify-center hero-flex">
            <div className="py-28">
              <h1 className="text-white name">Chase Curtis</h1>
              <h2 className="text-white text-xl subtitle">Web Developer</h2>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
