import type { MetaFunction } from "@remix-run/cloudflare";
import { Link } from "@remix-run/react";
import MainLayout from "~/components/Layout/MainLayout";

export const meta: MetaFunction = () => {
  return [
    { title: "QitOps Learn - QA Career Learning Platform" },
    { name: "description", content: "Explore the modern, multidisciplined learning platform for software testers and quality engineers" },
  ];
};

export default function Index() {
  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <h1 className="text-5xl font-bold text-gray-900">
            Master the Modern QA Career
          </h1>
          <p className="mt-6 text-lg text-gray-600 max-w-3xl mx-auto">
            QitOps Learn is a structured, multidisciplined learning platform for software testers and quality engineers. Whether you're starting out or aiming for a senior leadership role, we help you grow with confidence.
          </p>
          <div className="mt-10">
            <Link
              to="/auth/sign-up"
              className="inline-block rounded-md bg-indigo-600 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-indigo-500"
            >
              Join the Platform
            </Link>
          </div>
        </div>

        {/* Disciplines Section */}
        <div className="mb-24">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">QA is Not One Path — It's a Universe</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              { title: "Manual Testing & Analysis", description: "Design test cases, perform exploratory testing, and ensure product quality with a critical eye." },
              { title: "Test Automation Engineering", description: "Build scalable, maintainable test frameworks for web, API, and mobile platforms." },
              { title: "Performance & Load Testing", description: "Simulate traffic and optimize systems for resilience, speed, and uptime." },
              { title: "QA Leadership & Strategy", description: "Define vision, mentor teams, and align QA goals to business outcomes." },
              { title: "Security Testing", description: "Identify vulnerabilities, test data protections, and harden applications against attack." },
              { title: "AI-Augmented QA", description: "Use LLMs, machine learning, and predictive tools to transform how testing is done." }
            ].map((d, i) => (
              <div key={i} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
                <h3 className="text-xl font-semibold text-indigo-700 mb-2">{d.title}</h3>
                <p className="text-sm text-gray-600">{d.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Career Tracks */}
        <div className="mb-24 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Career Tracks We Support</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-12">
            Follow structured learning paths tailored for modern QA roles:
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            {["Test Analyst", "SDET / Automation Engineer", "QA Architect", "QA Manager", "DevOps QA", "Compliance & Risk QA"].map(role => (
              <span key={role} className="bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full text-sm font-medium">
                {role}
              </span>
            ))}
          </div>
        </div>

        {/* QitOps Approach */}
        <div className="mb-24">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-6">Why QitOps?</h2>
          <p className="text-gray-600 max-w-3xl mx-auto text-center mb-12">
            The QA field is fragmented. QitOps brings order by aligning education to real-world skills, modern tooling, and industry expectations — including ISTQB concepts, CI/CD best practices, and AI integration.
          </p>
          <div className="grid gap-8 md:grid-cols-3">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Multidisciplinary Learning</h3>
              <p className="text-sm text-gray-600">Learn across domains to stay flexible in a fast-evolving industry.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Role-Focused Roadmaps</h3>
              <p className="text-sm text-gray-600">Explore curated content tailored to career progression — from junior to architect.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Modern Practices</h3>
              <p className="text-sm text-gray-600">CI/CD, cloud-native testing, AI-in-QA — we teach what teams use today and tomorrow.</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Let’s build your QA future</h2>
          <p className="mt-2 text-gray-600">Start learning, level up, and join a new generation of quality engineers.</p>
          <Link
            to="/auth/sign-up"
            className="mt-6 inline-block rounded-md bg-indigo-600 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-indigo-500"
          >
            Join QitOps Learn
          </Link>
        </div>
      </div>
    </MainLayout>
  );
}
