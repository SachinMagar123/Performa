import React, { useState, useEffect } from 'react';
import { usePage, router } from '@inertiajs/react';
import Dashboard from '../Dashboard';
import { FaPlay, FaPause, FaRedo, FaFileAlt } from 'react-icons/fa';
import './Assignment.css';

const Assignment = ({ task }) => {
  const [timer, setTimer] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [status, setStatus] = useState('in-progress');
  const [randomText, setRandomText] = useState('Keep up the great work!');
  const [progress, setProgress] = useState(0); // New state for tracking progress

  const randomTexts = [
    "Keep up the great work!",
    "Almost there!",
    "You're doing amazing!",
    "Stay focused!",
    "Keep pushing forward!",
    "Success is on the horizon!"
  ];

  // Start/stop/reset the timer
  const handleToggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const handleResetTimer = () => {
    setTimer(0);
    setIsRunning(false);
  };

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  // Calculate progress as a percentage (assume taskDuration is the total time allotted for the task)
  const taskDuration = 3600; // Example total task duration in seconds (1 hour)
  const calculateProgress = () => {
    return (timer / taskDuration) * 100;
  };

  useEffect(() => {
    const progressValue = calculateProgress();
    setProgress(progressValue);

    // Update the random text based on progress
    if (progressValue < 25) {
      setRandomText("Keep going, you're just getting started!");
    } else if (progressValue < 50) {
      setRandomText("You're making great progress!");
    } else if (progressValue < 75) {
      setRandomText("Almost there, keep it up!");
    } else {
      setRandomText("Fantastic work, you're almost done!");
    }
  }, [timer]);

  // Format time 
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  // Submit report to the database
  const handleSubmitReport = () => {
    if (!task) return alert("No task found!");

    router.post(`/employee/update-report/${task.id}`, {
      status: status,
      time_spent: timer,
    }, {
      onSuccess: () => {
        router.get(`/employee/report/${task.id}`); // Redirect to report page after saving
      },
      onError: () => alert("Error saving report!"),
    });
  };

  return (
    <Dashboard>
   
   {task ? (
  <div className="flex justify-center items-center w-full mt-2 ml-96">
    <h1 className="text-4xl font-bold text-white">{task.task_name}</h1>
  </div>
) : (
  <p className="text-red-500 text-center w-full">No task found.</p>
)}

<div className="flex w-full max-w-6xl bg-gradient-to-r from-orange-500 to-orange-700 p-6 rounded-lg shadow-xl max-h-screen overflow-auto ml-96 mt-6">
  {/* Task Details and Status in Horizontal Layout */}
  <div className="w-full flex flex-row space-x-6 overflow-auto">
    {/* Task Details Box */}
    <div className="w-1/2 bg-orange-400 p-6 rounded-lg shadow-lg">
      <h2 className="text-3xl font-semibold mb-4 text-white">Task Details</h2>
      {task ? (
        <div className="space-y-2">
          <p className="text-white"><strong>Type:</strong> {task.task_type}</p>
          <p className="text-white"><strong>Deadline:</strong> {task.deadline}</p>
          <p className="text-white"><strong>Priority:</strong> {task.priority_level}</p>
        </div>
      ) : (
        <p className="text-white">No details available.</p>
      )}
    </div>

    {/* Status Box */}
    <div className="w-1/2 bg-orange-400 p-6 rounded-lg shadow-lg">
      <h2 className="text-3xl font-semibold mb-4 text-white">Status</h2>
      <div className="flex flex-col items-start space-y-4">
        {["in-progress", "on-doing", "completed", "cancelled"].map((s) => (
          <label key={s} className="text-white text-lg">
            <input
              type="radio"
              name="status"
              value={s}
              checked={status === s}
              onChange={(e) => setStatus(e.target.value)}
              className="mr-2 accent-orange-600"
            />
            {s.charAt(0).toUpperCase() + s.slice(1)}
          </label>
        ))}
      </div>
    </div>
  </div>
</div>

{/* Timer UI */}
<div className="absolute top-10 right-10 flex flex-col items-center justify-center z-10 space-y-2">
  <p className="text-xl font-semibold text-white zoom-in-out">Your Timing</p>
  <div className="flex items-center bg-white w-36 h-12 rounded-full shadow-lg p-3">
    <p className="text-2xl font-semibold text-orange-500 pl-3">{formatTime(timer)}</p>
  </div>

  <div className="flex space-x-6 mt-4">
    <button
      onClick={handleToggleTimer}
      className={`w-10 h-10 rounded-full flex justify-center items-center text-white text-3xl transition-all duration-300 ${isRunning ? 'bg-red-500 hover:bg-red-600' : 'bg-orange-600 hover:bg-orange-700'}`}
    >
      {isRunning ? <FaPause /> : <FaPlay />}
    </button>

    <button
      onClick={handleResetTimer}
      className="w-10 h-10 rounded-full flex justify-center items-center text-white text-3xl bg-gray-500 hover:bg-gray-600 transition-all duration-300"
    >
      <FaRedo />
    </button>
  </div>
</div>





      {/* Progress Bar and Report Button at the Bottom */}
      <div className="fixed bottom-4 left-32 right-16 flex items-center justify-center space-x-6 z-10 px-6">

  <p className="text-lg text-white mt-2 absolute bottom-16 left-88">{randomText}</p>

  {/* Progress Bar */}
  <div className="w-1/2 bg-gray-200 rounded-full flex-1">
    <div className="bg-green-500 h-6 rounded-full" style={{ width: `${progress}%` }}></div>
  </div>

  {/* Report Button */}
  <button
    onClick={handleSubmitReport}
    className="bg-orange-700 text-white p-4 rounded-full shadow-xl hover:bg-orange-800 transition-all duration-300"
  >
    <FaFileAlt size={24} />
  </button>
</div>
   
    </Dashboard>
  );
};

export default Assignment;


