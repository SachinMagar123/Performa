import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import React from 'react'

const AdminDashboard = () => {
  return (
    <AuthenticatedLayout>

    <div>

   <div className="py-12">
    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
            <div className="p-6 text-gray-900 dark:text-gray-100">
                You're logged in! hello admin .
            </div>
        </div>
    </div>
</div>
    </div>
    </AuthenticatedLayout>
  )
}

export default AdminDashboard
