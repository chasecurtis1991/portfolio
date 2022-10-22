import React from "react";

export default function Certifications() {
	return (
		<>
			<section className="mx-auto border-t-2 py-16 my-12 bg-gray-200">
				<div className="container flex flex-wrap mx-auto">
					<div className="flex-row w-full">
						<h1 className="text-black mb-8">Certifications & Training</h1>
					</div>
					<div className="grid w-full md:grid-cols-3">
						<div className="w-full">
							<h2 className="text-black text-4xl underline">LinkedIn</h2>
							<ul className="text-black m-5">
								<li>React Hooks</li>
								<li>React.js: Building an Interface</li>
								<li>React: Creating and Hosting a Full-Stack Site</li>
								<li>React.js Essential Training</li>
								<li>Advanced Java Programming</li>
								<li>Learning TypeScript</li>
								<li>Node.js: Security</li>
								<li>Learning Regular Expressions</li>
								<li>Java: Testing With JUnit</li>
								<li>Docker for Developers</li>
								<li>GitHub Essential Training</li>
								<li>Python Essential Training</li>
								<li>Source Code Control in .NET with Git Using SourceTree</li>
								<li>Succeeding in Web Development: Full Stack and Front End</li>
								<li>JavaScript and AJAX: Integration Techniques</li>
								<li>Ethical Hacking: Introduction to Ethical Hacking</li>
								<li>Java EE: Servlets and JavaServer Pages (JSP)</li>
								<li>Visual Studio Code Productivity Tips</li>
								<li>Visual Studio Code for Web Developers</li>
							</ul>
						</div>
						<div className="w-full">
							<h2 className="text-black text-4xl underline mb-5">Udemy</h2>
							<ul className="text-black m-5">
								<li>Practical PHP: Master the Basics and Code Dynamic Websites</li>
								<li>Web Hosting 101: Get Your Website Live on the Web in No Time</li>
								<li>WordPress Development with Bootstrap: The Complete Course</li>
								<li>Ultimate Web Designer & Web Developer Course</li>
							</ul>
						</div>
						<div className="w-full">
							<h2 className="text-black text-4xl underline mb-5">Codecademy</h2>
							<ul className="text-black m-5">
								<li>Full-Stack Engineer Career Path</li>
							</ul>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}