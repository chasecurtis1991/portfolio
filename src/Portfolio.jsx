import React from "react";
import Card from "./components/Card"

export default function Portfolio(props) {
  return (
    <>
      <section className="container mx-auto">
        <div className="flex flex-wrap justify-center">
          <Card className="" title="Test Title" desc="Test Description" image="/src/assets/nubelson-fernandes--Xqckh_XVU4-unsplash.jpg"/>
          <Card className="" title="Test Title" desc="Test Description" image="/src/assets/nubelson-fernandes--Xqckh_XVU4-unsplash.jpg"/>
          <Card className="" title="Test Title" desc="Test Description" image="/src/assets/nubelson-fernandes--Xqckh_XVU4-unsplash.jpg"/>
        </div>
      </section>
    </>
  );
}
