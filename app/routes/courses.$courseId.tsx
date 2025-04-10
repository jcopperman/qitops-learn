import type { LoaderFunction, MetaFunction } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import { useLoaderData, Link } from "@remix-run/react";
import MainLayout from "~/components/Layout/MainLayout";

interface Lesson {
  title: string;
  duration: string;
}

interface Chapter {
  title: string;
  lessons: Lesson[];
}

interface CourseDetail {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  instructor: string;
  chapters: Chapter[];
  disciplines: {
    slug: string;
    name: string;
  }[];
}

interface LoaderData {
  course: CourseDetail;
}

export const meta: MetaFunction = () => {
  return [
    { title: "Course Details - QitOps Learn" },
    { name: "description", content: "Course details and curriculum" },
  ];
};

export const loader: LoaderFunction = async ({ params }) => {
  if (!params.courseId) {
    throw new Error("Course ID is required");
  }

  const courseData: CourseDetail = {
    id: params.courseId,
    title: "Selenium Fundamentals",
    description: "Master automated testing with Selenium WebDriver. Learn how to create robust test scripts and frameworks.",
    thumbnail: "https://placehold.co/600x400/indigo/white?text=Selenium",
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
    ],
    disciplines: [
      { slug: "test-automation", name: "Test Automation Engineering" }
    ]
  };

  return json<LoaderData>({ course: courseData });
};

export default function CourseDetailPage() {
  const { course } = useLoaderData<LoaderData>();

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
          <p className="text-gray-600">{course.description}</p>

          {/* Discipline Tags */}
          <div className="mt-4 flex flex-wrap gap-2">
            {course.disciplines.map(discipline => (
              <Link
                key={discipline.slug}
                to={`/disciplines/${discipline.slug}`}
                className="text-sm px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full hover:bg-indigo-100"
              >
                {discipline.name}
              </Link>
            ))}
          </div>
        </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="col-span-2">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-4">Course Curriculum</h2>
                <div className="space-y-4">
                  {course.chapters.map((chapter: Chapter, chapterIndex: number) => (
                    <div key={chapterIndex} className="border rounded-lg p-4">
                      <h3 className="font-medium mb-2">{chapter.title}</h3>
                      <ul className="space-y-2">
                        {chapter.lessons.map((lesson: Lesson, lessonIndex: number) => (
                          <li key={lessonIndex} className="flex justify-between text-sm">
                            <span>{lesson.title}</span>
                            <span className="text-gray-500">{lesson.duration}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-semibold mb-4">Course Details</h2>
                <div className="space-y-3">
                  <div>
                    <div className="text-sm text-gray-500">Duration</div>
                    <p>{course.duration}</p>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Level</div>
                    <p>{course.level}</p>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Instructor</div>
                    <p>{course.instructor}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </MainLayout>
  );
}



