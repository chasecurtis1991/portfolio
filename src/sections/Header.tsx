"use client"; // This marks the component as a Client Component

import {useEffect, useRef, useState} from 'react';
import { scrollToSection } from '@/utils/scrollUtils';

export const Header = () => {
    const [indicatorPosition, setIndicatorPosition] = useState<number>(0);
    const [indicatorWidth, setIndicatorWidth] = useState<number>(0);
    const [activeLink, setActiveLink] = useState<string>("home");

    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
        e.preventDefault();
        scrollToSection(sectionId);
        setActiveLink(sectionId);
    };

    useEffect(() => {
        const sections: { [key: string]: HTMLElement | null } = {
            home: document.querySelector("#home"),
            projects: document.querySelector("#projects"),
            about: document.querySelector("#about"),
            contact: document.querySelector("#contact")
        };

        const navLinks: { [key: string]: HTMLElement | null } = {
            home: document.querySelector("#home-link"),
            projects: document.querySelector("#projects-link"),
            about: document.querySelector("#about-link"),
            contact: document.querySelector("#contact-link")
        };

        const navbar = document.querySelector("nav"); // Get the navbar container

        const moveIndicator = (section: string) => {
            const activeLink = navLinks[section];
            if (activeLink && navbar) {
                const linkRect = activeLink.getBoundingClientRect();
                const navbarRect = navbar.getBoundingClientRect();

                // Calculate the position relative to the navbar container
                const leftPosition = linkRect.left - navbarRect.left - 2;

                setIndicatorPosition(leftPosition); // Update the indicator's left position relative to the navbar
                setIndicatorWidth(linkRect.width - 2);  // Update the indicator's width to match the link
                setActiveLink(section);             // Set the active link for text color change
            }
        };

        const updateActiveLink = () => {
            let currentSection: string | null = null;

            Object.keys(sections).forEach(section => {
                const sectionElement = sections[section];
                if (sectionElement) {
                    const sectionTop = sectionElement.offsetTop;
                    const sectionHeight = sectionElement.offsetHeight;
                    const scrollPosition = window.scrollY + window.innerHeight / 1.5;

                    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                        currentSection = section; // Section found, set it as the current section
                    }
                }
            });

            if (currentSection) {
                moveIndicator(currentSection); // Move the indicator to the current section's nav link
            }
        };

        window.addEventListener('scroll', updateActiveLink);

        // Initial position on page load
        moveIndicator("home");

        return () => {
            window.removeEventListener('scroll', updateActiveLink);
        };
    }, []);

    return (
        <div className={"flex justify-center items-center fixed top-3 w-full z-10"}>
            <nav className={"relative flex gap-1 p-0.5 border border-white/15 rounded-full bg-white/10 backdrop-blur"} role="navigation" aria-label="Main navigation">
                {/* Sliding indicator */}
                <div
                    className="absolute bg-white rounded-full transition-transform duration-300 ease-out"
                    style={{
                        height: "90%",
                        width: `${indicatorWidth}px`,
                        transform: `translateX(${indicatorPosition}px)`
                    }}
                    aria-hidden="true"
                />
                <a
                    href="#home"
                    id="home-link"
                    className={`nav-item relative z-10 ${activeLink === "home" ? "text-gray-900" : "text-white"}`}
                    onClick={(e) => handleNavClick(e, "home")}
                    aria-current={activeLink === "home" ? "page" : undefined}
                >Home</a>
                <a
                    href="#projects"
                    id="projects-link"
                    className={`nav-item relative z-10 ${activeLink === "projects" ? "text-gray-900" : "text-white"}`}
                    onClick={(e) => handleNavClick(e, "projects")}
                    aria-current={activeLink === "projects" ? "page" : undefined}
                >Projects</a>
                <a
                    href="#about"
                    id="about-link"
                    className={`nav-item relative z-10 ${activeLink === "about" ? "text-gray-900" : "text-white"}`}
                    onClick={(e) => handleNavClick(e, "about")}
                    aria-current={activeLink === "about" ? "page" : undefined}
                >About</a>
                <a
                    href="#contact"
                    id="contact-link"
                    className={`nav-item relative z-10 ${activeLink === "contact" ? "text-gray-900" : "text-white"}`}
                    onClick={(e) => handleNavClick(e, "contact")}
                    aria-current={activeLink === "contact" ? "page" : undefined}
                >Contact</a>
            </nav>
        </div>
    );
};
