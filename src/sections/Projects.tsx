import doeCodeLandingPage from "@/assets/images/doecode-landing-page.png";
import valenceLandingPage from "@/assets/images/valence-landing-page.png";
import katkamLandingPage from "@/assets/images/katkam-landing-page.png";
import kanbanProject from "@/assets/images/Kanban.png";
import Image from "next/image";
import CheckCircleIcon from "@/assets/icons/check-circle.svg";
import ArrowUpRightIcon from "@/assets/icons/arrow-up-right.svg";
import {SectionHeader} from "@/components/SectionHeader";
import {Card} from "@/components/Card";

const portfolioProjects = [
    {
        company: "Chase Curtis",
        year: "2024",
        title: "Kanban Task Manager",
        results: [
            {title: "Organizes tasks into customizable columns"},
            {title: "Intuitive drag-and-drop functionality"},
            {title: "Clean and minimal design"},
        ],
        link: "https://github.com/chasecurtis1991/todo-kanban",
        image: kanbanProject,
        buttonText: "View Project"
    },
    {
        company: "KatKam",
        year: "2022",
        title: "KatKam Landing Page",
        results: [
            {title: "Created Shopify e-commerce store"},
            {title: "Improved merchandise sales by 80%"},
            {title: "Increased social media traffic by 15%"},
        ],
        link: "https://github.com/chasecurtis1991/KatKam-Shopify",
        image: katkamLandingPage,
        buttonText: "View Project"
    },
    {
        company: "DOE Code",
        year: "2019",
        title: "DOE Code Search Page",
        results: [
            {title: "Enhanced user experience by 30%"},
            {title: "Improved site speed by 20%"},
            {title: "Increased mobile traffic by 35%"},
        ],
        link: "https://www.osti.gov/doecode",
        image: doeCodeLandingPage,
        buttonText: "Visit Live Site"
    },
    {
        company: "Valence",
        year: "2018",
        title: "Valence Landing Page",
        results: [
            {title: "Boosted sales by 20%"},
            {title: "Expanded customer reach by 35%"},
            {title: "Increased brand awareness by 15%"},
        ],
        link: "https://github.com/chasecurtis1991/valence",
        image: valenceLandingPage,
        buttonText: "View Project"
    },
];

export const ProjectsSection = () => {
    return (
        <section id={"projects"} className={"pb-16 lg:py-24"}>
            <div className={"container"}>
                <SectionHeader title={"Featured Projects"} eyebrow={"Real-world Results"}
                               description={"See how I transformed concepts into engaging digital experiences."}/>
                <div className={"flex flex-col mt-10 md:mt-20 gap-20"}>
                    {portfolioProjects.map((project, projectIndex) => (
                        <Card key={project.title}
                             className={"px-8 pt-8 pb-0 md:pt-12 md:px-10 lg:pt-16 lg:px-20 sticky"} style={{
                                 top: `calc(64px + ${projectIndex * 40}px)`,
                        }}>
                            <div className={"lg:grid lg:grid-cols-2 lg:gap-16"}>
                                <div className={"lg:pb-16"}>
                                    <div
                                        className={"bg-gradient-to-r from-emerald-300 to-sky-400 inline-flex gap-2 font-bold uppercase tracking-widest text-sm text-transparent bg-clip-text"}>
                                        <span>{project.company}</span>
                                        <span>&bull;</span>
                                        <span>{project.year}</span>
                                    </div>
                                    <h3 className={"font-serif text-2xl mt-2 md:mt-5 md:text-4xl"}>{project.title}</h3>
                                    <hr className={"border-t-2 border-white/5 mt-4 md:mt-5"}/>
                                    <ul className={"flex flex-col gap-4 mt-4 md:mt-5"}>
                                        {project.results.map((result) => (
                                            <li key={result.title}
                                                className={"flex gap-2 text-sm md:text-base text-white/50"}>
                                                <CheckCircleIcon className={"size-5 md:size-6"}/>
                                                <span>{result.title}</span>
                                            </li>
                                        ))}
                                    </ul>
                                    <a href={project.link} target={"_blank"}>
                                        <button
                                            className={"bg-white text-gray-950 h-12 w-full md:w-auto px-6 rounded-xl font-semibold inline-flex items-center justify-center gap-2 mt-8 hover:scale-110 transition duration-300"}>
                                            <span>{project.buttonText}</span>
                                            <ArrowUpRightIcon className={"size-4"}/>
                                        </button>
                                    </a>
                                </div>
                                <div className={"relative"}>
                                    <Image src={project.image} alt={project.title}
                                           className={"mt-8 -mb-4 md:-mb-0 lg:mt-0 lg:absolute lg:h-full lg:w-auto lg:max-w-none"}/>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
};
