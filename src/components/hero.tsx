import React from "react";

export const Hero = () => {
  return (
    <>
    <hr />
    <div className="hero min-h-screen ">
      <div className="hero-content text-start flex-row justify-between gap-96">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold uppercase w-80 whitespace-nowrap">Hi,I'm Zaid Radaideh</h1>
          <p className="py-6">
            I am a passionate developer with a love for creating beautiful and
            functional web applications.
          </p>
          <div className="btn">Cuntact me</div>
        </div>
        <div>
            <img className="border-4 border-spacing-64 border-gray-400 w-96 h-96 rounded" src="me.jpg" alt="me" />
        </div>
      </div>
    </div>
    </>
  );
};