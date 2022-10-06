import React from "react";
import Logo from "./assets/logo.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

export default function Navbar({ fixed }) {
  const [navbarOpen, setNavbarOpen] = React.useState(false);
  return (
    <>
      <nav className="relative flex flex-wrap items-center justify-between px-2 py-3 h-20 bg-gray-800">
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <a className="text-sm font-bold leading-relaxed inline-block whitespace-nowrap uppercase text-white" href="#pablo">
              <img src={Logo} className="logo" alt="logo" />
            </a>
            <button
              className="text-white cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none bg-none"
              type="button"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              <FontAwesomeIcon icon={faBars}/>
            </button>
          </div>
          <div className={"lg:flex flex-grow items-center" + (navbarOpen ? " flex justify-end items-end" : " hidden")} id="example-navbar-danger">
            <ul className={"flex flex-col lg:flex-row list-none lg:ml-auto " + (navbarOpen ? " justify-end items-end" : "")}>
              <li className="nav-item">
                <a className="px-3 py-3 flex items-center uppercase tracking-wider leading-snug text-white hover:opacity-75 hover:text-cyan-400" href="#pablo">
                  <span className="ml-2">Portfolio</span>
                </a>
              </li>
              <li className="nav-item">
                <a className="px-3 py-3 flex items-center uppercase tracking-wider leading-snug text-white hover:opacity-75 hover:text-cyan-400" href="#pablo">
                  <span className="ml-2">Active Projects</span>
                </a>
              </li>
              <li className="nav-item">
                <a className="px-3 py-3 flex items-center uppercase tracking-wider leading-snug text-white hover:opacity-75 hover:text-cyan-400" href="#pablo">
                  <span className="ml-2">Certifications</span>
                </a>
              </li>
              <li className="nav-item">
                <a className="px-3 py-3 flex items-center uppercase tracking-wider leading-snug text-white hover:opacity-75 hover:text-cyan-400" href="#pablo">
                  <span className="ml-2">Contact</span>
                </a>
              </li>
              <li className="nav-item">
                <button className="button uppercase bg-cyan-600 ml-4 font-extrabold">Resumé</button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
