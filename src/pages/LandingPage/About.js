import React from "react";
import LandNavbar from "./LandNavbar";

const About = () => {
  return (
    
    <div
      className="min-h-screen text-gray-100 px-5 py-10"
      style={{ backgroundColor: "#4a5546" }}
    >
    < LandNavbar />
      <div
        className="max-w-5xl mx-auto rounded-2xl p-8"
        style={{ backgroundColor: "#4a5546" }}
      >
        <h1 className="text-4xl font-bold mb-6 text-white-800 text-center">
          About Us – Green Doors
        </h1>
        <p className="mb-6 text-gray-700 text-lg">
          Welcome to <strong>GreenDoors</strong>, where comfort
          meets class. Our mission is to provide guests with a seamless,
          luxurious, and memorable stay—supported by modern technology and
          exceptional hospitality.
        </p>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-3 text-gray-800">
          Who We Are
          </h2>
          <p className="text-gray-700">
            Harmony Hotel & Suites is a premium hospitality brand designed to
            redefine the guest experience. From elegant rooms to fine dining and
            modern amenities, we offer everything a traveler needs for
            relaxation, productivity, and convenience.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-3 text-gray-800">
          Our Mission
          </h2>
          <p className="text-gray-700">
            To deliver <strong>comfort, reliability, and excellence</strong> in
            every aspect of a guest's stay. We aim to make hospitality smoother
            and smarter through a well-structured hotel management system.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-3 text-gray-800">
          Our Vision
          </h2>
          <ul className="list-disc list-inside text-gray-700">
            <li>Outstanding guest experience</li>
            <li>Exceptional service quality</li>
            <li>Clean and modern accommodation</li>
            <li>Technology-driven hotel operations</li>
            <li>Safe and peaceful environment</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-3 text-gray-800">
          What We Offer
          </h2>
          <ul className="list-disc list-inside text-gray-700">
            <li>Comfortable & stylish rooms</li>
            <li>Fast & easy booking</li>
            <li>24/7 customer support</li>
            <li>
              Modern facilities (Wi-Fi, dining, conference halls, lounges)
            </li>
            <li>Clean & hygienic environment</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-3 text-gray-800">
          Why Choose Us?
          </h2>
          <ul className="list-disc list-inside text-gray-700">
            <li>Professional and friendly staff</li>
            <li>Advanced hotel management system</li>
            <li>Quick check-in and check-out</li>
            <li>Transparent pricing</li>
            <li>Personalized guest service</li>
            <li>Peaceful and well-maintained property</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-3 text-gray-800">
            🤝 Our Commitment
          </h2>
          <p className="text-gray-700">
            At Harmony Hotel & Suites, we aren’t just offering a room…{" "}
            <strong>we’re offering an experience.</strong>A place where guests
            feel valued, cared for, and truly at home.
          </p>
        </section>
      </div>
    </div>
  );
};

export default About;
