import type { MetaFunction, LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import MainLayout from "~/components/Layout/MainLayout";
import ProtectedRoute from "~/components/Auth/ProtectedRoute";

interface Lesson {
  title: string;
  duration: string;
}

interface Chapter {
  title: string;
  lessons: Lesson[];
}

interface Course {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  duration: string;
  level: string;
  instructor: string;
  chapters: Chapter[];
}

export const meta: MetaFunction = () => {
  return [
    { title: "Course Details - QitOps Learn" },
    { name: "description", content: "Course details and curriculum" },
  ];
};

export const loader: LoaderFunction = async ({ params }) => {
  // This will be replaced with actual data fetching later
  return {
    course: {
      id: params.courseId,
      title: "Selenium Fundamentals",
      description: "Master automated testing with Selenium WebDriver. Learn how to create robust test scripts and frameworks.",
      thumbnail: "/course-thumbnails/selenium.jpg",
      duration: "6h 30m",
      level: "Beginner",
      instructor: "John Doe",
      chapters: [
        {
          title: "Getting Started",
          lessons: [
            { title: "Introduction to Selenium", duration: "10:00" },
            { title: "Setting Up Your Environment", duration: "15:00" },
          ]
        },
      ]
    }
  };
};

export default function CourseDetailPage() {
  const { course } = useLoaderData<typeof loader>();

  return (
    <ProtectedRoute>
      <MainLayout>
        <div className="space-y-8">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="aspect-video w-full relative">
              <img
                src={course.thumbnail}
                alt={course.title}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="p-6">
              <h1 className="text-3xl font-bold">{course.title}</h1>
              <p className="mt-2 text-gray-600">{course.description}</p>
              
              <div className="mt-6 flex items-center space-x-4">
                <span className="text-sm text-gray-500">{course.duration}</span>
                <span className="text-sm text-gray-500">{course.level}</span>
                <span className="text-sm text-gray-500">By {course.instructor}</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">Course Curriculum</h2>
            <div className="space-y-4">
              {course.chapters.map((chapter: Chapter, index: number) => (
                <div key={index} className="border rounded-lg p-4">
                  <h3 className="font-medium">{chapter.title}</h3>
                  <div className="mt-2 space-y-2">
                    {chapter.lessons.map((lesson: Lesson, lessonIndex: number) => (
                      <div
                        key={lessonIndex}
                        className="flex items-center justify-between text-sm text-gray-600 hover:bg-gray-50 p-2 rounded"
                      >
                        <span>{lesson.title}</span>
                        <span>{lesson.duration}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </MainLayout>
    </ProtectedRoute>
  );
}
