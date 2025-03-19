import React from "react";

const AboutUs = () => {
	return (
		<div className="w-11/12 bg-dark dark:bg-primary text-primary dark:text-dark text-center text-sm py-4 mt-8 rounded-3xl shadow-sm">
			<h3 className="text-3xl font-semibold mt-2 mb-4">About SmartServe</h3>
			<hr className="border-1 border-primary dark:border-dark mb-4 mx-auto w-11/12" />

			<p className="px-4 text-lg mx-6">
				<span className="font-bold text-2xl">At SmartServe,</span> we believe
				that{" "}
				<span className="text-accent-green dark:text-green-700">
					healthy eating
				</span>{" "}
				should be{" "}
				<span className="font-semibold">
					accessible, personalized, and effortless
				</span>
				. Our{" "}
				<span className="text-accent-green dark:text-green-700">
					AI-driven platform
				</span>{" "}
				generates meal plans tailored to your unique dietary preferences,
				fitness goals, and nutritional needs.
				<br />
				<br />
				Whether you&apos;re aiming for{" "}
				<span className="font-semibold">weight management</span>,{" "}
				<span className="font-semibold">muscle gain</span>, or just a{" "}
				<span className="font-semibold">balanced lifestyle</span>, SmartServe
				helps you discover{" "}
				<span className="text-accent-green dark:text-green-700">delicious</span>{" "}
				and{" "}
				<span className="text-accent-green dark:text-green-700">
					nutritious meals
				</span>{" "}
				that fit your schedule and budget.
				<br />
				<br />
				With <span className="font-semibold">
					customizable meal plans
				</span>, <span className="font-semibold">ingredient tracking</span>, and
				<span className="font-semibold"> detailed nutritional insights</span>,
				we empower users to make informed food choices. No matter your
				lifestyle—
				<span className="text-accent-green dark:text-green-700">
					vegan
				</span>,{" "}
				<span className="text-accent-green dark:text-green-700">keto</span>,{" "}
				<span className="text-accent-green dark:text-green-700">
					intermittent fasting
				</span>
				, or{" "}
				<span className="text-accent-green dark:text-green-700">
					gluten-free
				</span>
				—SmartServe has you covered.
				<br />
				<br />
				Join us in revolutionizing meal planning with AI and take the guesswork
				out of healthy eating!{" "}
				<span role="img" aria-label="meal">
					🍽️
				</span>
				<span role="img" aria-label="sparkles">
					✨
				</span>
			</p>
		</div>
	);
};

export default AboutUs;
