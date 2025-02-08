import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { FaRegComments, FaPenSquare, FaGoogle, FaCalendarAlt, FaGoogleDrive, FaBars, FaPlus } from 'react-icons/fa';
import { MdSpeakerNotes } from "react-icons/md";
import { useState, useEffect } from 'react';
import './Dashboard.css';

export default function Dashboard({ children }) {
    const [isSliderOpen, setSliderOpen] = useState(false);
    const [notes1, setNotes1] = useState("");
    const [notes2, setNotes2] = useState("");

    useEffect(() => {
        const savedNotes1 = localStorage.getItem('notes1');
        const savedNotes2 = localStorage.getItem('notes2');

        if (savedNotes1) setNotes1(savedNotes1);
        if (savedNotes2) setNotes2(savedNotes2);
    }, []);

    const toggleSlider = () => setSliderOpen(!isSliderOpen);

    const handleNotesChange1 = (e) => {
        const newNotes = e.target.value;
        setNotes1(newNotes);
        localStorage.setItem('notes1', newNotes);
    };

    const handleNotesChange2 = (e) => {
        const newNotes = e.target.value;
        setNotes2(newNotes);
        localStorage.setItem('notes2', newNotes);
    };

    const handleKeyDown1 = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const updatedNotes = notes1 + "\n🟠 ";
            setNotes1(updatedNotes);
            localStorage.setItem('notes1', updatedNotes);
        }
    };

    const handleKeyDown2 = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const updatedNotes = notes2 + "\n🟠 ";
            setNotes2(updatedNotes);
            localStorage.setItem('notes2', updatedNotes);
        }
    };

    return (
        <AuthenticatedLayout>
            <div className="flex h-screen relative">
                <div className={`transition-transform transform ${isSliderOpen ? 'translate-x-0' : '-translate-x-full'} 
                    fixed top-0 left-0 h-screen w-20 lg:w-24 p-4 bg-white rounded-r-2xl shadow-lg flex flex-col justify-evenly items-center z-20`}
                >
                    <button 
                        onClick={toggleSlider} 
                        className="absolute top-5 right-[-45px] w-10 h-10 bg-blue-600 text-white rounded-full flex justify-center items-center transition-transform"
                    >
                        <FaBars size={20} />
                    </button>

                    <ul className="space-y-6 mt-10">
                        <li>
                            <a href="https://chat.openai.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-600">
                                <FaRegComments size={24} />
                            </a>
                        </li>
                        <li>
                            <a href="https://www.grammarly.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-600">
                                <FaPenSquare size={24} />
                            </a>
                        </li>
                        <li>
                            <a href="https://docs.google.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-600">
                                <FaGoogle size={24} />
                            </a>
                        </li>
                        <li>
                            <a href="https://calendar.google.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-600">
                                <FaCalendarAlt size={24} />
                            </a>
                        </li>
                        <li>
                            <a href="https://sheets.google.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-600">
                                <FaGoogleDrive size={24} />
                            </a>
                        </li>
                    </ul>

                    <div className="mb-10">
                        <Link 
                            href={route('employee.add-task')} 
                            className="bg-blue-600 text-white p-2 rounded-full flex items-center justify-center hover:bg-blue-700"
                            onClick={() => setSliderOpen(true)}
                        >
                            <FaPlus size={24} />
                        </Link>
                    </div>
                </div>

                <div className="flex-1 p-4 sm:p-8 flex flex-col sm:flex-row justify-between items-center sm:items-start">
                    <div>{children}</div>

                    {route().current() === 'dashboard' && (
                        <div className="flex justify-center items-center w-full h-full relative top-[-10%]">
                            <h5 className="text-gray-700 text-center font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
                                "Progress made visible"
                            </h5>
                        </div>
                    )}


                    {/* Hide textareas only in Assignment.jsx */}
                    {route().current() !== 'employee.assignment' && (
                        <div className="flex flex-col gap-4 items-end w-full sm:w-1/3 h-full relative top-[-30px]">
                            <div className="p-4 bg-light rounded shadow-sm w-full h-auto">
                                <h3 className="text-gray-400 mb-2 text-center flex items-center justify-center gap-2">
                                    <MdSpeakerNotes size={20} color='orange'/> 
                                </h3>
                                <textarea
                                    className="w-full p-2 border rounded"
                                    placeholder="Point your important notes..."
                                    rows="10"
                                    value={notes1}
                                    onChange={handleNotesChange1}
                                    onKeyDown={handleKeyDown1}
                                    style={{ resize: 'none', height: '250px' }} 
                                />
                            </div>
                            <div className="p-4 bg-light rounded shadow-sm w-full h-auto">
                                <textarea
                                    className="w-full p-2 border rounded"
                                    placeholder="Note to remember..."
                                    rows="10"
                                    value={notes2}
                                    onChange={handleNotesChange2}
                                    onKeyDown={handleKeyDown2}
                                    style={{ resize: 'none', height: '250px' }} 
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

