import React, { useState, useEffect } from 'react';
import { usePage, router } from '@inertiajs/react'; // Import Inertia's router
import Dashboard from '../Dashboard';
import { FaPlay, FaPause, FaRedo, FaFileAlt } from 'react-icons/fa';

const Assignment = ({ task }) => {
  const [timer, setTimer] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [status, setStatus] = useState('in-progress');

  const randomTexts = [
    "Keep up the great work!",
    "Almost there!",
    "You're doing amazing!",
    "Stay focused!",
    "Keep pushing forward!",
    "Success is on the horizon!"
  ];
  const [randomText, setRandomText] = useState(randomTexts[0]);

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

  // Format time 
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  // Change motivational text every 20s
  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * randomTexts.length);
      setRandomText(randomTexts[randomIndex]);
    }, 20000);
    return () => clearInterval(interval);
  }, []);

  // Submiting report to the database
  const handleSubmitReport = () => {
    if (!task) return alert("No task found!");

    router.post('/employee/update-report/' + task.id, {
      status: status,
      time_spent: timer,
    }, {
      onSuccess: () => alert("Report saved successfully!"),
      onError: (errors) => alert("Error saving report!"),
    });
  };

  return (
    <Dashboard>
      {task ? (
        <h1 className="text-3xl font-bold text-white mb-6 text-center w-full">
          {task.task_name}
        </h1>
      ) : (
        <p className="text-red-500 text-center w-full">No task found.</p>
      )}

      <div className="flex w-full max-w-4xl bg-white p-6 rounded-lg shadow-lg">
        <div className="w-full flex flex-col">
          <div className="w-full mb-4">
            <h2 className="text-xl font-semibold mb-4">Task Details</h2>
            {task ? (
              <>
                <p><strong>Type:</strong> {task.task_type}</p>
                <p><strong>Deadline:</strong> {task.deadline}</p>
                <p><strong>Priority:</strong> {task.Priority_level}</p>
              </>
            ) : (
              <p>No details available.</p>
            )}
          </div>

          <div className="w-full">
            <h2 className="text-xl font-semibold mb-4">Status</h2>
            <div className="flex flex-col items-start space-y-2">
              {["in-progress", "on-doing", "completed", "cancelled"].map((s) => (
                <label key={s}>
                  <input
                    type="radio"
                    name="status"
                    value={s}
                    checked={status === s}
                    onChange={(e) => setStatus(e.target.value)}
                    className="mr-2"
                  />
                  {s.charAt(0).toUpperCase() + s.slice(1)}
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="absolute top-24 right-4 flex items-center justify-center z-10">
        <div className="flex items-center space-x-4">
          <div className="flex items-center bg-gray-300 w-48 h-10 rounded-full">
            <p className="text-xl font-bold text-gray-800 pl-2">{formatTime(timer)}</p>
          </div>

          <button
            onClick={handleToggleTimer}
            className={`w-16 h-16 rounded-full flex justify-center items-center text-white text-2xl ${isRunning ? 'bg-red-500' : 'bg-green-500'}`}
          >
            {isRunning ? <FaPause /> : <FaPlay />}
          </button>

          <button
            onClick={handleResetTimer}
            className="w-16 h-16 rounded-full flex justify-center items-center text-white text-2xl bg-gray-500"
          >
            <FaRedo />
          </button>
        </div>
      </div>

      <button
        onClick={handleSubmitReport}
        className="absolute bottom-4 right-6 bg-gray-700 text-white p-3 rounded-full shadow-md hover:bg-gray-900 transition duration-300"
      >
        <FaFileAlt size={24} />
      </button>
    </Dashboard>
  );
};

export default Assignment;
