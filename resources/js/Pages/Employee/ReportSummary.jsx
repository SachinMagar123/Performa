// import React from "react";
// import { usePage } from "@inertiajs/react";
// import Dashboard from "../Dashboard";
// import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";

// const ReportSummary = () => {
//   const { task, report, message, monthlyLogins } = usePage().props;

//   return (
//     <Dashboard>
//       {/* <div>
//       <h1 className="text-4xl font-bold text-center w-full mb-8">Your Report</h1>
//       </div> */}

// <div className="flex justify-center items-center">
//   <h1 className="text-4xl font-bold text-[#FBF5DD]">
//     Your Report
//   </h1>
// </div>

//       <div className="max-w-6xl mx-auto bg-white p-8 rounded-lg shadow-lg mt-6 flex flex-col lg:flex-row gap-6">


//         {/* Left Side - Task Report */}
//         <div className="lg:w-2/5 w-full p-6 bg-gray-100 rounded-lg shadow-md">
//           <h1 className="text-3xl font-bold text-center mb-6">Task Report</h1>

//           {message && <p className="text-green-500 text-center">{message}</p>}

//           {task ? (
//             <>
//               <h2 className="text-xl font-semibold">{task.task_name}</h2>
//               <p><strong>Type:</strong> {task.task_type}</p>
//               <p><strong>Deadline:</strong> {task.deadline}</p>
//               <p><strong>Priority:</strong> {task.priority_level}</p>

//               <hr className="my-4" />

//               {report ? (
//                 <div>
//                   <h3 className="text-lg font-semibold">Report Details</h3>
//                   <p><strong>Time Spent:</strong> {report.time_spent} seconds</p>
//                   <p><strong>Status:</strong> {report.status}</p>
//                 </div>
//               ) : (
//                 <p>No report available.</p>
//               )}
//             </>
//           ) : (
//             <p className="text-red-500">Task not found.</p>
//           )}
//         </div>

//         {/* Right Side - Bar Chart in Separate Card, Stretched to the Right */}
//         <div className="lg:w-3/5 w-full flex justify-end">
//           <div className="bg-white p-6 rounded-lg shadow-md w-full">
//             <h3 className="text-lg font-semibold text-center mb-4">User Logins in the Last 30 Days</h3>
//             <ResponsiveContainer width="100%" height={400}>
//               <BarChart data={monthlyLogins} margin={{ top: 10, right: 30, left: 0, bottom: 20 }}>
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="date" angle={-45} textAnchor="end" height={60} />
//                 <YAxis allowDecimals={false} />
//                 <Tooltip />
//                 <Bar dataKey="logins" fill="#4F46E5" radius={[5, 5, 0, 0]} />
//               </BarChart>
//             </ResponsiveContainer>
//           </div>
//         </div>
//       </div>
//     </Dashboard>
//   );
// };

// export default ReportSummary;


import React from "react";
import { usePage } from "@inertiajs/react";
import Dashboard from "../Dashboard";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Legend, ReferenceLine } from "recharts";

const ReportSummary = () => {
  const { task, report, message, monthlyLogins } = usePage().props;

  return (
    <Dashboard>
      <div className="flex justify-center items-center">
        <h1 className="text-4xl font-bold text-[#FBF5DD]">Your Report</h1>
      </div>

      <div className="max-w-6xl mx-auto bg-white p-8 rounded-lg shadow-lg mt-6 flex flex-col lg:flex-row gap-6">
        {/* Left Side - Task Report */}
        <div className="lg:w-2/5 w-full p-6 bg-gray-100 rounded-lg shadow-md">
          <h1 className="text-3xl font-bold text-center mb-6">Task Report</h1>

          {message && <p className="text-green-500 text-center">{message}</p>}

          {task ? (
            <>
              <h2 className="text-xl font-semibold">{task.task_name}</h2>
              <p><strong>Type:</strong> {task.task_type}</p>
              <p><strong>Deadline:</strong> {task.deadline}</p>
              <p><strong>Priority:</strong> {task.priority_level}</p>

              <hr className="my-4" />

              {report ? (
                <div>
                  <h3 className="text-lg font-semibold">Report Details</h3>
                  <p><strong>Time Spent:</strong> {report.time_spent} sec</p>
                  <p><strong>Status:</strong> {report.status}</p>
                </div>
              ) : (
                <p>No report available.</p>
              )}
            </>
          ) : (
            <p className="text-red-500">Task not found.</p>
          )}
        </div>

        {/* Right Side - Bar Chart in Separate Card */}
        <div className="lg:w-3/5 w-full flex justify-end">
          <div className="bg-white p-6 rounded-lg shadow-md w-full">
            <h3 className="text-lg font-semibold text-center mb-4">Your Login past 30 days</h3>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={monthlyLogins} margin={{ top: 10, right: 30, left: 0, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
                <XAxis dataKey="date" angle={-45} textAnchor="end" height={60} />
                <YAxis allowDecimals={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#333",
                    color: "#fff",
                    borderRadius: "5px",
                    padding: "10px",
                  }}
                  cursor={{ fill: 'rgba(0, 0, 0, 0.1)' }}
                />
                <Legend verticalAlign="top" align="right" />
                <ReferenceLine y={0} stroke="#000" />
                <Bar
                  dataKey="logins"
                  fill="url(#gradient)"
                  radius={[5, 5, 0, 0]}
                  barSize={30}
                  shadowColor="rgba(0, 0, 0, 0.15)"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Gradient Definition */}
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.9} />
          <stop offset="95%" stopColor="#6EE7B7" stopOpacity={0.9} />
        </linearGradient>
      </defs>
    </Dashboard>
  );
};

export default ReportSummary;
