import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Dashboard({ children }) {
    return (
        <AuthenticatedLayout>
            <div className="flex flex-col sm:flex-row h-screen">

                {/* Sidebar */}
                {/* <div className="flex justify-start items-center h-screen">
  <nav className="flex flex-col h-full w-32 sm:w-48 p-2 bg-white rounded-2xl shadow-lg justify-center items-center">
      <ul>
          <li className="mb-3 text-center">
              <Link href={route('employee.add-task')}> Add Task </Link>
          </li>
      </ul>
  </nav>
                </div> */}
<div className="flex justify-start items-center h-screen">
  <nav className="flex flex-col h-full w-32 sm:w-48 lg:w-64 p-2 bg-white rounded-2xl shadow-lg justify-center items-center">
      <ul>
          <li className="mb-3 text-center">
              <Link href={route('employee.add-task')}> Add Task </Link>
          </li>
      </ul>
  </nav>
</div>

      

                {/* Main Content */}
                <div className="flex-1 p-4 sm:p-8 flex flex-col sm:flex-row justify-between items-center sm:items-start">
                    <div>{children}</div>
                    
                    {/* Centered Heading */}
                   <div className="flex justify-center items-center w-full h-full relative top-[-10%]">
            <h5 className="text-gray-700 text-center font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
                             "Progress made visible"
            </h5>
                    </div>


                    {/* Textarea */}
                    <div className="flex justify-center items-center w-full sm:w-1/3 h-full">
                        <div className="p-4 bg-light rounded shadow-sm w-full h-auto">
                            <h3 className="text-gray-400 mb-2 text-center">Important notes</h3>
                            <textarea
                                className="w-full p-2 border rounded"
                                placeholder="Write your notes..."
                                rows="10"
                            />
                        </div>
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}

