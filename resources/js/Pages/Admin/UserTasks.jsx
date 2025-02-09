import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { usePage } from '@inertiajs/react';

const UserTasks = () => {
    const { tasks, user_id } = usePage().props;

    return (
        <AuthenticatedLayout>
            <div className="py-6 px-8">
                <h2 className="text-2xl font-bold text-white mb-4">
                    Tasks for User ID: {user_id}
                </h2>

                <table className="min-w-full table-auto border-collapse border border-white text-white">
                    <thead>
                        <tr>
                            <th className="border-b border-white py-2 px-4">Task Name</th>
                            <th className="border-b border-white py-2 px-4">Priority</th>
                            <th className="border-b border-white py-2 px-4">Deadline</th>
                            <th className="border-b border-white py-2 px-4">Report</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tasks.length > 0 ? (
                            tasks.map((task) => (
                                <tr key={task.id}>
                                    <td className="border-b border-white py-2 px-4">{task.task_name}</td>
                                    <td className="border-b border-white py-2 px-4">{task.priority_level}</td>
                                    <td className="border-b border-white py-2 px-4">{task.deadline}</td>
                                    <td className="border-b border-white py-2 px-4">
                                        <a
                                            href={route('admin.task-report', { taskId: task.id })}
                                            className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-700 transition"
                                        >
                                            View Report
                                        </a>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="text-center py-2">No tasks found for this user.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </AuthenticatedLayout>
    );
};

export default UserTasks;
