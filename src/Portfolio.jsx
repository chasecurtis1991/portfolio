import React from "react";
import Card from "./components/Card"
import { projects } from "./assets/projects.json"

export default function Portfolio(props) {
  return (
    <>
      <section className="container mx-auto">
        <div className="flex flex-wrap">
          <div className="flex-row w-full">
            <h1 className="text-black portfolio-title">My Projects</h1>
          </div>
          <div className="flex flex-wrap flex-row gap-x-6 mx-auto justify-center">
            {projects.map(data => {
              return <Card key={data.name} title={data.name} desc={data.description} image={data.image} url={data.url}/>
            })}
          </div>
        </div>
      </section>
    </>
  );
}
