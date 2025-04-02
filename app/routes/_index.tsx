import type { MetaFunction } from "@remix-run/cloudflare";
import { Link } from "@remix-run/react";
import { motion } from "framer-motion";
import MainLayout from "~/components/Layout/MainLayout";

interface RoadmapStep {
  id: string;
  title: string;
  description: string;
  courses: Array<{
    id: string;
    title: string;
    duration: string;
  }>;
  skills: string[];
  level: 'Beginner' | 'Intermediate' | 'Advanced';
}

export const meta: MetaFunction = () => {
  return [
    { title: "QitOps Learn - Master Quality Software Engineering" },
    { name: "description", content: "Follow our structured learning path to become a professional QA Engineer" },
  ];
};

const qaRoadmap: RoadmapStep[] = [
  {
    id: 'fundamentals',
    title: 'QA Fundamentals',
    description: 'Master the core concepts of software testing',
    courses: [
      { id: 'qa-fundamentals', title: 'Introduction to Software Testing', duration: '4h 30m' },
      { id: 'sdlc-basics', title: 'SDLC and Testing Methods', duration: '5h 15m' }
    ],
    skills: ['Test Planning', 'Test Cases', 'Bug Reporting', 'Test Documentation'],
    level: 'Beginner'
  },
  {
    id: 'automation-basics',
    title: 'Test Automation Foundations',
    description: 'Learn the basics of test automation and scripting',
    courses: [
      { id: 'automation-intro', title: 'Automation Testing Basics', duration: '6h 45m' },
      { id: 'selenium-basics', title: 'Getting Started with Selenium', duration: '8h 20m' }
    ],
    skills: ['JavaScript', 'Selenium WebDriver', 'Test Frameworks', 'Version Control'],
    level: 'Intermediate'
  },
  {
    id: 'api-testing',
    title: 'API Testing',
    description: 'Master API testing and automation',
    courses: [
      { id: 'api-fundamentals', title: 'API Testing Fundamentals', duration: '5h 30m' },
      { id: 'postman-testing', title: 'Postman for API Testing', duration: '4h 45m' }
    ],
    skills: ['REST APIs', 'Postman', 'API Automation', 'JSON/XML'],
    level: 'Intermediate'
  },
  {
    id: 'advanced-automation',
    title: 'Advanced Test Automation',
    description: 'Advanced automation techniques and frameworks',
    courses: [
      { id: 'advanced-frameworks', title: 'Building Test Frameworks', duration: '10h 15m' },
      { id: 'ci-cd-testing', title: 'CI/CD Integration', duration: '6h 30m' }
    ],
    skills: ['Test Architecture', 'CI/CD', 'Docker', 'Cloud Testing'],
    level: 'Advanced'
  }
];

const QuestMarker = ({ active, completed }: { active: boolean; completed: boolean }) => (
  <motion.div
    className={`w-12 h-12 rounded-full flex items-center justify-center relative
      ${completed ? 'bg-green-500' : active ? 'bg-indigo-500' : 'bg-gray-300'}`}
    initial={{ scale: 0 }}
    animate={{ scale: 1 }}
    transition={{ type: "spring", stiffness: 260, damping: 20 }}
  >
    <motion.div
      className="absolute w-16 h-16 rounded-full border-2 border-indigo-300"
      initial={{ scale: 0.8, opacity: 0.5 }}
      animate={{ scale: 1.2, opacity: 0 }}
      transition={{ duration: 1.5, repeat: Infinity }}
    />
    {completed ? (
      <svg className="w-6 h-6 text-gray" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
    ) : (
      <span className="text-gray font-bold">!</span>
    )}
  </motion.div>
);

export default function Index() {
  console.log('Rendering Index page, qaRoadmap:', qaRoadmap);
  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Master Software Quality Engineering
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Follow our structured learning path to become a professional QA Engineer.
            Get certified, build your portfolio, and advance your career.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              to="/courses"
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Start Learning
            </Link>
            <Link
              to="/auth/sign-up"
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Create Account <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>

        {/* Quest-style Career Roadmap */}
        <div className="mt-20 relative py-20 overflow-hidden">
          
          {/* Background decoration */}
          <div className="absolute inset-0 bg-gradient-to-b from-blue-50 to-indigo-50 opacity-50" />
          
          <div className="max-w-7xl mx-auto px-4">
            <div className="relative">
              {/* Connecting Line */}
              <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-indigo-200 transform -translate-x-1/2" />
              
              {qaRoadmap.map((step, index) => (
                <div
                  key={step.id}
                  className="relative mb-32 last:mb-0"
                >
                  <div className={`flex ${index % 2 === 0 ? 'justify-start' : 'justify-end'} items-center`}>
                    {/* Quest marker */}
                    <div className="absolute left-1/2 transform -translate-x-1/2">
                      <QuestMarker active={index === 0} completed={false} />
                    </div>
                    
                    {/* Content card */}
                    <div
                      className={`w-5/12 bg-white rounded-lg shadow-xl p-6 relative ${
                        index % 2 === 0 ? 'mr-auto' : 'ml-auto'
                      }`}
                    >
                      {/* Level badge */}
                      <div className="absolute top-4 right-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          step.level === 'Beginner' ? 'bg-green-100 text-green-800' :
                          step.level === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {step.level}
                        </span>
                      </div>

                      <h3 className="text-xl font-bold mb-2 text-gray-800">{step.title}</h3>
                      <p className="text-gray-600 mb-4">{step.description}</p>
                      
                      {/* Courses */}
                      <div className="space-y-2 mb-4">
                        {step.courses.map(course => (
                          <div key={course.id} className="flex justify-between items-center p-2 rounded hover:bg-gray-50">
                            <span className="text-sm font-medium text-gray-500">{course.title}</span>
                            <span className="text-sm text-gray-500">{course.duration}</span>
                          </div>
                        ))}
                      </div>
                      
                      {/* Skills */}
                      <div className="flex flex-wrap gap-2 mt-4">
                        {step.skills.map(skill => (
                          <span
                            key={skill}
                            className="px-2 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs font-medium"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-20 text-center">
          <h2 className="text-2xl font-bold text-gray-900">Ready to Start Your QA Journey?</h2>
          <p className="mt-4 text-gray-600">
            Join thousands of QA professionals, from Test Analysts to SDETS and QA Architects, who are advancing their careers with QitOps Learn.
          </p>
          <Link
            to="/auth/sign-up"
            className="mt-8 inline-block rounded-md bg-indigo-600 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-indigo-500"
          >
            Get Started Today
          </Link>
        </div>
      </div>
    </MainLayout>
  );
}