import React from "react";

const ActivityList = ({ activities }) => {
  if (!activities || activities.length === 0) {
    return <p className="text-gray-500">No recent activities found.</p>;
  }

  return (
    <div className="bg-white shadow rounded-2xl p-4 mt-4">
      <h2 className="text-xl font-semibold mb-3">Recent Activities</h2>
      <ul className="space-y-3">
        {activities.map((activity) => (
          <li
            key={activity.id || activity._id}
            className="border-b pb-2 flex justify-between items-center"
          >
            <div className="flex items-center gap-3">
              {activity.Book?.coverUrl ? (
                <img
                  src={activity.Book.coverUrl}
                  alt={activity.Book.title}
                  className="w-12 h-16 object-cover rounded-md border"
                />
              ) : (
                <div className="w-12 h-16 bg-gray-200 rounded-md flex items-center justify-center text-gray-400 text-xs">
                  No Cover
                </div>
              )}

              <div>
                <p className="font-medium text-gray-800 flex items-center gap-1">
                  {activity.action === "added_book" && "📘"}
                  {activity.action === "purchased_book" && "💰"}
                  {activity.action.replace("_", " ")}
                </p>
                <p className="text-sm text-gray-600">
                  {activity.Book
                    ? `${activity.Book.title} by ${activity.Book.author}`
                    : activity.details?.title || "No book info"}
                </p>
              </div>
            </div>

            <span className="text-xs text-gray-500">
              {new Date(activity.timestamp).toLocaleString()}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ActivityList;
