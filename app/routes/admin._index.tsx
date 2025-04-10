import type { MetaFunction, LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import AdminLayout from "~/components/Layout/AdminLayout";
import ProtectedRoute from "~/components/Auth/ProtectedRoute";
import { UserRole } from "~/middleware/auth";

interface LoaderData {
  stats: {
    totalUsers: number;
    totalCourses: number;
    activeEnrollments: number;
    completionRate: number;
  };
  recentActivities: {
    id: string;
    type: string;
    user: string;
    action: string;
    timestamp: string;
  }[];
}

export const meta: MetaFunction = () => {
  return [
    { title: "Admin Dashboard - QitOps Learn" },
    { name: "description", content: "QitOps Learn administration dashboard" },
  ];
};

export const loader: LoaderFunction = async () => {
  // TODO: Fetch real data from your database
  const mockData: LoaderData = {
    stats: {
      totalUsers: 150,
      totalCourses: 12,
      activeEnrollments: 89,
      completionRate: 67,
    },
    recentActivities: [
      {
        id: "1",
        type: "enrollment",
        user: "John Doe",
        action: "enrolled in API Testing Fundamentals",
        timestamp: new Date().toISOString(),
      },
      // Add more mock activities as needed
    ],
  };

  return json<LoaderData>(mockData);
};

export default function AdminDashboardPage() {
  const { stats, recentActivities } = useLoaderData<LoaderData>();

  return (
    <ProtectedRoute allowedRoles={[UserRole.ADMIN]}>
      <AdminLayout>
        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <span className="text-2xl">👥</span>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Total Users
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">
                      {stats.totalUsers}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <span className="text-2xl">📚</span>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Total Courses
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">
                      {stats.totalCourses}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <span className="text-2xl">📈</span>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Active Enrollments
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">
                      {stats.activeEnrollments}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <span className="text-2xl">🎯</span>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Completion Rate
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">
                      {stats.completionRate}%
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mt-8">
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Recent Activity
              </h3>
              <div className="mt-5">
                <div className="flow-root">
                  <ul className="-mb-8">
                    {recentActivities.map((activity, activityIdx) => (
                      <li key={activity.id}>
                        <div className="relative pb-8">
                          {activityIdx !== recentActivities.length - 1 ? (
                            <span
                              className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                              aria-hidden="true"
                            />
                          ) : null}
                          <div className="relative flex space-x-3">
                            <div>
                              <span className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center">
                                {activity.type === 'enrollment' ? '📚' : '✨'}
                              </span>
                            </div>
                            <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                              <div>
                                <p className="text-sm text-gray-500">
                                  {activity.user} {activity.action}
                                </p>
                              </div>
                              <div className="text-right text-sm whitespace-nowrap text-gray-500">
                                {new Date(activity.timestamp).toLocaleDateString()}
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AdminLayout>
    </ProtectedRoute>
  );
}
