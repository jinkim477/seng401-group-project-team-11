import React from "react";

const Footer: React.FC = () => {
	return (
		<footer className="w-11/12">
			{/* copyright and property notice */}
			<div className="bg-dark text-white dark:bg-primary dark:text-dark text-center text-sm py-2 mt-4 rounded-3xl shadow-sm">
				<div className="px-2">
					<p>© {new Date().getFullYear()} SmartServe. All rights reserved.</p>
					Powered by Google Gemini This project was developed by the SmartServe
					team. The content, design, and functionality are the intellectual
					property of SmartServe and may not be reproduced without permission.
					Google Gemini provides AI-powered assistance for generating insights,
					enhancing functionality, and improving user experience.
				</div>
			</div>
		</footer>
	);
};

export default Footer;
