import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import Dashboard from '../Dashboard';

const AddTask = ({ setIsFormVisible }) => {
  const [form, setForm] = useState({
    task_name: '',
    task_type: '',
    deadline: '',
    priority_level: '',
  });

  const [isFormVisible, setIsFormVisibleState] = useState(true);

  // Handle input change
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleFormSubmit = (e) => {
    e.preventDefault();
    Inertia.post(route('employee.store-task'), form, {
      onSuccess: () => {
        setIsFormVisible(false); // Hide sidebar after task creation
      },
    });
  };

  return (
    <Dashboard setIsFormVisible={setIsFormVisible} isFormVisible={isFormVisible}>
      <div className="flex justify-start items-start pt-16 p-4">
        {isFormVisible && (
          <form onSubmit={handleFormSubmit} className="bg-white p-8 rounded-lg shadow-xl w-full max-w-xl ml-96">
            <h2 className="text-3xl font-semibold text-center text-orange-600 mb-8">Create Task</h2>
            
            <div className="mb-6">
              <input
                name="task_name"
                type="text"
                placeholder="Task Name"
                value={form.task_name}
                onChange={handleChange}
                required
                className="w-full px-5 py-3 text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
              />
            </div>

            <div className="mb-6">
              <input
                name="task_type"
                type="text"
                placeholder="Task Type"
                value={form.task_type}
                onChange={handleChange}
                required
                className="w-full px-5 py-3 text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
              />
            </div>

            <div className="mb-6">
              <input
                name="deadline"
                type="date"
                placeholder="Deadline"
                value={form.deadline}
                onChange={handleChange}
                required
                className="w-full px-5 py-3 text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
              />
            </div>

            <div className="mb-6">
              <select
                name="Priority_level"
                value={form.Priority_level}
                onChange={handleChange}
                required
                className="w-full px-5 py-3 text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
              >
                <option value="">Select Priority Level</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>

            <button type="submit" className="w-full bg-orange-500 text-white py-3 rounded-md hover:bg-orange-600 transition-all duration-200 ease-in-out">
              Create Task
            </button>
          </form>
        )}
      </div>
    </Dashboard>
  );
};

export default AddTask;
