import React from "react";

export default function Certifications() {
	return (
		<>
			<section className="mx-auto border-t-2 py-16 bg-gray-200" id="certifications">
				<div className="container flex flex-wrap mx-auto">
					<div className="flex-row w-full">
						<h1 className="text-black mb-14">Certifications & Training</h1>
					</div>
					<div className="grid w-full md:grid-cols-3">
						<div className="w-full">
							<h2 className="text-black text-4xl underline">LinkedIn</h2>
							<ul className="text-black m-5">
								<li className="border border-gray-400 rounded-lg p-4 mb-4">React Hooks</li>
								<li className="border border-gray-400 rounded-lg p-4 mb-4">React.js: Building an Interface</li>
								<li className="border border-gray-400 rounded-lg p-4 mb-4">React: Creating and Hosting a Full-Stack Site</li>
								<li className="border border-gray-400 rounded-lg p-4 mb-4">React.js Essential Training</li>
								<li className="border border-gray-400 rounded-lg p-4 mb-4">Advanced Java Programming</li>
								<li className="border border-gray-400 rounded-lg p-4 mb-4">Learning TypeScript</li>
								<li className="border border-gray-400 rounded-lg p-4 mb-4">Node.js: Security</li>
								<li className="border border-gray-400 rounded-lg p-4 mb-4">Learning Regular Expressions</li>
								<li className="border border-gray-400 rounded-lg p-4 mb-4">Java: Testing With JUnit</li>
								<li className="border border-gray-400 rounded-lg p-4 mb-4">Docker for Developers</li>
								<li className="border border-gray-400 rounded-lg p-4 mb-4">GitHub Essential Training</li>
								<li className="border border-gray-400 rounded-lg p-4 mb-4">Python Essential Training</li>
								<li className="border border-gray-400 rounded-lg p-4 mb-4">Source Code Control in .NET with Git Using SourceTree</li>
								<li className="border border-gray-400 rounded-lg p-4 mb-4">Succeeding in Web Development: Full Stack and Front End</li>
								<li className="border border-gray-400 rounded-lg p-4 mb-4">JavaScript and AJAX: Integration Techniques</li>
								<li className="border border-gray-400 rounded-lg p-4 mb-4">Ethical Hacking: Introduction to Ethical Hacking</li>
								<li className="border border-gray-400 rounded-lg p-4 mb-4">Java EE: Servlets and JavaServer Pages (JSP)</li>
								<li className="border border-gray-400 rounded-lg p-4 mb-4">Visual Studio Code Productivity Tips</li>
								<li className="border border-gray-400 rounded-lg p-4 mb-4">Visual Studio Code for Web Developers</li>
							</ul>
						</div>
						<div className="w-full">
							<h2 className="text-black text-4xl underline mb-5">Udemy</h2>
							<ul className="text-black m-5">
								<li className="border border-gray-400 rounded-lg p-4 mb-4">Practical PHP: Master the Basics and Code Dynamic Websites</li>
								<li className="border border-gray-400 rounded-lg p-4 mb-4">Web Hosting 101: Get Your Website Live on the Web in No Time</li>
								<li className="border border-gray-400 rounded-lg p-4 mb-4">WordPress Development with Bootstrap: The Complete Course</li>
								<li className="border border-gray-400 rounded-lg p-4 mb-4">Ultimate Web Designer & Web Developer Course</li>
							</ul>
						</div>
						<div className="w-full">
							<h2 className="text-black text-4xl underline mb-5">Codecademy</h2>
							<ul className="text-black m-5">
								<li className="border border-gray-400 rounded-lg p-4 mb-4">Full-Stack Engineer Career Path</li>
							</ul>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}