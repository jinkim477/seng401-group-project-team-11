import React from "react";

const LogoHeader = () => {
	return (
		<header className="w-full flex items-center justify-center px-6 lg:px-16 py-2">
			<img
				src="/logo.png"
				alt="SmartServe Logo"
				className="w-20 h-20 absolute left-4"
			/>
			<div>
				<h1 className="text-3xl lg:text-4xl font-extrabold text-center">
					SmartServe
				</h1>
			</div>
		</header>
	);
};

export default LogoHeader;
