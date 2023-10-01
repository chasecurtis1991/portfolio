import React from "react";

export default function Contact() {
  return (
    <>
      <section className="mx-auto border-t-2 py-16 bg-white" id="contact">
        <div className="container flex flex-wrap mx-auto">
          <div className="flex-row w-full">
            <h1 className="text-black mb-8">Contact Me</h1>
          </div>
          <div className="w-full">
		  <div>
			<label htmlFor="email" className="text-black">
				Email:
			</label>
			<a href="mailto:chasecurtis1991@gmail.com" className="mx-2 my-1" id="email">
				chasecurtis1991@gmail.com
			</a>
			</div>
			<div>
			<label htmlFor="linkedin" className="text-black">
				LinkedIn:
			</label>
			<a
				href="https://www.linkedin.com/in/chasecurtis/"
				target="_blank"
				rel="noopener noreferrer"
				className="mx-2 my-1"
				id="linkedin"
			>
				Chase Curtis
			</a>
			</div>
          </div>
        </div>
      </section>
    </>
  );
}