import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Clock, Trophy, Flame, TrendingUp, Play, Award, Target, Calendar } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { mockEnrollments, mockUserStats, mockAchievements } from '../../data/mockData';
import Button from '../ui/Button';

const Dashboard: React.FC = () => {
    const { user } = useAuth();
    const stats = mockUserStats;
    const enrollments = mockEnrollments;
    const recentAchievements = mockAchievements.slice(0, 3);

    // Calculate streak calendar (last 30 days)
    const generateStreakData = () => {
        const days = [];
        for (let i = 29; i >= 0; i--) {
            const date = new Date();
            date.setDate(date.getDate() - i);
            const isActive = i < stats.streak || (i >= 7 && i < 14) || (i >= 21 && i < 25);
            days.push({ date, active: isActive });
        }
        return days;
    };

    const streakData = generateStreakData();

    return (
        <div className="pt-32 pb-20 bg-gray-50 dark:bg-black min-h-screen transition-colors duration-500">
            <div className="container mx-auto px-6">

                {/* Welcome Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-12"
                >
                    <h1 className="text-5xl md:text-7xl font-black mb-4 text-black dark:text-white leading-tight tracking-tighter">
                        Welcome back,<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-piku-purple via-piku-cyan to-piku-lime">
                            {user?.name || 'Learner'}
                        </span>
                        <span className="text-piku-cyan">!</span>
                    </h1>
                    <p className="text-xl font-bold text-gray-600 dark:text-gray-400">
                        Ready to continue your learning journey?
                    </p>
                </motion.div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-12">
                    {[
                        { icon: Flame, label: 'Day Streak', value: stats.streak, color: 'bg-piku-lime', iconColor: 'text-black' },
                        { icon: BookOpen, label: 'Courses', value: enrollments.length, color: 'bg-piku-cyan', iconColor: 'text-black' },
                        { icon: Trophy, label: 'Points', value: stats.totalPoints, color: 'bg-piku-purple', iconColor: 'text-white' },
                        { icon: Clock, label: 'Hours', value: stats.hoursLearned, color: 'bg-black dark:bg-white', iconColor: 'text-white dark:text-black' },
                    ].map((stat, i) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.1 }}
                            className={`${stat.color} rounded-[2rem] p-6 border-4 border-black dark:border-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.3)] hover:translate-y-[-4px] transition-transform`}
                        >
                            <stat.icon className={`w-8 h-8 mb-3 ${stat.iconColor}`} strokeWidth={2.5} />
                            <div className={`text-4xl font-black mb-1 ${stat.iconColor}`}>{stat.value}</div>
                            <div className={`text-sm font-bold uppercase tracking-wider opacity-70 ${stat.iconColor}`}>{stat.label}</div>
                        </motion.div>
                    ))}
                </div>

                <div className="grid lg:grid-cols-3 gap-8">

                    {/* Main Content - Left Column */}
                    <div className="lg:col-span-2 space-y-8">

                        {/* Continue Learning */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-3xl md:text-4xl font-black text-black dark:text-white">Continue Learning</h2>
                                <Button variant="outline" size="sm" className="border-2 border-black dark:border-white">View All</Button>
                            </div>

                            <div className="space-y-4">
                                {enrollments.map((enrollment, i) => (
                                    <motion.div
                                        key={enrollment.id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.3 + i * 0.1 }}
                                        className="group bg-white dark:bg-zinc-900 rounded-[2rem] border-4 border-black dark:border-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[0px_0px_20px_rgba(255,255,255,0.2)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all overflow-hidden"
                                    >
                                        <div className="flex flex-col md:flex-row">
                                            {/* Thumbnail */}
                                            <div className="md:w-48 h-48 md:h-auto relative overflow-hidden border-b-4 md:border-b-0 md:border-r-4 border-black dark:border-white flex-shrink-0">
                                                <img
                                                    src={enrollment.course.thumbnail}
                                                    alt={enrollment.course.title}
                                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                                />
                                                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    <div className="w-16 h-16 bg-white dark:bg-black rounded-full flex items-center justify-center border-4 border-black dark:border-white group-hover:scale-110 transition-transform">
                                                        <Play className="w-8 h-8 text-black dark:text-white fill-black dark:fill-white ml-1" />
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Content */}
                                            <div className="flex-1 p-6 md:p-8">
                                                <div className="flex items-start justify-between mb-4">
                                                    <div>
                                                        <h3 className="text-2xl font-black text-black dark:text-white mb-2 group-hover:text-piku-purple dark:group-hover:text-piku-lime transition-colors">
                                                            {enrollment.course.title}
                                                        </h3>
                                                        <div className="flex items-center gap-3 text-sm font-bold text-gray-500 dark:text-gray-400">
                                                            <span className="flex items-center gap-1">
                                                                <BookOpen size={16} />
                                                                {enrollment.course.lessonsCount} lessons
                                                            </span>
                                                            <span className="flex items-center gap-1">
                                                                <Clock size={16} />
                                                                {enrollment.course.duration}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <span className="bg-piku-cyan text-black text-xs font-black uppercase px-3 py-1 rounded-md border-2 border-black">
                                                        {enrollment.course.level}
                                                    </span>
                                                </div>

                                                {/* Progress Bar */}
                                                <div className="mb-4">
                                                    <div className="flex items-center justify-between mb-2">
                                                        <span className="text-sm font-bold text-gray-500 dark:text-gray-400">Progress</span>
                                                        <span className="text-lg font-black text-black dark:text-white">{enrollment.progress}%</span>
                                                    </div>
                                                    <div className="h-3 bg-gray-200 dark:bg-zinc-800 rounded-full overflow-hidden border-2 border-black dark:border-white">
                                                        <motion.div
                                                            initial={{ width: 0 }}
                                                            animate={{ width: `${enrollment.progress}%` }}
                                                            transition={{ duration: 1, delay: 0.5 + i * 0.1 }}
                                                            className="h-full bg-gradient-to-r from-piku-purple to-piku-cyan"
                                                        />
                                                    </div>
                                                </div>

                                                <Button className="w-full md:w-auto border-2 border-black dark:border-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]">
                                                    Continue Course
                                                </Button>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Learning Streak Calendar */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="bg-white dark:bg-zinc-900 rounded-[2rem] p-8 border-4 border-black dark:border-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[0px_0px_20px_rgba(255,255,255,0.2)]"
                        >
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-2xl font-black text-black dark:text-white flex items-center gap-2">
                                    <Flame className="text-piku-lime" />
                                    {stats.streak} Day Streak
                                </h3>
                                <span className="text-sm font-bold text-gray-500 dark:text-gray-400">Last 30 days</span>
                            </div>

                            <div className="grid grid-cols-10 gap-2">
                                {streakData.map((day, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, scale: 0 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: 0.6 + i * 0.01 }}
                                        className={`aspect-square rounded-lg border-2 ${day.active
                                                ? 'bg-piku-lime border-black dark:border-white'
                                                : 'bg-gray-100 dark:bg-zinc-800 border-gray-300 dark:border-zinc-700'
                                            } hover:scale-110 transition-transform cursor-pointer`}
                                        title={day.date.toLocaleDateString()}
                                    />
                                ))}
                            </div>

                            <p className="mt-6 text-sm font-bold text-gray-600 dark:text-gray-400 text-center">
                                Keep it up! You're on a roll 🔥
                            </p>
                        </motion.div>
                    </div>

                    {/* Sidebar - Right Column */}
                    <div className="space-y-8">

                        {/* Level Progress */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 }}
                            className="bg-gradient-to-br from-piku-purple to-piku-cyan rounded-[2rem] p-8 border-4 border-black dark:border-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.3)] text-white"
                        >
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-2xl font-black">Level {stats.level}</h3>
                                <TrendingUp className="w-8 h-8" />
                            </div>

                            <div className="relative w-32 h-32 mx-auto mb-6">
                                <svg className="w-full h-full transform -rotate-90">
                                    <circle
                                        cx="64"
                                        cy="64"
                                        r="56"
                                        stroke="rgba(255,255,255,0.2)"
                                        strokeWidth="12"
                                        fill="none"
                                    />
                                    <circle
                                        cx="64"
                                        cy="64"
                                        r="56"
                                        stroke="white"
                                        strokeWidth="12"
                                        fill="none"
                                        strokeDasharray={`${2 * Math.PI * 56}`}
                                        strokeDashoffset={`${2 * Math.PI * 56 * (1 - stats.totalPoints % 100 / 100)}`}
                                        strokeLinecap="round"
                                    />
                                </svg>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="text-center">
                                        <div className="text-3xl font-black">{stats.totalPoints % 100}</div>
                                        <div className="text-xs font-bold opacity-80">/ 100 XP</div>
                                    </div>
                                </div>
                            </div>

                            <p className="text-center font-bold text-sm opacity-90">
                                {100 - (stats.totalPoints % 100)} XP to Level {stats.level + 1}
                            </p>
                        </motion.div>

                        {/* Recent Achievements */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 }}
                            className="bg-white dark:bg-zinc-900 rounded-[2rem] p-8 border-4 border-black dark:border-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[0px_0px_20px_rgba(255,255,255,0.2)]"
                        >
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-2xl font-black text-black dark:text-white flex items-center gap-2">
                                    <Award className="text-piku-purple" />
                                    Achievements
                                </h3>
                            </div>

                            <div className="space-y-4">
                                {recentAchievements.map((achievement, i) => (
                                    <motion.div
                                        key={achievement.id}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.5 + i * 0.1 }}
                                        className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-zinc-800 rounded-xl border-2 border-black/10 dark:border-white/10 hover:border-piku-purple dark:hover:border-piku-lime transition-colors"
                                    >
                                        <div className="text-4xl">{achievement.icon}</div>
                                        <div className="flex-1">
                                            <h4 className="font-black text-black dark:text-white">{achievement.name}</h4>
                                            <p className="text-xs font-bold text-gray-500 dark:text-gray-400">{achievement.description}</p>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-lg font-black text-piku-purple">+{achievement.points}</div>
                                            <div className="text-xs font-bold text-gray-400">XP</div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            <Button variant="outline" className="w-full mt-6 border-2 border-black dark:border-white">
                                View All Achievements
                            </Button>
                        </motion.div>

                        {/* Weekly Goal */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5 }}
                            className="bg-piku-lime rounded-[2rem] p-8 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <Target className="w-8 h-8 text-black" />
                                <h3 className="text-2xl font-black text-black">Weekly Goal</h3>
                            </div>
                            <p className="text-black font-bold mb-4">Complete 5 hours of learning</p>
                            <div className="h-3 bg-black/20 rounded-full overflow-hidden border-2 border-black mb-2">
                                <div className="h-full bg-black" style={{ width: '60%' }} />
                            </div>
                            <p className="text-sm font-bold text-black/70">3 / 5 hours completed</p>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
