import { Link } from "@remix-run/react";

interface CourseCardProps {
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

export default function CourseCard({
  id,
  title,
  description,
  thumbnail,
  duration,
  level,
  instructor,
  disciplines
}: CourseCardProps) {
  return (
    <Link to={`/courses/${id}`} className="group">
      <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
        <div className="aspect-video w-full relative rounded-t-lg overflow-hidden">
          <img
            src={thumbnail}
            alt={title}
            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-200"
          />
          <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
            {duration}
          </div>
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-lg group-hover:text-indigo-600 transition-colors">
            {title}
          </h3>
          <p className="text-sm text-gray-600 mt-1 line-clamp-2">{description}</p>

          {/* Discipline Tags */}
          <div className="mt-3 flex flex-wrap gap-1">
            {disciplines.map(discipline => (
              <Link
                key={discipline.slug}
                to={`/disciplines/${discipline.slug}`}
                onClick={(e) => e.stopPropagation()}
                className="text-xs px-2 py-0.5 bg-indigo-50 text-indigo-600 rounded-full hover:bg-indigo-100"
              >
                {discipline.name}
              </Link>
            ))}
          </div>

          <div className="mt-3 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className={`text-xs px-2 py-1 rounded ${
                level === 'Beginner' ? 'bg-green-100 text-green-800' :
                level === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                {level}
              </span>
            </div>
            <span className="text-sm text-gray-500">{instructor}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}