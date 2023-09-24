import React, { forwardRef } from "react";

const Card = forwardRef((props, ref) => {
  return (
    <>
      <div className="card my-10 rounded-2xl w-80" ref={ref}>
        <a className="h-full" href={props.url} aria-label={props.title}>
        <div className="max-w-sm rounded-2xl border shadow-md bg-gray-800 border-gray-500">
          <div className="flex h-60 bg-zinc-200 rounded-t-2xl align-middle items-center">
              <img className="card-img px-5 mx-auto" src={props.image} alt={props.title} />
          </div>
          <div className="p-5 h-100">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-white">
                {props.title}
              </h5>
            <p className="mb-3 font-normal text-gray-400">
              {props.desc}
            </p>
            {props.languages.map((data, index) => {
              return (
                <span
                  key={index}
                  className="inline-block px-3 py-1 mx-1 my-1 text-sm font-semibold text-white bg-cyan-600 rounded-full"
                >
                  {data}
                </span>
              );
            })}
          </div>          
        </div>
        </a>
      </div>
    </>
  );
});

export default Card;