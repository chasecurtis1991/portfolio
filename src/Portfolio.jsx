import React, { useEffect, useRef } from "react";
import Card from "./components/Card";
import { projects } from "./assets/projects.json";

export default function Portfolio(props) {
  const cardRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const cardIndex = cardRefs.current.indexOf(entry.target);
            entry.target.style.transitionDelay = `${cardIndex * 0.2}s`;
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    cardRefs.current.forEach(ref => {
      observer.observe(ref);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <section className="container mx-auto">
        <div className="flex flex-wrap">
          <div className="flex-row w-full">
            <h1 className="text-black portfolio-title">My Projects</h1>
          </div>
          <div className="flex flex-wrap flex-row gap-x-6 mx-auto justify-center">
          {projects.map((data, index) => {
              return (
                <Card
                  key={data.name}
                  title={data.name}
                  desc={data.description}
                  image={data.image}
                  url={data.url}
                  languages={data.languages}
                  ref={el => (cardRefs.current[index] = el)}
                />
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
