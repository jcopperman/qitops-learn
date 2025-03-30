import type { MetaFunction } from "@remix-run/node";
import MainLayout from "~/components/Layout/MainLayout";
import ProtectedRoute from "~/components/Auth/ProtectedRoute";
import { UserRole } from "~/middleware/auth";

export const meta: MetaFunction = () => {
  return [
    { title: "Admin Dashboard - QitOps Learn" },
    { name: "description", content: "QitOps Learn administration dashboard" },
  ];
};

export default function AdminDashboardPage() {
  return (
    <ProtectedRoute allowedRoles={[UserRole.ADMIN]}>
      <MainLayout>
        <div className="space-y-8">
          <div>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="mt-2 text-gray-600">
              Manage users, courses, and platform settings
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <h3 className="text-lg font-medium">Users</h3>
                <p className="mt-1 text-gray-500">Manage user accounts and roles</p>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <h3 className="text-lg font-medium">Courses</h3>
                <p className="mt-1 text-gray-500">Manage all platform courses</p>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <h3 className="text-lg font-medium">Settings</h3>
                <p className="mt-1 text-gray-500">Configure platform settings</p>
              </div>
            </div>
          </div>
        </div>
      </MainLayout>
    </ProtectedRoute>
  );
}