import type { MetaFunction } from "@remix-run/node";
import MainLayout from "~/components/Layout/MainLayout";
import ProtectedRoute from "~/components/Auth/ProtectedRoute";
import { UserRole } from "~/middleware/auth";

export const meta: MetaFunction = () => {
  return [
    { title: "Manage Courses - QitOps Learn" },
    { name: "description", content: "Manage your QA training courses" },
  ];
};

export default function ManageCoursesPage() {
  return (
    <ProtectedRoute allowedRoles={[UserRole.INSTRUCTOR, UserRole.ADMIN]}>
      <MainLayout>
        <div className="space-y-8">
          <div>
            <h1 className="text-3xl font-bold">Manage Courses</h1>
            <p className="mt-2 text-gray-600">
              Create and manage your QA training courses
            </p>
          </div>
          
          <div className="flex justify-end">
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Create New Course
            </button>
          </div>

          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            {/* Course list will go here */}
          </div>
        </div>
      </MainLayout>
    </ProtectedRoute>
  );
}