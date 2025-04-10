import type { MetaFunction, LoaderFunction } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";
import MainLayout from "~/components/Layout/MainLayout";
import ProtectedRoute from "~/components/Auth/ProtectedRoute";
import CourseCard from "~/components/Course/CourseCard";

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
            thumbnail: "/course-thumbnails/qa-fundamentals.jpg",
            duration: "4h 30m",
            level: "Beginner",
            instructor: "Sarah Johnson"
          }
        ]
      }
    ]
  };

  return json<LoaderData>(data);
};

export default function CoursesIndexPage() {
  const { categories } = useLoaderData<LoaderData>();

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
        </div>
      </MainLayout>
    </ProtectedRoute>
  );
}


