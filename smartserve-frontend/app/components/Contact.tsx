import React from "react";

const Contact = () => {
	return (
		<div className="w-full bg-dark dark:bg-primary text-primary dark:text-dark text-center text-sm py-4 mt-4 rounded-3xl">
			<h3 className="text-3xl font-semibold">Contact Us</h3>
			<hr className="border-1 border-primary dark:border-dark m-4 mx-auto w-11/12" />
			<p className="text-lg flex items-center justify-center">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					className="stroke-primary dark:stroke-dark mr-2"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
					<polyline points="22,6 12,13 2,6"></polyline>
				</svg>
				Email: smartserve401@gmail.com
			</p>
			<p className="text-lg flex items-center justify-center">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					className="stroke-primary dark:stroke-dark mr-2"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z"></path>
					<circle cx="12" cy="10" r="3"></circle>
				</svg>
				Location: 123 Nutrition St, Food City
			</p>
			<p className="text-lg flex items-center justify-center">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					className="stroke-primary dark:stroke-dark mr-2"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
				</svg>
				Phone: +1 (800) 123-4567
			</p>
		</div>
	);
};

export default Contact;
