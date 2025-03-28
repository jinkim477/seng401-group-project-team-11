import React from "react";

const teamMembers = [
  {
    name: "Jin Kim",
    role: "Project Lead, Full-Stack Dev",
    description: "Leads the team and develops full-stack features.",
    linkedIn: "https://www.linkedin.com/in/kimjinhyeok/",
    github:"https://github.com/jinkim477",
    image: "/jin_profile.jpeg",
  },
  {
    name: "Xavier Lachance",
    role: "Full-Stack Dev",
    description: "Builds and maintains both frontend and backend systems.",
    linkedIn: "https://www.linkedin.com/in/xavier-lachance-369360336/",
    github:"https://github.com/xavierlachance",
    image: "/xavier_profile.jpeg",
  },
  {
    name: "Aidan Huang",
    role: "Testing Lead, Full-Stack Dev",
    description: "Ensures quality through rigorous testing and development.",
    linkedIn: "https://www.linkedin.com/in/aidan-h-b282992a5/",
    github:"https://github.com/aidankid1",
    image: "/aidan_profile.jpeg",
  },
  {
    name: "Sebastian Nieto",
    role: "Requirements Analyst, Test Developer",
    description: "Analyzes requirements and develops test cases.",
    linkedIn: "https://www.linkedin.com/in/sebastian-nieto-tech/",
    github:"https://github.com/sebastian-nieto",
    image: "/seb_profile.jpeg",
  },
  {
    name: "Joshua Geng",
    role: "Documentation",
    description: "Creates and maintains project documentation.",
    linkedIn: "https://www.linkedin.com/in/joshuageng/",
    github:"https://github.com/gengjosh",
    image: "/josh_profile.jpg",
  },
  {
    name: "Chloe Choi",
    role: "Documentation",
    description: "Supports the team with detailed documentation.",
    linkedIn: "https://www.linkedin.com/in/chloebchoi/",
    github:"https://github.com/chloebchoi",
    image: "/chloe_profile.jpg",
  },
];

const MeetTheTeam = () => {
  return (
    <div className="w-11/12 bg-primary text-dark dark:bg-dark dark:text-primary pt-10 pb-6">
      <div className="bg-dark text-primary dark:bg-primary dark:text-dark p-8 rounded-3xl shadow-lg">
        <h2 className="text-4xl font-bold text-center mb-6">Meet the Team</h2>
        <hr className="border-1 border-primary dark:border-dark mb-8 mx-auto w-11/12" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="flex flex-col items-center bg-primary text-dark dark:bg-dark dark:text-primary p-6 rounded-2xl shadow-md hover:scale-110 transition"
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-32 h-32 rounded-full shadow-lg border-2 border-accent-gray dark:border-accent-beige object-cover mb-4 hover:scale-110 transition"
              />
              <h3 className="text-xl font-semibold">{member.name}</h3>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{member.role}</p>
              <p className="text-center mt-2">{member.description}</p>
              <a
                href={member.linkedIn}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-accent-gray dark:text-accent-beige hover:underline hover:text-dark hover:dark:text-primary hover:scale-110 transition mt-4"
              >
                <img
                  src="/linkedin.png" // Replace with the actual path to the LinkedIn icon
                  alt="LinkedIn"
                  className="w-5 h-5 mr-2"
                />
                LinkedIn
              </a>
              <a
                href={member.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-accent-gray dark:text-accent-beige hover:underline hover:text-dark hover:dark:text-primary hover:scale-110 transition mt-4"
              >
                <img
                  src="/github.png" // Replace with the actual path to the LinkedIn icon
                  alt="GitHub"
                  className="w-5 h-5 mr-2"
                />
                GitHub
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MeetTheTeam;