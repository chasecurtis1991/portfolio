"use client";

import { useEffect, useState } from 'react';
import { scrollToSection } from '@/utils/scrollUtils';

interface HeaderProps {
  onBlogVisibilityChange: (isVisible: boolean) => void;
}

export const Header = ({ onBlogVisibilityChange }: HeaderProps) => {
    const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });
    const [activeLink, setActiveLink] = useState("home");

    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
        e.preventDefault();
        if (sectionId === "blog") {
            onBlogVisibilityChange(true);
        } else {
            onBlogVisibilityChange(false);
            scrollToSection(sectionId);
        }
        setActiveLink(sectionId);
    };

    useEffect(() => {
        const updateIndicator = () => {
            const activeElement = document.getElementById(`${activeLink}-link`);
            if (activeElement) {
                const rect = activeElement.getBoundingClientRect();
                const parent = activeElement.parentElement;
                if (parent) {
                    const parentRect = parent.getBoundingClientRect();
                    setIndicatorStyle({
                        left: rect.left - parentRect.left,
                        width: rect.width
                    });
                }
            }
        };

        const checkVisibleSection = () => {
            if (activeLink === "blog") return;

            const sections = ["home", "projects", "about", "contact"];
            let selected = "home";
            let minDistance = Infinity;

            sections.forEach(section => {
                const element = document.getElementById(section);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    const distance = Math.abs(rect.top);
                    if (distance < minDistance) {
                        minDistance = distance;
                        selected = section;
                    }
                }
            });

            if (selected !== activeLink) {
                setActiveLink(selected);
            }
        };

        // Update indicator position
        updateIndicator();

        // Set up observers
        const resizeObserver = new ResizeObserver(updateIndicator);
        resizeObserver.observe(document.body);

        // Throttled scroll handler
        let scrollTimeout: NodeJS.Timeout;
        const handleScroll = () => {
            if (scrollTimeout) clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(checkVisibleSection, 100);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            resizeObserver.disconnect();
            window.removeEventListener('scroll', handleScroll);
            if (scrollTimeout) clearTimeout(scrollTimeout);
        };
    }, [activeLink]);

    return (
        <div className="flex justify-center items-center fixed top-3 w-full z-50">
            <nav className="relative flex gap-1 p-0.5 border border-white/15 rounded-full bg-white/10 backdrop-blur">
                <div
                    className="absolute bg-white rounded-full transition-all duration-300 ease-in-out"
                    style={{
                        left: indicatorStyle.left,
                        width: indicatorStyle.width,
                        top: '2px',
                        bottom: '2px'
                    }}
                    aria-hidden="true"
                />
                <a
                    href="#home"
                    id="home-link"
                    className={`nav-item relative z-10 transition-colors duration-200 ${
                        activeLink === "home" 
                        ? "text-gray-900 hover:text-gray-600" 
                        : "text-white hover:text-blue-100"
                    }`}
                    onClick={(e) => handleNavClick(e, "home")}
                >Home</a>
                <a
                    href="#projects"
                    id="projects-link"
                    className={`nav-item relative z-10 transition-colors duration-200 ${
                        activeLink === "projects" 
                        ? "text-gray-900 hover:text-gray-600" 
                        : "text-white hover:text-blue-100"
                    }`}
                    onClick={(e) => handleNavClick(e, "projects")}
                >Projects</a>
                <a
                    href="#about"
                    id="about-link"
                    className={`nav-item relative z-10 transition-colors duration-200 ${
                        activeLink === "about" 
                        ? "text-gray-900 hover:text-gray-600" 
                        : "text-white hover:text-blue-100"
                    }`}
                    onClick={(e) => handleNavClick(e, "about")}
                >About</a>
                <a
                    href="#contact"
                    id="contact-link"
                    className={`nav-item relative z-10 transition-colors duration-200 ${
                        activeLink === "contact" 
                        ? "text-gray-900 hover:text-gray-600" 
                        : "text-white hover:text-blue-100"
                    }`}
                    onClick={(e) => handleNavClick(e, "contact")}
                >Contact</a>
                <a
                    href="#blog"
                    id="blog-link"
                    className={`nav-item relative z-10 transition-colors duration-200 ${
                        activeLink === "blog" 
                        ? "text-gray-900 hover:text-gray-600" 
                        : "text-white hover:text-blue-100"
                    }`}
                    onClick={(e) => handleNavClick(e, "blog")}
                >Blog</a>
            </nav>
        </div>
    );
};
