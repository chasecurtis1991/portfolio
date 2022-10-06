import React from "react";

export default function Card(props) {
  return (
    <>
      <div className="card">
        <div className="max-w-sm rounded-2xl border shadow-md bg-gray-800 border-gray-700">
          <a href="#">
            <img className="rounded-t-2xl" src={props.image} alt="" />
          </a>
          <div className="p-5">
            <a href="#">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-white">
                {props.title}
              </h5>
            </a>
            <p className="mb-3 font-normal text-gray-400">
              {props.desc}
            </p>
            <a
              href="#"
              className="inline-flex items-center py-2 px-3 text-sm font-medium text-center hover:text-white text-white bg-cyan-600 rounded-lg hover:bg-cyan-700 focus:ring-4 focus:outline-none"
            >
              Read more              
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
