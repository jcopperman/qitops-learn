import { useUser } from "@clerk/remix";
import { json, type LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import ProtectedRoute from "~/components/Auth/ProtectedRoute";

interface LoaderData {
  enrolledCourses: {
    id: string;
    title: string;
    progress: number;
    lastAccessed: string;
  }[];
  certificates: {
    id: string;
    courseTitle: string;
    issueDate: string;
    certificateUrl: string;
  }[];
}

export const loader: LoaderFunction = async () => {
  // TODO: Fetch actual user data from your database
  const mockData: LoaderData = {
    enrolledCourses: [
      {
        id: "1",
        title: "Introduction to Software Testing",
        progress: 45,
        lastAccessed: "2024-03-28",
      },
    ],
    certificates: [
      {
        id: "1",
        courseTitle: "QA Fundamentals",
        issueDate: "2024-03-15",
        certificateUrl: "/certificates/qa-fundamentals",
      },
    ],
  };

  return json<LoaderData>(mockData);
};

export default function ProfilePage() {
  const { user } = useUser();
  const { enrolledCourses, certificates } = useLoaderData<LoaderData>();

  return (
    <ProtectedRoute>
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Profile Header */}
          <div className="bg-white shadow rounded-lg p-6 mb-6">
            <div className="flex items-center">
              <img
                className="h-20 w-20 rounded-full"
                src={user?.imageUrl}
                alt={user?.fullName || "Profile"}
              />
              <div className="ml-6">
                <h1 className="text-2xl font-bold text-gray-900">
                  {user?.fullName}
                </h1>
                <p className="text-sm text-gray-500">{user?.primaryEmailAddress?.emailAddress}</p>
              </div>
            </div>
          </div>

          {/* Enrolled Courses */}
          <div className="bg-white shadow rounded-lg p-6 mb-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              Enrolled Courses
            </h2>
            <div className="space-y-4">
              {enrolledCourses.map((course) => (
                <div
                  key={course.id}
                  className="border rounded-lg p-4 hover:bg-gray-50"
                >
                  <div className="flex justify-between items-center">
                    <h3 className="text-sm font-medium text-gray-900">
                      {course.title}
                    </h3>
                    <span className="text-sm text-gray-500">
                      {course.progress}% Complete
                    </span>
                  </div>
                  <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-indigo-600 h-2 rounded-full"
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Certificates */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              Certificates
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {certificates.map((certificate) => (
                <div
                  key={certificate.id}
                  className="border rounded-lg p-4 hover:bg-gray-50"
                >
                  <h3 className="text-sm font-medium text-gray-900">
                    {certificate.courseTitle}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Issued on {new Date(certificate.issueDate).toLocaleDateString()}
                  </p>
                  <a
                    href={certificate.certificateUrl}
                    className="mt-2 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200"
                  >
                    View Certificate
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
