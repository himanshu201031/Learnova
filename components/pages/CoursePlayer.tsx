import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, CheckCircle, Lock, Menu, X, ChevronLeft, ChevronRight, FileText, MessageSquare, Download, Share2 } from 'lucide-react';
import Button from '../ui/Button';
import { mockCourses } from '../../data/mockData';

// Mock lesson data for the player
const mockLessons = [
    { id: '1', title: 'Introduction to the Course', duration: '5:20', completed: true, type: 'video' },
    { id: '2', title: 'Setting Up Your Environment', duration: '12:45', completed: true, type: 'video' },
    { id: '3', title: 'Understanding React Components', duration: '18:30', completed: false, type: 'video' },
    { id: '4', title: 'State and Props Deep Dive', duration: '22:15', completed: false, type: 'video' },
    { id: '5', title: 'Project: Building a Todo List', duration: '45:00', completed: false, type: 'project' },
    { id: '6', title: 'Handling Events in React', duration: '15:10', completed: false, type: 'video' },
    { id: '7', title: 'Advanced Hooks Pattern', duration: '28:40', completed: false, type: 'video', locked: true },
    { id: '8', title: 'Final Project Kickoff', duration: '10:00', completed: false, type: 'video', locked: true },
];

const CoursePlayer: React.FC<{ onNavigate?: (page: string) => void }> = ({ onNavigate }) => {
    const [activeLesson, setActiveLesson] = useState(mockLessons[2]);
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [activeTab, setActiveTab] = useState<'overview' | 'resources' | 'discussion'>('overview');

    return (
        <div className="pt-20 min-h-screen bg-gray-50 dark:bg-black text-black dark:text-white transition-colors duration-500 flex flex-col h-screen overflow-hidden">

            {/* Top Bar Navigation */}
            <div className="bg-white dark:bg-zinc-900 border-b border-gray-200 dark:border-zinc-800 px-6 py-4 flex items-center justify-between z-20 shadow-sm">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => onNavigate && onNavigate('dashboard')}
                        className="w-10 h-10 rounded-full bg-gray-100 dark:bg-zinc-800 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-zinc-700 transition-colors"
                    >
                        <ChevronLeft size={20} />
                    </button>
                    <div>
                        <h1 className="text-lg font-bold truncate max-w-md hidden md:block">Complete Web Development Bootcamp 2024</h1>
                        <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Chapter 2, Lesson 3</p>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-zinc-800 rounded-full">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                        <span className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">Progress: 25%</span>
                    </div>
                    <Button variant="outline" size="sm" className="hidden md:flex gap-2 border-black dark:border-white">
                        <Share2 size={16} /> Share
                    </Button>
                    <button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="md:hidden w-10 h-10 rounded-lg border-2 border-black dark:border-white flex items-center justify-center"
                    >
                        {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>
            </div>

            <div className="flex flex-1 overflow-hidden relative">

                {/* Main Content Area */}
                <div className="flex-1 flex flex-col overflow-y-auto bg-gray-100 dark:bg-black relative">

                    {/* Video Player Container */}
                    <div className="w-full bg-black aspect-video relative group">
                        <div className="absolute inset-0 flex items-center justify-center">
                            {/* Mock Video Placeholder */}
                            <div className="text-center">
                                <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-full border-4 border-white flex items-center justify-center mx-auto mb-4 cursor-pointer hover:scale-110 transition-transform shadow-[0_0_40px_rgba(255,255,255,0.3)]">
                                    <Play size={40} className="ml-2 text-white fill-white" />
                                </div>
                                <p className="text-white font-bold text-lg drop-shadow-md">Click to Play Lesson</p>
                            </div>
                        </div>

                        {/* Custom Fake Controls */}
                        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                            <div className="h-1.5 bg-white/30 rounded-full mb-4 cursor-pointer overflow-hidden">
                                <div className="h-full bg-piku-lime w-1/3"></div>
                            </div>
                            <div className="flex items-center justify-between text-white">
                                <div className="flex items-center gap-4">
                                    <Play size={20} className="fill-white" />
                                    <span className="text-xs font-mono font-bold">05:20 / 18:30</span>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className="text-xs font-bold border border-white/50 px-2 py-1 rounded cursor-pointer">1x</span>
                                    <span className="text-xs font-bold border border-white/50 px-2 py-1 rounded cursor-pointer">HD</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Lesson Details & Resources Tabs */}
                    <div className="flex-1 p-6 md:p-10 max-w-5xl mx-auto w-full">
                        <div className="flex border-b-2 border-gray-200 dark:border-zinc-800 mb-8 overflow-x-auto">
                            {[
                                { id: 'overview', label: 'Overview', icon: FileText },
                                { id: 'resources', label: 'Resources', icon: Download },
                                { id: 'discussion', label: 'Discussion', icon: MessageSquare },
                            ].map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id as any)}
                                    className={`flex items-center gap-2 px-6 py-4 font-bold text-sm uppercase tracking-wider border-b-4 transition-colors whitespace-nowrap ${activeTab === tab.id
                                        ? 'border-piku-purple text-piku-purple dark:text-piku-purple'
                                        : 'border-transparent text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white'
                                        }`}
                                >
                                    <tab.icon size={18} />
                                    {tab.label}
                                </button>
                            ))}
                        </div>

                        <div className="min-h-[300px]">
                            {activeTab === 'overview' && (
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                    <h2 className="text-3xl font-black mb-4">{activeLesson.title}</h2>
                                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6 text-lg">
                                        In this comprehensive lesson, we'll dive deep into the core concepts of React components. You'll learn how to structure your application effectively, manage component state, and pass data using props. By the end of this video, you'll be able to build reusable UI elements that scale.
                                    </p>

                                    <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border-4 border-black dark:border-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.2)] mb-8">
                                        <h3 className="font-bold uppercase tracking-wider mb-4 border-b-2 border-gray-100 dark:border-zinc-800 pb-2">Learning Objectives</h3>
                                        <ul className="space-y-3">
                                            {['Understand Function vs Class Components', 'Master the component lifecycle', 'Learn about Props drilling and solutions', 'Introduction to Hooks'].map((item, i) => (
                                                <li key={i} className="flex items-center gap-3">
                                                    <CheckCircle size={20} className="text-piku-lime" />
                                                    <span className="font-medium">{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </motion.div>
                            )}

                            {activeTab === 'resources' && (
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                    <h2 className="text-2xl font-black mb-6">Lesson Resources</h2>
                                    <div className="grid md:grid-cols-2 gap-4">
                                        {[
                                            { name: 'Source Code - Starter', size: '2.4 MB', type: 'ZIP' },
                                            { name: 'Source Code - Final', size: '3.1 MB', type: 'ZIP' },
                                            { name: 'React Cheatsheet PDF', size: '1.2 MB', type: 'PDF' },
                                            { name: 'Component Diagram', size: '450 KB', type: 'PNG' },
                                        ].map((file, i) => (
                                            <div key={i} className="flex items-center justify-between p-4 bg-white dark:bg-zinc-900 rounded-xl border-2 border-black dark:border-white hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-12 h-12 bg-gray-100 dark:bg-zinc-800 rounded-lg flex items-center justify-center font-black text-xs">
                                                        {file.type}
                                                    </div>
                                                    <div>
                                                        <p className="font-bold">{file.name}</p>
                                                        <p className="text-xs text-gray-500">{file.size}</p>
                                                    </div>
                                                </div>
                                                <button className="text-piku-purple hover:underline font-bold text-sm">Download</button>
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>
                            )}

                            {activeTab === 'discussion' && (
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                    <div className="flex items-center justify-between mb-8">
                                        <h2 className="text-2xl font-black">Discussion (24)</h2>
                                        <Button size="sm">New Post</Button>
                                    </div>

                                    <div className="space-y-6">
                                        {[
                                            { user: 'Alex M.', time: '2 hours ago', text: 'Does this apply to React 18 strict mode as well?' },
                                            { user: 'Sarah J.', time: '5 hours ago', text: 'The explanation about props drilling was super helpful! Finally clicked for me.' },
                                        ].map((comment, i) => (
                                            <div key={i} className="flex gap-4">
                                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-piku-cyan to-blue-500 flex-shrink-0" />
                                                <div>
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <span className="font-bold">{comment.user}</span>
                                                        <span className="text-xs text-gray-500">{comment.time}</span>
                                                    </div>
                                                    <p className="text-gray-700 dark:text-gray-300">{comment.text}</p>
                                                    <button className="text-xs font-bold text-gray-400 mt-2 hover:text-black">Reply</button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Sidebar Navigation */}
                <AnimatePresence>
                    {sidebarOpen && (
                        <motion.div
                            initial={{ width: 0, opacity: 0 }}
                            animate={{ width: 320, opacity: 1 }}
                            exit={{ width: 0, opacity: 0 }}
                            className="bg-white dark:bg-zinc-900 border-l border-gray-200 dark:border-zinc-800 flex flex-col shadow-2xl z-10 absolute md:relative h-full right-0"
                        >
                            <div className="p-6 border-b border-gray-200 dark:border-zinc-800 flex justify-between items-center">
                                <h3 className="font-black text-lg">Course Content</h3>
                                <button onClick={() => setSidebarOpen(false)} className="md:hidden">
                                    <X size={20} />
                                </button>
                            </div>

                            <div className="flex-1 overflow-y-auto">
                                <div className="p-4 space-y-2">
                                    {mockLessons.map((lesson, index) => (
                                        <div
                                            key={lesson.id}
                                            onClick={() => !lesson.locked && setActiveLesson(lesson)}
                                            className={`group flex items-start gap-4 p-4 rounded-xl transition-all cursor-pointer ${activeLesson.id === lesson.id
                                                ? 'bg-black text-white dark:bg-white dark:text-black shadow-lg'
                                                : lesson.locked
                                                    ? 'opacity-50 cursor-not-allowed'
                                                    : 'hover:bg-gray-100 dark:hover:bg-zinc-800'
                                                }`}
                                        >
                                            <div className="mt-1">
                                                {lesson.locked ? (
                                                    <Lock size={16} />
                                                ) : lesson.completed ? (
                                                    <CheckCircle size={16} className="text-piku-lime" />
                                                ) : (
                                                    <div className={`w-4 h-4 rounded-full border-2 ${activeLesson.id === lesson.id ? 'border-white dark:border-black' : 'border-gray-400'}`} />
                                                )}
                                            </div>
                                            <div>
                                                <p className={`text-sm font-bold mb-1 ${activeLesson.id === lesson.id ? 'text-white dark:text-black' : 'text-gray-700 dark:text-gray-200'}`}>
                                                    {index + 1}. {lesson.title}
                                                </p>
                                                <p className={`text-xs ${activeLesson.id === lesson.id ? 'text-white/60 dark:text-black/60' : 'text-gray-400'}`}>
                                                    {lesson.duration}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="p-6 border-t border-gray-200 dark:border-zinc-800 bg-gray-50 dark:bg-black/20">
                                <div className="mb-2 flex justify-between text-xs font-bold text-gray-500">
                                    <span>Your Progress</span>
                                    <span>25%</span>
                                </div>
                                <div className="h-2 bg-gray-200 dark:bg-zinc-700 rounded-full overflow-hidden">
                                    <div className="h-full bg-piku-lime w-1/4"></div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default CoursePlayer;
