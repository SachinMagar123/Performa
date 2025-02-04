import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Dashboard({children}) {
    return (
        <AuthenticatedLayout
            // header={
            //     <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
            //         Dashboard
            //     </h2>
//}
        >
            {/* <Head title="Dashboard" /> */}
            <div className="flex ">

                {/* sidebar */}
                <nav className='flex flex-col h-screen w-64 p-4 bg-white ' >
                    <ul>
                        <li className='mb-4'>
                            <Link href={route('employee.add-task')}> Add Task
                            </Link>
                        </li>
                    </ul>
                </nav>
                
                {/* main content */}
                <div className='flex-1 p-8'>
                    <div className='flex-1'>{children}</div>
                
            <div className="p-4 bg-light rounded shadow-sm w-100 w-sm-50 w-md-25 w-lg-20 h-auto">
                <h3 className="mb-2">Important notes</h3>
                <textarea className="w-100 h-100 p-2 border rounded" 
                // value={note}
                placeholder="Write your notes...."/>
            </div>
            </div>
            </div>
        </AuthenticatedLayout>
    );
}
