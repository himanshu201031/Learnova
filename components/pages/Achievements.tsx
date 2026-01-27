import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Star, Award, Zap, Target, Crown, Flame, BookOpen } from 'lucide-react';
import { mockAchievements, mockUserStats } from '../../data/mockData';

const Achievements: React.FC = () => {
    const userAchievements = mockAchievements.slice(0, 3); // Earned achievements
    const lockedAchievements = mockAchievements.slice(3); // Locked achievements

    const rarityColors = {
        common: 'bg-gray-400 border-gray-600',
        rare: 'bg-blue-500 border-blue-700',
        epic: 'bg-purple-500 border-purple-700',
        legendary: 'bg-yellow-400 border-yellow-600',
    };

    const rarityGlow = {
        common: 'shadow-[0_0_20px_rgba(156,163,175,0.5)]',
        rare: 'shadow-[0_0_30px_rgba(59,130,246,0.6)]',
        epic: 'shadow-[0_0_40px_rgba(168,85,247,0.7)]',
        legendary: 'shadow-[0_0_50px_rgba(250,204,21,0.8)]',
    };

    return (
        <div className="pt-32 pb-20 bg-gray-50 dark:bg-black min-h-screen transition-colors duration-500">
            <div className="container mx-auto px-6">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-12"
                >
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-16 h-16 bg-piku-purple rounded-2xl border-4 border-black dark:border-white flex items-center justify-center shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.3)]">
                            <Trophy className="w-8 h-8 text-white" />
                        </div>
                        <div>
                            <h1 className="text-5xl md:text-7xl font-black text-black dark:text-white leading-tight tracking-tighter">
                                Achievements
                            </h1>
                            <p className="text-xl font-bold text-gray-600 dark:text-gray-400">
                                {userAchievements.length} of {mockAchievements.length} unlocked
                            </p>
                        </div>
                    </div>
                </motion.div>

                {/* Stats Overview */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
                    {[
                        { icon: Star, label: 'Total Points', value: mockUserStats.totalPoints, color: 'bg-piku-cyan' },
                        { icon: Crown, label: 'Level', value: mockUserStats.level, color: 'bg-piku-purple' },
                        { icon: Trophy, label: 'Achievements', value: userAchievements.length, color: 'bg-piku-lime' },
                        { icon: Target, label: 'Completion', value: `${Math.round((userAchievements.length / mockAchievements.length) * 100)}%`, color: 'bg-black dark:bg-white' },
                    ].map((stat, i) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.1 }}
                            className={`${stat.color} rounded-2xl p-6 border-4 border-black dark:border-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,0.3)]`}
                        >
                            <stat.icon className={`w-6 h-6 mb-2 ${stat.color === 'bg-black dark:bg-white' ? 'text-white dark:text-black' : 'text-black'}`} />
                            <div className={`text-3xl font-black mb-1 ${stat.color === 'bg-black dark:bg-white' ? 'text-white dark:text-black' : 'text-black'}`}>
                                {stat.value}
                            </div>
                            <div className={`text-xs font-bold uppercase ${stat.color === 'bg-black dark:bg-white' ? 'text-white/70 dark:text-black/70' : 'text-black/70'}`}>
                                {stat.label}
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Unlocked Achievements */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mb-12"
                >
                    <h2 className="text-3xl font-black text-black dark:text-white mb-6 flex items-center gap-3">
                        <Zap className="text-piku-lime" />
                        Unlocked Achievements
                    </h2>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {userAchievements.map((achievement, i) => (
                            <motion.div
                                key={achievement.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 + i * 0.1 }}
                                className={`group relative bg-white dark:bg-zinc-900 rounded-[2rem] border-4 border-black dark:border-white overflow-hidden hover:scale-105 transition-all ${rarityGlow[achievement.rarity]}`}
                            >
                                {/* Rarity Badge */}
                                <div className={`absolute top-4 right-4 ${rarityColors[achievement.rarity]} text-white text-xs font-black uppercase px-3 py-1 rounded-full border-2 z-10`}>
                                    {achievement.rarity}
                                </div>

                                {/* Animated Background */}
                                <div className="absolute inset-0 bg-gradient-to-br from-piku-purple/10 via-piku-cyan/10 to-piku-lime/10 opacity-0 group-hover:opacity-100 transition-opacity" />

                                <div className="relative p-8">
                                    {/* Icon */}
                                    <div className="text-7xl mb-4 transform group-hover:scale-110 group-hover:rotate-12 transition-transform">
                                        {achievement.icon}
                                    </div>

                                    {/* Content */}
                                    <h3 className="text-2xl font-black text-black dark:text-white mb-2">
                                        {achievement.name}
                                    </h3>
                                    <p className="text-sm font-bold text-gray-600 dark:text-gray-400 mb-4">
                                        {achievement.description}
                                    </p>

                                    {/* Points */}
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <Star className="w-5 h-5 text-piku-purple fill-piku-purple" />
                                            <span className="text-2xl font-black text-piku-purple">+{achievement.points}</span>
                                            <span className="text-sm font-bold text-gray-500">XP</span>
                                        </div>
                                        <div className="w-10 h-10 bg-piku-lime rounded-full border-2 border-black flex items-center justify-center">
                                            <Award className="w-5 h-5 text-black" />
                                        </div>
                                    </div>

                                    {/* Unlock Date */}
                                    <div className="mt-4 pt-4 border-t-2 border-black/10 dark:border-white/10">
                                        <p className="text-xs font-bold text-gray-400">
                                            Unlocked on {new Date().toLocaleDateString()}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Locked Achievements */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                >
                    <h2 className="text-3xl font-black text-black dark:text-white mb-6 flex items-center gap-3">
                        <Target className="text-gray-400" />
                        Locked Achievements
                    </h2>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {lockedAchievements.map((achievement, i) => (
                            <motion.div
                                key={achievement.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6 + i * 0.1 }}
                                className="relative bg-gray-200 dark:bg-zinc-800 rounded-[2rem] border-4 border-gray-400 dark:border-zinc-700 overflow-hidden opacity-60 hover:opacity-80 transition-opacity"
                            >
                                {/* Rarity Badge */}
                                <div className="absolute top-4 right-4 bg-gray-500 text-white text-xs font-black uppercase px-3 py-1 rounded-full border-2 border-gray-600">
                                    {achievement.rarity}
                                </div>

                                <div className="relative p-8">
                                    {/* Icon - Grayscale */}
                                    <div className="text-7xl mb-4 grayscale opacity-50">
                                        {achievement.icon}
                                    </div>

                                    {/* Content */}
                                    <h3 className="text-2xl font-black text-gray-600 dark:text-gray-400 mb-2">
                                        {achievement.name}
                                    </h3>
                                    <p className="text-sm font-bold text-gray-500 dark:text-gray-500 mb-4">
                                        {achievement.description}
                                    </p>

                                    {/* Points */}
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <Star className="w-5 h-5 text-gray-400" />
                                            <span className="text-2xl font-black text-gray-400">+{achievement.points}</span>
                                            <span className="text-sm font-bold text-gray-500">XP</span>
                                        </div>
                                        <div className="w-10 h-10 bg-gray-400 rounded-full border-2 border-gray-500 flex items-center justify-center">
                                            <Award className="w-5 h-5 text-gray-600" />
                                        </div>
                                    </div>

                                    {/* Lock Indicator */}
                                    <div className="mt-4 pt-4 border-t-2 border-gray-400/30">
                                        <p className="text-xs font-bold text-gray-500 flex items-center gap-2">
                                            🔒 Complete the criteria to unlock
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Progress Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="mt-12 bg-gradient-to-br from-piku-purple to-piku-cyan rounded-[2rem] p-8 md:p-12 border-4 border-black dark:border-white shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] dark:shadow-[12px_12px_0px_0px_rgba(255,255,255,0.3)]"
                >
                    <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                        <div className="text-white">
                            <h3 className="text-4xl font-black mb-2">Keep Going!</h3>
                            <p className="text-xl font-bold opacity-90">
                                You're {Math.round((userAchievements.length / mockAchievements.length) * 100)}% of the way to collecting all achievements
                            </p>
                        </div>
                        <div className="relative w-32 h-32">
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
                                    strokeDashoffset={`${2 * Math.PI * 56 * (1 - userAchievements.length / mockAchievements.length)}`}
                                    strokeLinecap="round"
                                />
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="text-center">
                                    <div className="text-3xl font-black text-white">{userAchievements.length}</div>
                                    <div className="text-xs font-bold text-white/80">/ {mockAchievements.length}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Achievements;
