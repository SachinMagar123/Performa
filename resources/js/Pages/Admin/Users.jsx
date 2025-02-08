import { Inertia } from '@inertiajs/inertia';
import { usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

const Users = () => {
    const { users } = usePage().props;

    const handleViewTasks = (userId) => {
        Inertia.get(route('admin.user-tasks', { userId }), {}, {
            onSuccess: (page) => {
                console.log(page.props.tasks); // Log tasks for debugging
            }
        });
    };

    return (
        <AuthenticatedLayout>
            <table className="min-w-full table-auto border-collapse border border-white text-white">
                <thead>
                    <tr>
                        <th className="border-b border-white py-2 px-4">User Name</th>
                        <th className="border-b border-white py-2 px-4">Email</th>
                        <th className="border-b border-white py-2 px-4">Tasks</th>
                    </tr>
                </thead>
                <tbody>
                    {users.length > 0 ? (
                        users.map((user) => (
                            <tr key={user.id}>
                                <td className="border-b border-white py-2 px-4">{user.name}</td>
                                <td className="border-b border-white py-2 px-4">{user.email}</td>
                                <td className="border-b border-white py-2 px-4">
                                    <button
                                        onClick={() => handleViewTasks(user.id)} // Pass user.id
                                        className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-700 transition"
                                    >
                                        View Tasks
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="3" className="text-center py-2">No users found</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </AuthenticatedLayout>
    );
};

export default Users;
