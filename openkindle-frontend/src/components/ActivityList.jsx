// src/components/ActivityList.jsx
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
            key={activity.id}
            className="border-b pb-2 flex justify-between items-center"
          >
            <div>
              <p className="font-medium text-gray-800">
                {activity.action === "added_book"
                  ? "📘 Added a new book"
                  : activity.action === "purchased_book"
                  ? "💰 Purchased a book"
                  : activity.action}
              </p>
              <p className="text-sm text-gray-600">
                {activity.Book
                  ? `${activity.Book.title} by ${activity.Book.author}`
                  : "No book info"}
              </p>
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
