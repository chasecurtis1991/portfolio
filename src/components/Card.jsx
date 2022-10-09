import React from "react";

export default function Card(props) {
  return (
    <>
      <div className="card my-10 shadow-xl rounded-2xl">
        <a className="h-full" href={props.url} aria-label={props.title}>
        <div className="max-w-sm rounded-2xl border shadow-md bg-gray-800 border-gray-500">
          <div className="flex h-60 bg-zinc-200 rounded-t-2xl align-middle items-center">
              <img className="card-img px-5 mx-auto" src={props.image} alt={props.title} />
          </div>
          <div className="p-5 h-40">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-white">
                {props.title}
              </h5>
            <p className="mb-3 font-normal text-gray-400">
              {props.desc}
            </p>
          </div>
        </div>
        </a>
      </div>
    </>
  );
}
