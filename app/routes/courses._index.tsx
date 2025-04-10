import type { MetaFunction, LoaderFunction } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import { useLoaderData, Link } from "@remix-run/react";
import { useState } from "react";
import MainLayout from "~/components/Layout/MainLayout";
import CourseCard from "~/components/Course/CourseCard";

interface Course {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  instructor: string;
  disciplines: {
    slug: string;
    name: string;
  }[];
}

interface CourseCategory {
  title: string;
  description: string;
  courses: Course[];
}

interface LoaderData {
  categories: CourseCategory[];
}

export const meta: MetaFunction = () => {
  return [
    { title: "QA Learning Path - QitOps Learn" },
    { name: "description", content: "Structured learning path for QA Engineers" },
  ];
};

export const loader: LoaderFunction = async () => {
  const data: LoaderData = {
    categories: [
      {
        title: "QA Fundamentals",
        description: "Essential concepts every QA engineer should know",
        courses: [
          {
            id: "qa-fundamentals",
            title: "Introduction to Software Testing",
            description: "Learn the fundamentals of software testing, including testing principles, methodologies, and best practices.",
            thumbnail: "https://placehold.co/600x400/indigo/white?text=QA+Fundamentals",
            duration: "4h 30m",
            level: "Beginner",
            instructor: "Sarah Johnson",
            disciplines: [
              { slug: "manual-testing", name: "Manual Testing & Analysis" }
            ]
          },
          {
            id: "test-case-design",
            title: "Effective Test Case Design",
            description: "Master the art of creating comprehensive test cases that catch bugs before they reach production.",
            thumbnail: "https://placehold.co/600x400/indigo/white?text=Test+Case+Design",
            duration: "3h 45m",
            level: "Beginner",
            instructor: "Michael Chen",
            disciplines: [
              { slug: "manual-testing", name: "Manual Testing & Analysis" },
              { slug: "qa-leadership", name: "QA Leadership & Strategy" }
            ]
          }
        ]
      },
      {
        title: "Test Automation",
        description: "Learn to build robust, maintainable test automation frameworks",
        courses: [
          {
            id: "playwright-fundamentals",
            title: "Playwright for Modern Web Testing",
            description: "Learn how to use Playwright to create reliable, cross-browser automated tests for modern web applications.",
            thumbnail: "https://placehold.co/600x400/indigo/white?text=Playwright",
            duration: "5h 15m",
            level: "Intermediate",
            instructor: "Alex Rodriguez",
            disciplines: [
              { slug: "test-automation", name: "Test Automation Engineering" }
            ]
          },
          {
            id: "api-testing",
            title: "API Testing with Postman and SuperTest",
            description: "Master API testing techniques using popular tools like Postman and SuperTest to ensure your services work correctly.",
            thumbnail: "https://placehold.co/600x400/indigo/white?text=API+Testing",
            duration: "4h 00m",
            level: "Intermediate",
            instructor: "Jessica Kim",
            disciplines: [
              { slug: "test-automation", name: "Test Automation Engineering" }
            ]
          }
        ]
      },
      {
        title: "Performance Testing",
        description: "Ensure your applications can handle the load",
        courses: [
          {
            id: "jmeter-load-testing",
            title: "Load Testing with JMeter",
            description: "Learn how to design and execute effective load tests using Apache JMeter to identify performance bottlenecks.",
            thumbnail: "https://placehold.co/600x400/indigo/white?text=JMeter",
            duration: "6h 30m",
            level: "Intermediate",
            instructor: "David Wilson",
            disciplines: [
              { slug: "performance-testing", name: "Performance & Load Testing" }
            ]
          }
        ]
      },
      {
        title: "Security Testing",
        description: "Protect your applications from vulnerabilities",
        courses: [
          {
            id: "owasp-top-ten",
            title: "OWASP Top 10 Security Testing",
            description: "Learn how to identify and test for the most critical web application security risks according to OWASP.",
            thumbnail: "https://placehold.co/600x400/indigo/white?text=Security+Testing",
            duration: "5h 45m",
            level: "Advanced",
            instructor: "Sophia Martinez",
            disciplines: [
              { slug: "security-testing", name: "Security Testing" }
            ]
          }
        ]
      },
      {
        title: "AI in QA",
        description: "Leverage AI to enhance your testing practices",
        courses: [
          {
            id: "ai-test-generation",
            title: "AI-Powered Test Generation",
            description: "Discover how to use AI tools to automatically generate test cases and increase test coverage.",
            thumbnail: "https://placehold.co/600x400/indigo/white?text=AI+Testing",
            duration: "4h 15m",
            level: "Advanced",
            instructor: "Robert Chang",
            disciplines: [
              { slug: "ai-augmented-qa", name: "AI-Augmented QA" }
            ]
          }
        ]
      }
    ]
  };

  return json<LoaderData>(data);
};

export default function CoursesIndexPage() {
  const { categories } = useLoaderData<LoaderData>();
  const [selectedDiscipline, setSelectedDiscipline] = useState<string | null>(null);

  // Get all unique disciplines for the filter
  const allDisciplines = Array.from(new Set(
    categories.flatMap(category =>
      category.courses.flatMap(course =>
        course.disciplines.map(d => ({ slug: d.slug, name: d.name }))
      )
    ).map(d => JSON.stringify(d))
  )).map(d => JSON.parse(d));

  // Filter courses based on selected discipline
  const filteredCategories = selectedDiscipline
    ? categories.map(category => ({
        ...category,
        courses: category.courses.filter(course =>
          course.disciplines.some(d => d.slug === selectedDiscipline)
        )
      })).filter(category => category.courses.length > 0)
    : categories;

  return (
    <MainLayout>
      <div className="space-y-12">
        <div>
          <h1 className="text-3xl font-bold">QA Learning Path</h1>
          <p className="mt-2 text-gray-600">
            Follow our structured learning path to become a professional QA Engineer
          </p>
        </div>

        {/* Discipline Filter */}
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-3">Filter by Discipline</h2>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedDiscipline(null)}
              className={`px-3 py-1 rounded-full text-sm ${!selectedDiscipline
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            >
              All Disciplines
            </button>
            {allDisciplines.map(discipline => (
              <button
                key={discipline.slug}
                onClick={() => setSelectedDiscipline(discipline.slug)}
                className={`px-3 py-1 rounded-full text-sm ${selectedDiscipline === discipline.slug
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              >
                {discipline.name}
              </button>
            ))}
          </div>
        </div>

        {filteredCategories.map((category: CourseCategory, index: number) => (
          <section key={index} className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold">{category.title}</h2>
              <p className="text-gray-600 mt-1">{category.description}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {category.courses.map((course: Course) => (
                <CourseCard
                  key={course.id}
                  {...course}
                />
              ))}
            </div>
          </section>
        ))}

        {filteredCategories.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-xl font-medium text-gray-900">No courses found</h3>
            <p className="mt-2 text-gray-600">Try selecting a different discipline filter</p>
          </div>
        )}
      </div>
    </MainLayout>
  );
}


