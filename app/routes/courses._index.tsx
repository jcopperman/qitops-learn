import type { MetaFunction, LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import MainLayout from "~/components/Layout/MainLayout";
import ProtectedRoute from "~/components/Auth/ProtectedRoute";
import CourseCard from "~/components/Course/CourseCard";

export const meta: MetaFunction = () => {
  return [
    { title: "QA Learning Path - QitOps Learn" },
    { name: "description", content: "Structured learning path for QA Engineers" },
  ];
};

interface Course {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  instructor: string;
}

interface CourseCategory {
  title: string;
  description: string;
  courses: Course[];
}

export const loader: LoaderFunction = async () => {
  // This will be replaced with actual data fetching later
  return {
    categories: [
      {
        title: "QA Fundamentals",
        description: "Essential concepts every QA engineer should know",
        courses: [
          {
            id: "qa-fundamentals",
            title: "Introduction to Software Testing",
            description: "Learn the fundamentals of software testing, including testing principles, methodologies, and best practices.",
            thumbnail: "/course-thumbnails/qa-fundamentals.jpg",
            duration: "4h 30m",
            level: "Beginner",
            instructor: "Sarah Johnson"
          },
          {
            id: "sdlc-basics",
            title: "SDLC and Testing Methods",
            description: "Understanding Software Development Life Cycle and different testing methodologies.",
            thumbnail: "/course-thumbnails/sdlc.jpg",
            duration: "5h 15m",
            level: "Beginner",
            instructor: "Mike Peters"
          }
        ]
      },
      {
        title: "Automation Testing",
        description: "Master modern test automation tools and frameworks",
        courses: [
          {
            id: "selenium-masterclass",
            title: "Selenium WebDriver Masterclass",
            description: "Complete guide to web automation with Selenium WebDriver and JavaScript/Python.",
            thumbnail: "/course-thumbnails/selenium.jpg",
            duration: "8h 45m",
            level: "Intermediate",
            instructor: "John Doe"
          },
          {
            id: "cypress-testing",
            title: "Modern E2E Testing with Cypress",
            description: "Learn end-to-end testing using Cypress framework and best practices.",
            thumbnail: "/course-thumbnails/cypress.jpg",
            duration: "6h 30m",
            level: "Intermediate",
            instructor: "Emma Wilson"
          }
        ]
      },
      {
        title: "API Testing",
        description: "Learn to test REST, GraphQL, and other API architectures",
        courses: [
          {
            id: "api-testing-fundamentals",
            title: "API Testing Fundamentals",
            description: "Master API testing using Postman, REST Assured, and other modern tools.",
            thumbnail: "/course-thumbnails/api.jpg",
            duration: "7h 15m",
            level: "Intermediate",
            instructor: "Alex Chen"
          },
          {
            id: "graphql-testing",
            title: "GraphQL API Testing",
            description: "Advanced techniques for testing GraphQL APIs and mutations.",
            thumbnail: "/course-thumbnails/graphql.jpg",
            duration: "5h 45m",
            level: "Advanced",
            instructor: "Lisa Zhang"
          }
        ]
      },
      {
        title: "Performance Testing",
        description: "Learn to measure and optimize application performance",
        courses: [
          {
            id: "jmeter-masterclass",
            title: "Performance Testing with JMeter",
            description: "Comprehensive guide to performance testing using Apache JMeter.",
            thumbnail: "/course-thumbnails/jmeter.jpg",
            duration: "6h 30m",
            level: "Intermediate",
            instructor: "David Brown"
          }
        ]
      }
    ]
  };
};

export default function CoursesPage() {
  const { categories } = useLoaderData<typeof loader>();

  return (
    <ProtectedRoute>
      <MainLayout>
        <div className="space-y-12">
          <div>
            <h1 className="text-3xl font-bold">QA Learning Path</h1>
            <p className="mt-2 text-gray-600">
              Follow our structured learning path to become a professional QA Engineer
            </p>
          </div>

          {/* Learning Path Categories */}
          {categories.map((category: CourseCategory, index: number) => (
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

          {/* Career Path Progress - To be implemented */}
          <div className="bg-white rounded-lg shadow-sm p-6 mt-8">
            <h2 className="text-xl font-semibold mb-4">Your Learning Progress</h2>
            <p className="text-gray-600">
              Track your progress and earn certificates as you complete each section.
            </p>
            {/* Add progress tracking UI here */}
          </div>
        </div>
      </MainLayout>
    </ProtectedRoute>
  );
}


