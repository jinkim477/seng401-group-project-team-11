import React from 'react';

const LogoHeader = () => {
  return (
    <>
      <img
        src="/logo.png"
        alt="SmartServe Logo"
        className="w-16 h-16 absolute top-4 left-4"
      />
      <header className="w-full flex items-center justify-center px-6 lg:px-16 py-4">
        <h1 className="text-3xl lg:text-4xl font-extrabold text-center">
          SmartServe
        </h1>
      </header>
    </>
  );
};

export default LogoHeader;