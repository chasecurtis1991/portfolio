import React, {useState} from "react";

export default function Contact() {
	const [name, setName] = useState("");
  	const [email, setEmail] = useState("");
  	const [message, setMessage] = useState("");

	const handleSubmit = (e) => {
        e.preventDefault();
        console.log(name, email, message);
    };
	
	return (
		<>
			<section className="mx-auto border-t-2 bg-white">
				<div className="container flex flex-wrap mx-auto">
					<div className="flex-row w-full">
						<h1 className="text-black mb-8">Contact Me</h1>
					</div>
					<div className="w-full">
					<form onSubmit={handleSubmit}>
						<div>
							<label htmlFor="name" className="text-black">Name:</label>
							<input
							type="text"
							id="name"
							value={name}
							onChange={(e) => setName(e.target.value)}
							className="w-100 rounded-sm mx-2 my-1"
							/>
						</div>
						<div>
							<label htmlFor="email" className="text-black">Email:</label>
							<input
							type="email"
							id="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							className="w-100 rounded-sm mx-2 my-1"
							/>
						</div>
						<div>
							<label htmlFor="message" className="text-black align-top">Message:</label>
							<textarea
							id="message"
							value={message}
							onChange={(e) => setMessage(e.target.value)}
							className="w-100 rounded-sm mx-2 my-1"
							></textarea>
						</div>
						<button type="submit" className="px-3 py-1 m-1 font-bold text-white bg-cyan-600 rounded-full">Submit</button>
						</form>
					</div>
				</div>
			</section>
		</>
	);
}