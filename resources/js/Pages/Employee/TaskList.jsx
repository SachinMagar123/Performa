import React from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

const TaskList = () => {

  return (

    <AuthenticatedLayout
    // header={
    //     <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
    //         TASKLIST
    //     </h2>
    // }
    >
         <div>
         <table class="min-w-full table-auto border-collapse border border-white text-white">
    <thead>
        <tr>
            <th class="border-b border-white py-2 px-4">Task Id</th>
            <th class="border-b border-white py-2 px-4">Task Description</th>
            <th class="border-b border-white py-2 px-4">Deadline</th>
            <th class="border-b border-white py-2 px-4">Status</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td class="border-b border-white py-2 px-4">1</td>
            <td class="border-b border-white py-2 px-4">Task 1</td>
            <td class="border-b border-white py-2 px-4">2021-12-31</td>
            <td class="border-b border-white py-2 px-4">Done</td>
        </tr>
        <tr>
            <td class="border-b border-white py-2 px-4">2</td>
            <td class="border-b border-white py-2 px-4">Task 1</td>
            <td class="border-b border-white py-2 px-4">2021-12-31</td>
            <td class="border-b border-white py-2 px-4">Done</td>
        </tr>
        <tr>
            <td class="border-b border-white py-2 px-4">3</td>
            <td class="border-b border-white py-2 px-4">Task 1</td>
            <td class="border-b border-white py-2 px-4">2021-12-31</td>
            <td class="border-b border-white py-2 px-4">Done</td>
        </tr>
    </tbody>
</table>

    </div>

    </AuthenticatedLayout>
   
  )
}

export default TaskList
