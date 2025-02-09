import React from "react";
import { usePage } from "@inertiajs/react";
import Dashboard from "../Dashboard";

const ReportSummary = () => {
  const { task, report, message } = usePage().props;

  return (
    <Dashboard>
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-6">Task Report</h1>

        {message && <p className="text-green-500 text-center">{message}</p>}

        {task ? (
          <div>
            <h2 className="text-xl font-semibold">{task.task_name}</h2>
            <p><strong>Type:</strong> {task.task_type}</p>
            <p><strong>Deadline:</strong> {task.deadline}</p>
            <p><strong>Priority:</strong> {task.priority_level}</p>

            <hr className="my-4" />

            {report ? (
              <div>
                <h3 className="text-lg font-semibold">Report Details</h3>
                <p><strong>Time Spent:</strong> {report.time_spent} seconds</p>
                <p><strong>Status:</strong> {report.status}</p>
              </div>
            ) : (
              <p>No report available.</p>
            )}
          </div>
        ) : (
          <p className="text-red-500">Task not found.</p>
        )}
      </div>
    </Dashboard>
  );
};

export default ReportSummary;
