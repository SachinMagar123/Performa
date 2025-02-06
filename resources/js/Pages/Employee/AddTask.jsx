import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import Dashboard from '../Dashboard';

const AddTask = () => {
  const [form, setForm] = useState({
    task_name: '',
    task_type: '',
    deadline: '',
    Priority_level: ''
  });

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
        Inertia.visit(route('Assignment.jsx'));
      }
    });
  };

  return (
    <Dashboard>
      <div className='flex-1 p-8 bg-slate-500'>
        <form onSubmit={handleFormSubmit}>
          <input
            name='task_name'
            type="text"
            placeholder="Task Name"
            value={form.task_name}
            onChange={handleChange}
            required
          />

          <input
            name='task_type'
            type="text"
            placeholder="Task Type"
            value={form.task_type}
            onChange={handleChange}
            required
          />

          <input
            name='deadline'
            type="date"
            placeholder="Deadline"
            value={form.deadline}
            onChange={handleChange}
            required
          />

          <select
            name="Priority_level"
            value={form.priority_level}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded-md"
          >
            <option value="">Select Priority Level</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>

          <button type="submit">Create Task</button>
        </form>
      </div>
    </Dashboard>
  );
};

export default AddTask;
