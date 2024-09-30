import React from "react";
import Link from "next/link";
import Image from "next/image";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-background text-text">
      <header className="bg-primary text-text p-4 flex items-center justify-between">
        <Image
          src="/favicon_io/android-chrome-512x512.png"
          alt="App Logo"
          width={50}
          height={50}
          className="inline-block mr-2"
        />

        <Link
          href="/login"
          className="bg-secondary hover:bg-opacity-80 text-white font-bold py-2 px-4 rounded"
        >
          Login
        </Link>
      </header>

      <main className="mx-auto px-4 sm:px-16 md:px-32">
        <section className="mb-8 text-center">
          <Image
            src={"/app_logo.png"}
            alt="App Logo"
            width={300}
            height={300}
            className="mx-auto"
          />

          <h2 className="text-3xl font-semibold mb-4">
            Welcome to DubStudio Pro
          </h2>
          <p className="text-lg mb-4">
            DubStudio Pro is your all-in-one solution for professional dubbing
            and voice-over production. Our web-based platform offers powerful
            tools to streamline your workflow and elevate your projects.
          </p>
        </section>

        <section className="mb-8">
          <h3 className="text-2xl font-semibold mb-4">Key Features</h3>
          <ul className="list-disc list-inside space-y-2">
            <li>Intuitive audio editing interface</li>
            <li>Multi-track recording and mixing</li>
            <li>Real-time collaboration tools</li>
            <li>Extensive sound effects library</li>
            <li>AI-powered voice enhancement</li>
          </ul>
        </section>
      </main>

      <footer className="bg-primary text-white p-4 mt-8">
        <p className="text-center">
          &copy; 2024 DubStudio Pro. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default HomePage;
