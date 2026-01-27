import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Search, Filter, ThumbsUp, MessageCircle, Share2, MoreHorizontal, User } from 'lucide-react';
import Button from '../ui/Button';

// Mock discussions data
const mockDiscussions = [
    {
        id: 1,
        title: "Best resources for learning Advanced React patterns?",
        author: "Sarah Jenkins",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
        category: "React",
        tags: ["Frontend", "Resources", "Advanced"],
        upvotes: 45,
        comments: 12,
        time: "2 hours ago",
        preview: "I've been working with React for about a year now and I want to level up my skills. I'm looking for resources that cover advanced patterns like Compound Components, Control Props, etc..."
    },
    {
        id: 2,
        title: "Help understanding Docker networking for microservices",
        author: "Mike Chen",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike",
        category: "DevOps",
        tags: ["Docker", "Microservices", "Networking"],
        upvotes: 28,
        comments: 8,
        time: "4 hours ago",
        preview: "I'm trying to set up a local development environment with multiple microservices using Docker Compose, but I'm having trouble getting them to communicate with each other..."
    },
    {
        id: 3,
        title: "Showcase: My first portfolio built with Learnova!",
        author: "Jessica Li",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jessica",
        category: "Showcase",
        tags: ["Portfolio", "Frontend", "Design"],
        upvotes: 156,
        comments: 34,
        time: "1 day ago",
        preview: "Hey everyone! I just finished the Web Development Bootcamp and built my portfolio website. I'd love to get some feedback on the design and code structure..."
    },
    {
        id: 4,
        title: "Is Python still the king of AI/ML in 2024?",
        author: "David Ross",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
        category: "Data Science",
        tags: ["Python", "AI", "Discussion"],
        upvotes: 89,
        comments: 45,
        time: "1 day ago",
        preview: "With the rise of other languages like Mojo and Julia, discussions have been popping up about Python's dominance. What do you all think? Is it worth investing time in..."
    }
];

const categories = ["All", "General", "React", "Frontend", "Backend", "DevOps", "Data Science", "Showcase"];

const Community: React.FC = () => {
    const [activeCategory, setActiveCategory] = useState("All");

    return (
        <div className="pt-32 pb-20 bg-gray-50 dark:bg-black min-h-screen transition-colors duration-500">
            <div className="container mx-auto px-6">

                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <h1 className="text-5xl md:text-7xl font-black text-black dark:text-white leading-tight tracking-tighter mb-4">
                            Community
                        </h1>
                        <p className="text-xl font-bold text-gray-600 dark:text-gray-400">
                            Join the conversation, ask questions, and share your journey.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        <Button size="lg" className="shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)]">
                            <MessageSquare className="mr-2" /> Start Discussion
                        </Button>
                    </motion.div>
                </div>

                <div className="grid lg:grid-cols-4 gap-8">

                    {/* Left Sidebar - Categories & Filters */}
                    <div className="lg:col-span-1 space-y-8">
                        <div className="bg-white dark:bg-zinc-900 rounded-[2rem] p-6 border-4 border-black dark:border-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.2)]">

                            {/* Search */}
                            <div className="relative mb-6">
                                <input
                                    type="text"
                                    placeholder="Search discussions..."
                                    className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-black dark:border-white bg-gray-50 dark:bg-black focus:outline-none focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:focus:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] transition-all font-bold"
                                />
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                            </div>

                            {/* Categories */}
                            <div>
                                <h3 className="text-lg font-black mb-4 uppercase tracking-wider flex items-center gap-2">
                                    <Filter size={18} /> Categories
                                </h3>
                                <div className="space-y-2">
                                    {categories.map((cat) => (
                                        <button
                                            key={cat}
                                            onClick={() => setActiveCategory(cat)}
                                            className={`w-full text-left px-4 py-2 rounded-lg font-bold transition-all border-2 ${activeCategory === cat
                                                    ? 'bg-black text-white dark:bg-white dark:text-black border-black dark:border-white'
                                                    : 'bg-transparent border-transparent hover:bg-gray-100 dark:hover:bg-zinc-800 text-gray-600 dark:text-gray-400'
                                                }`}
                                        >
                                            {cat}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Trending Tags */}
                        <div className="bg-piku-lime rounded-[2rem] p-6 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                            <h3 className="text-lg font-black mb-4 uppercase tracking-wider text-black">Trending Tags</h3>
                            <div className="flex flex-wrap gap-2">
                                {["#javascript", "#help", "#showcase", "#career", "#python", "#react"].map(tag => (
                                    <span key={tag} className="px-3 py-1 bg-white border-2 border-black rounded-lg font-bold text-sm hover:scale-105 transition-transform cursor-pointer shadow-sm">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Main Feed */}
                    <div className="lg:col-span-3 space-y-6">
                        {mockDiscussions.map((post, i) => (
                            <motion.div
                                key={post.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 * i }}
                                className="bg-white dark:bg-zinc-900 rounded-[2rem] p-6 md:p-8 border-4 border-black dark:border-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.2)] hover:-translate-y-1 transition-transform group cursor-pointer"
                            >
                                <div className="flex items-start gap-4">
                                    {/* Upvote Button */}
                                    <div className="hidden md:flex flex-col items-center gap-1 bg-gray-100 dark:bg-zinc-800 rounded-xl p-2 border-2 border-black/10 dark:border-white/10">
                                        <button className="text-gray-400 hover:text-piku-purple transition-colors">
                                            <ThumbsUp size={24} />
                                        </button>
                                        <span className="font-black text-lg">{post.upvotes}</span>
                                    </div>

                                    <div className="flex-1">
                                        {/* Meta Row */}
                                        <div className="flex items-center gap-3 mb-2 text-sm">
                                            <div className="flex items-center gap-2">
                                                <img src={post.avatar} alt={post.author} className="w-6 h-6 rounded-full border border-black dark:border-white" />
                                                <span className="font-bold text-black dark:text-white">{post.author}</span>
                                            </div>
                                            <span className="text-gray-400">•</span>
                                            <span className="text-gray-500 font-medium">{post.time}</span>
                                            <span className="text-gray-400">•</span>
                                            <span className="px-2 py-0.5 bg-gray-100 dark:bg-zinc-800 rounded-md font-bold text-xs uppercase text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-zinc-700">
                                                {post.category}
                                            </span>
                                        </div>

                                        {/* Content */}
                                        <h3 className="text-2xl font-black mb-2 group-hover:text-piku-purple transition-colors">
                                            {post.title}
                                        </h3>
                                        <p className="text-gray-600 dark:text-gray-400 font-medium mb-4 line-clamp-2">
                                            {post.preview}
                                        </p>

                                        {/* Footer Row */}
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                {post.tags.map(tag => (
                                                    <span key={tag} className="text-xs font-bold text-piku-purple bg-piku-purple/10 px-2 py-1 rounded-md">
                                                        #{tag}
                                                    </span>
                                                ))}
                                            </div>

                                            <div className="flex items-center gap-4 text-gray-500 font-bold text-sm">
                                                <div className="flex items-center gap-1 md:hidden">
                                                    <ThumbsUp size={16} /> {post.upvotes}
                                                </div>
                                                <div className="flex items-center gap-1 hover:text-black dark:hover:text-white transition-colors">
                                                    <MessageCircle size={18} /> {post.comments} Comments
                                                </div>
                                                <div className="flex items-center gap-1 hover:text-black dark:hover:text-white transition-colors">
                                                    <Share2 size={18} /> Share
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}

                        {/* Pagination / Load More */}
                        <div className="text-center py-8">
                            <Button variant="outline" className="border-2 border-black dark:border-white">
                                Load More Discussions
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Community;
