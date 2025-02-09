import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { ArrowLeft } from "lucide-react";

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;

    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
            <nav
                className="fixed top-0 left-0 w-full z-50 border-b border-gray-100 dark:border-gray-700 dark:bg-gray-800"
                style={{ backgroundColor: '#FBF5DD' }}  // Updated navbar color
            >
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 justify-between">
                        <div className="flex">
                            <div className=" flex shrink-0 items-center">
                            <Link href="/" className="flex items-center">
    <svg
        height="40px"
        width="40px"
        version="1.1"
        id="Capa_1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 22.613 22.613"
        xmlSpace="preserve"
        fill="#000000"
        stroke="#000000"
    >
        <g id="SVGRepo_iconCarrier">
            <g>
                <g>
                    <path
                        style={{ fill: "#f57600" }}
                        d="M11.988,5.382c-1.969,0-3.559,1.815-3.559,4.057s1.59,4.058,3.559,4.058 c1.968,0,3.562-1.816,3.562-4.058S13.956,5.382,11.988,5.382z"
                    ></path>
                    <path
                        style={{ fill: "#f57600" }}
                        d="M20.715,0.001H1.9c-1.05,0-1.9,0.85-1.9,1.898v18.815c0,1.051,0.85,1.898,1.9,1.898h18.814 c1.049,0,1.899-0.848,1.899-1.898V1.899C22.614,0.851,21.764,0.001,20.715,0.001z M11.988,14.839 c-1.459,0-2.761-0.757-3.621-1.946v5.627H7.063V4.273h1.304v1.828c0.86-1.188,2.162-1.946,3.621-1.946 c2.588,0,4.691,2.392,4.691,5.343C16.68,12.447,14.577,14.839,11.988,14.839z"
                    ></path>
                </g>
            </g>
        </g>
    </svg>
    <span style={{ fontFamily: "'Roboto', sans-serif", fontWeight: '700' }} className=" ml-2">PERFORMA</span>
</Link>


                            </div>

                            {/* admin-nav */}

                            {user.role == 'admin' && (
                                <>
                                {/* <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                                  <NavLink>
                                    <Link href={route('admin.dashboard')}>Admin Dashboard</Link>
                                  </NavLink>

                                    </div>     */}

                                    <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                                  <NavLink>
                                    <Link href={route('admin.user-list')}>Users</Link>
                                  </NavLink>
                                    </div>    
                             {/* </div>     */}

                                </>
                            )}
                            {/* employee-nav */}

                            {user.role == 'employee' && (
                                <>
                                  <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                                   <NavLink
                                  href={route('dashboard')}
                                      active={route().current('dashboard')}
                                   >
                                          HOME
                                        </NavLink>
                                        </div>

                                   <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                                   <NavLink
                                    href={route('employee.task-list')}
                                      active={route().current('employee.task-list')}
                                   >
                                    TASKLIST
                                    </NavLink>
                                      </div>
                                </>
                            )}
                        


                        </div>
                   

                        <div className="hidden sm:ms-6 sm:flex sm:items-center">
                            <div className="relative ms-3">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md">
                                            <button
                                                type="button"
                                                className="inline-flex items-center rounded-md border border-transparent bg-white px-3 py-2 text-sm font-medium leading-4 text-gray-500 transition duration-150 ease-in-out hover:text-gray-700 focus:outline-none dark:bg-gray-800 dark:text-gray-400 dark:hover:text-gray-300"
                                            >
                                               {/* Updated Font Style */}
                                               <span style={{ fontFamily: "'Roboto', sans-serif", fontWeight: '700', color: '#FBF5DD' }} className="fw-bold"
                                                >
                                                     Hi, {user.name} !
                                                                </span>


                                                <svg
                                                    className="-me-0.5 ms-2 h-4 w-4"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </button>
                                        </span>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content>
                                        <Dropdown.Link
                                            href={route('profile.edit')}
                                        >
                                            Profile
                                        </Dropdown.Link>
                                        <Dropdown.Link
                                            href={route('logout')}
                                            method="post"
                                            as="button"
                                        >
                                            Log Out
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>

                        <div className="-me-2 flex items-center sm:hidden">
                            <button
                                onClick={() =>
                                    setShowingNavigationDropdown(
                                        (previousState) => !previousState,
                                    )
                                }
                                className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 transition duration-150 ease-in-out hover:bg-gray-100 hover:text-gray-500 focus:bg-gray-100 focus:text-gray-500 focus:outline-none dark:text-gray-500 dark:hover:bg-gray-900 dark:hover:text-gray-400 dark:focus:bg-gray-900 dark:focus:text-gray-400"
                            >
                                <svg
                                    className="h-6 w-6"
                                    stroke="currentColor"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        className={
                                            !showingNavigationDropdown
                                                ? 'inline-flex'
                                                : 'hidden'
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        className={
                                            showingNavigationDropdown
                                                ? 'inline-flex'
                                                : 'hidden'
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <div
                    className={
                        (showingNavigationDropdown ? 'block' : 'hidden') +
                        ' sm:hidden'
                    }
                >
                    <div className="space-y-1 pb-3 pt-2">
                        <ResponsiveNavLink
                            href={route('dashboard')}
                            active={route().current('dashboard')}
                        >
                            Dashboard
                        </ResponsiveNavLink>
                    </div>

                    <div className="border-t border-gray-200 pb-1 pt-4 dark:border-gray-600">
                        <div className="px-4">
                            <div className="text-base font-medium text-gray-800 dark:text-gray-200">
                               {user.name}
                            </div>
                            <div className="text-sm font-medium text-gray-500">
                                {user.email}
                            </div>
                        </div>

                        <div className="mt-3 space-y-1">
                            <ResponsiveNavLink href={route('profile.edit')}>
                                Profile
                            </ResponsiveNavLink>
                            <ResponsiveNavLink
                                method="post"
                                href={route('logout')}
                                as="button"
                            >
                                Log Out
                            </ResponsiveNavLink>
                        </div>
                    </div>
                </div>
            </nav>

<main className="flex flex-col min-h-screen relative">
    {children}

    {/* Back Button */}
  {route().current() !== 'employee.report' && (
    <div className="absolute bottom-24 left-28">
        <button
            onClick={() => window.history.back()}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
        >
            <ArrowLeft size ={20}/>
        </button>
    </div>
)}
</main>

        </div>
    );
}
