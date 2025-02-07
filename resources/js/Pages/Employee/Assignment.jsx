import React, { useState, useEffect } from 'react';
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

  // Start, stop, or reset the timer
  const handleToggleTimer = () => {
    if (isRunning) {
      setIsRunning(false);
    } else {
      setIsRunning(true);
    }
  };

  // Reset the timer
  const handleResetTimer = () => {
    setTimer(0);
    setIsRunning(false);
  };

  useEffect(() => {
    let interval;

    if (isRunning) {
      interval = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000); // Increase timer by 1 every second
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isRunning]);

  // Format time in MM:SS format
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  // Function to generate random text after every minute
  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * randomTexts.length);
      setRandomText(randomTexts[randomIndex]);
    }, 20000); // Change random text every 20s

    return () => clearInterval(interval);
  }, []);

  return (
    <Dashboard>
      {/* Task Name Centered at the Top */}
      {task ? (
        <h1 className="text-3xl font-bold text-white mb-6 text-center w-full">
          {task.task_name}
        </h1>
      ) : (
        <p className="text-red-500 text-center w-full">No task found.</p>
      )}

      {/* Layout: Left Sidebar for Task Details */}
      <div className="flex w-full max-w-4xl bg-white p-6 rounded-lg shadow-lg">
        <div className="w-full flex flex-col">
          {/* Task Details Section */}
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

          {/* Status Section Below Task Details */}
          <div className="w-full">
            <h2 className="text-xl font-semibold mb-4">Status</h2>
            <div className="flex flex-col items-start space-y-2">
              <label>
                <input
                  type="radio"
                  name="status"
                  value="in-progress"
                  checked={status === 'in-progress'}
                  onChange={(e) => setStatus(e.target.value)}
                  className="mr-2"
                />
                In Progress
              </label>
              <label>
                <input
                  type="radio"
                  name="status"
                  value="on-doing"
                  checked={status === 'on-doing'}
                  onChange={(e) => setStatus(e.target.value)}
                  className="mr-2"
                />
                On Doing
              </label>
              <label>
                <input
                  type="radio"
                  name="status"
                  value="completed"
                  checked={status === 'completed'}
                  onChange={(e) => setStatus(e.target.value)}
                  className="mr-2"
                />
                Completed
              </label>
              <label>
                <input
                  type="radio"
                  name="status"
                  value="cancelled"
                  checked={status === 'cancelled'}
                  onChange={(e) => setStatus(e.target.value)}
                  className="mr-2"
                />
                Cancelled
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Timer */}
      <div className="absolute top-24 right-4 flex items-center justify-center z-10">
        {/* Timer Bar */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center bg-gray-300 w-48 h-10 rounded-full">
            <div
              className="bg-blue-400 h-10 rounded-full transition-all duration-1000"
                />
            <p className="text-xl font-bold text-gray-800 pl-2">{formatTime(timer)}</p>
          </div>

          <button
            onClick={handleToggleTimer}
            className={`w-16 h-16 rounded-full flex justify-center items-center text-white text-2xl ${isRunning ? 'bg-red-500' : 'bg-green-500'} transition duration-300`}
          >
            {isRunning ? <FaPause /> : <FaPlay />}
          </button>

          <button
            onClick={handleResetTimer}
            className="w-16 h-16 rounded-full flex justify-center items-center text-white text-2xl bg-gray-500 transition duration-300"
          >
            <FaRedo />
          </button>
        </div>
      </div>

      {/* Progress Bar and Random Text at the Bottom */}
      <div className="fixed bottom-4 w-full flex flex-col items-center space-y-4">
        <div className="flex items-center bg-gray-300 w-3/4 h-10 rounded-full">
          <div
            className="bg-blue-400 h-10 rounded-full transition-all duration-1000"
            style={{ width: `${(timer % 600) / 6}%` }} // Animate the progress bar based on time
          />
        </div>
        <p className="text-xl font-semibold text-gray-700">{randomText}</p>
      </div>

      <button className="absolute bottom-4 right-6 bg-gray-700 text-white p-3 rounded-full shadow-md hover:bg-gray-900 transition duration-300"
>
  <FaFileAlt size={24} />
</button>

    </Dashboard>
  );
};

export default Assignment;
