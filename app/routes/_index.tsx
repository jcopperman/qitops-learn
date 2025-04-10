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

        {/* How It Works Section */}
        <div className="mb-24">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">How QitOps Learn Works</h2>
          <div className="grid gap-8 md:grid-cols-3 text-center">
            <div>
              <div className="text-4xl mb-4">📚</div>
              <h3 className="text-lg font-semibold text-gray-800">Learn</h3>
              <p className="text-sm text-gray-600 mt-2">Follow structured lessons built around QA domains and career paths.</p>
            </div>
            <div>
              <div className="text-4xl mb-4">🧪</div>
              <h3 className="text-lg font-semibold text-gray-800">Practice</h3>
              <p className="text-sm text-gray-600 mt-2">Apply your skills in sandbox environments, projects, and mock systems.</p>
            </div>
            <div>
              <div className="text-4xl mb-4">🚀</div>
              <h3 className="text-lg font-semibold text-gray-800">Grow</h3>
              <p className="text-sm text-gray-600 mt-2">Earn recognition, build your portfolio, and prepare for real-world roles.</p>
            </div>
          </div>
        </div>

        {/* Disciplines Section */}
        <div className="mb-24">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">QA is Not One Path — It's a Universe</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              { slug: "manual-testing", title: "Manual Testing & Analysis", description: "Design test cases, perform exploratory testing, and ensure product quality with a critical eye." },
              { slug: "test-automation", title: "Test Automation Engineering", description: "Build scalable, maintainable test frameworks for web, API, and mobile platforms." },
              { slug: "performance-testing", title: "Performance & Load Testing", description: "Simulate traffic and optimize systems for resilience, speed, and uptime." },
              { slug: "qa-leadership", title: "QA Leadership & Strategy", description: "Define vision, mentor teams, and align QA goals to business outcomes." },
              { slug: "security-testing", title: "Security Testing", description: "Identify vulnerabilities, test data protections, and harden applications against attack." },
              { slug: "ai-augmented-qa", title: "AI-Augmented QA", description: "Use LLMs, machine learning, and predictive tools to transform how testing is done." }
            ].map((d, i) => (
              <Link key={i} to={`/disciplines/${d.slug}`} className="block">
                <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition hover:border-indigo-200 border border-transparent">
                  <h3 className="text-xl font-semibold text-indigo-700 mb-2">{d.title}</h3>
                  <p className="text-sm text-gray-600">{d.description}</p>
                </div>
              </Link>
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

        {/* Roadmap Preview */}
        <div className="mb-24 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Preview the Journey</h2>
          <p className="text-gray-600 max-w-xl mx-auto mb-8">
            Here's a glimpse at our structured roadmap. Start from fundamentals and advance through modern QA practices.
          </p>
          <div className="max-w-3xl mx-auto">
            <div className="relative">
              {/* Connecting line */}
              <div className="absolute top-1/2 left-0 right-0 h-1 bg-indigo-200 -translate-y-1/2 z-0"></div>

              {/* Steps */}
              <div className="relative z-10 flex justify-between">
                {[
                  { name: "QA Fundamentals", icon: "📚" },
                  { name: "Automation Basics", icon: "⚙️" },
                  { name: "Playwright + CI/CD", icon: "🔄" },
                  { name: "Advanced QA Practices", icon: "🚀" }
                ].map((step, index) => (
                  <div key={step.name} className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-indigo-100 border-4 border-white shadow-md flex items-center justify-center text-xl mb-2">
                      {step.icon}
                    </div>
                    <div className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap">
                      {step.name}
                    </div>
                    {index < 3 && (
                      <div className="absolute top-1/2 left-0 transform -translate-y-1/2 text-indigo-400 text-2xl"
                           style={{ left: `${(index + 1) * 33 - 16}%` }}>
                        →
                      </div>
                    )}
                  </div>
                ))}
              </div>
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
