import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import MainLayout from "~/components/Layout/MainLayout";

interface DisciplineData {
  slug: string;
  title: string;
  description: string;
  roadmap: {
    title: string;
    description: string;
    steps: {
      name: string;
      description: string;
    }[];
  };
  tools: string[];
  roles: string[];
}

interface LoaderData {
  discipline: DisciplineData;
}

// This is a mock database of disciplines
const disciplines: Record<string, DisciplineData> = {
  "manual-testing": {
    slug: "manual-testing",
    title: "Manual Testing & Analysis",
    description: "Design test cases, perform exploratory testing, and ensure product quality with a critical eye.",
    roadmap: {
      title: "Manual Testing Roadmap",
      description: "Follow this path to master manual testing techniques and methodologies.",
      steps: [
        { name: "Testing Fundamentals", description: "Learn the basics of software testing, including test case design and bug reporting." },
        { name: "Exploratory Testing", description: "Master the art of unscripted testing to find critical issues." },
        { name: "Test Management", description: "Organize and track test cases, test plans, and test execution." },
        { name: "Advanced Analysis", description: "Develop skills in root cause analysis and quality metrics." }
      ]
    },
    tools: ["TestRail", "Jira", "Zephyr", "Confluence"],
    roles: ["Test Analyst", "QA Engineer", "Test Lead"]
  },
  "test-automation": {
    slug: "test-automation",
    title: "Test Automation Engineering",
    description: "Build scalable, maintainable test frameworks for web, API, and mobile platforms.",
    roadmap: {
      title: "Test Automation Roadmap",
      description: "Follow this path to become a skilled automation engineer.",
      steps: [
        { name: "Programming Basics", description: "Learn a programming language like JavaScript, Python, or Java." },
        { name: "Web Automation", description: "Master tools like Playwright, Cypress, or Selenium." },
        { name: "API Testing", description: "Learn to automate API tests with tools like Postman, RestAssured, or Supertest." },
        { name: "Framework Design", description: "Build maintainable, scalable test frameworks with patterns like Page Object Model." }
      ]
    },
    tools: ["Playwright", "Cypress", "Selenium", "Postman", "Jest", "GitHub Actions"],
    roles: ["SDET", "Automation Engineer", "QA Developer"]
  },
  "performance-testing": {
    slug: "performance-testing",
    title: "Performance & Load Testing",
    description: "Simulate traffic and optimize systems for resilience, speed, and uptime.",
    roadmap: {
      title: "Performance Testing Roadmap",
      description: "Follow this path to become a performance testing specialist.",
      steps: [
        { name: "Performance Concepts", description: "Understand key metrics like response time, throughput, and resource utilization." },
        { name: "Load Testing Tools", description: "Learn tools like JMeter, k6, or Gatling." },
        { name: "Test Planning", description: "Design effective performance test scenarios and load models." },
        { name: "Analysis & Optimization", description: "Interpret results and recommend performance improvements." }
      ]
    },
    tools: ["JMeter", "k6", "Gatling", "New Relic", "Grafana"],
    roles: ["Performance Engineer", "Load Test Specialist", "Site Reliability Engineer"]
  },
  "qa-leadership": {
    slug: "qa-leadership",
    title: "QA Leadership & Strategy",
    description: "Define vision, mentor teams, and align QA goals to business outcomes.",
    roadmap: {
      title: "QA Leadership Roadmap",
      description: "Follow this path to become an effective QA leader.",
      steps: [
        { name: "Team Management", description: "Learn to lead and mentor QA teams effectively." },
        { name: "QA Strategy", description: "Develop and implement quality strategies aligned with business goals." },
        { name: "Process Improvement", description: "Optimize testing processes and methodologies." },
        { name: "Stakeholder Management", description: "Communicate effectively with executives, developers, and customers." }
      ]
    },
    tools: ["Jira", "Confluence", "Azure DevOps", "Power BI"],
    roles: ["QA Manager", "QA Director", "VP of Quality"]
  },
  "security-testing": {
    slug: "security-testing",
    title: "Security Testing",
    description: "Identify vulnerabilities, test data protections, and harden applications against attack.",
    roadmap: {
      title: "Security Testing Roadmap",
      description: "Follow this path to become a security testing specialist.",
      steps: [
        { name: "Security Fundamentals", description: "Understand common vulnerabilities and security principles." },
        { name: "Penetration Testing", description: "Learn techniques for identifying security weaknesses." },
        { name: "Security Tools", description: "Master tools like OWASP ZAP, Burp Suite, and static analysis tools." },
        { name: "Compliance Testing", description: "Test against security standards like OWASP Top 10, GDPR, and PCI DSS." }
      ]
    },
    tools: ["OWASP ZAP", "Burp Suite", "Nmap", "Metasploit"],
    roles: ["Security Tester", "Penetration Tester", "Security Analyst"]
  },
  "ai-augmented-qa": {
    slug: "ai-augmented-qa",
    title: "AI-Augmented QA",
    description: "Use LLMs, machine learning, and predictive tools to transform how testing is done.",
    roadmap: {
      title: "AI-Augmented QA Roadmap",
      description: "Follow this path to leverage AI in your testing practice.",
      steps: [
        { name: "AI Fundamentals", description: "Understand machine learning concepts relevant to testing." },
        { name: "Test Generation", description: "Use AI to generate test cases and test data." },
        { name: "Visual Testing", description: "Implement AI-powered visual testing solutions." },
        { name: "Predictive Analysis", description: "Apply AI to predict defect-prone areas and optimize test coverage." }
      ]
    },
    tools: ["Applitools", "Mabl", "Testim", "GPT-4", "TensorFlow"],
    roles: ["AI QA Specialist", "ML Test Engineer", "QA Automation Architect"]
  }
};

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  const { discipline } = data as LoaderData;
  return [
    { title: `${discipline.title} - QitOps Learn` },
    { name: "description", content: discipline.description }
  ];
};

export const loader: LoaderFunction = async ({ params }) => {
  const { slug } = params;

  // Get the discipline data from our mock database
  const discipline = disciplines[slug as string];

  if (!discipline) {
    throw new Response("Discipline not found", { status: 404 });
  }

  return json<LoaderData>({ discipline });
};

export default function DisciplinePage() {
  const { discipline } = useLoaderData<LoaderData>();

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Discipline Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {discipline.title}
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              {discipline.description}
            </p>
          </div>

          {/* Roadmap Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">{discipline.roadmap.title}</h2>
            <p className="text-gray-600 mb-8">{discipline.roadmap.description}</p>

            <div className="space-y-6">
              {discipline.roadmap.steps.map((step, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                  <div className="flex items-center mb-2">
                    <div className="bg-indigo-100 text-indigo-700 rounded-full w-8 h-8 flex items-center justify-center mr-3">
                      {index + 1}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800">{step.name}</h3>
                  </div>
                  <p className="text-gray-600 ml-11">{step.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Tools Section */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Recommended Tools</h2>
            <div className="flex flex-wrap gap-3">
              {discipline.tools.map((tool) => (
                <span key={tool} className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
                  {tool}
                </span>
              ))}
            </div>
          </div>

          {/* Roles Section */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Career Outcomes</h2>
            <div className="flex flex-wrap gap-3">
              {discipline.roles.map((role) => (
                <span key={role} className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-medium">
                  {role}
                </span>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center bg-gray-50 p-8 rounded-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to start your journey?</h2>
            <p className="text-gray-600 mb-6">
              Explore our courses and start building your skills in {discipline.title.toLowerCase()}.
            </p>
            <div className="flex justify-center gap-4">
              <a
                href="/courses"
                className="inline-block rounded-md bg-indigo-600 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-indigo-500"
              >
                Browse Courses
              </a>
              <a
                href="/auth/sign-up"
                className="inline-block rounded-md bg-white px-6 py-3 text-base font-semibold text-indigo-600 shadow-sm border border-indigo-200 hover:bg-indigo-50"
              >
                Sign Up
              </a>
            </div>
          </div>
        </div>
      </MainLayout>
  );
}
