import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Clock, User, Search, Filter, BookOpen, ChevronDown, Heart, ShoppingCart, Flame, X, CheckSquare, Square, ArrowRight, ShoppingBag } from 'lucide-react';
import Button from '../ui/Button';
import { useCart } from '../../contexts/CartContext';
import { Course } from '../../types';
import OptimizedImage from '../ui/OptimizedImage';
import { courseService } from '../../services';
import LoadingSpinner from '../ui/LoadingSpinner';

// Mock data with IDs compatible with Course type
const coursesData: (Partial<Course> & { id: string; img: string; author: string; students: string; time: string; date: string })[] = [
    { id: "1", title: "Complete Web Bootcamp 2024", author: "Dr. Angela Yu", rating: 4.8, students: "12k", time: "45h", img: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=600&q=80", popular: true, level: "Beginner", price: 89.99, date: "2023-11-01", tags: ["Web Dev", "Frontend"], description: "Full stack web development guide.", slug: "web-dev-bootcamp", category: "Development", thumbnail: "", instructor: { id: "i1", name: "Dr. Angela Yu" } as any, studentsCount: 12000, duration: "45h", lessonsCount: 100, createdAt: new Date() },
    { id: "2", title: "UX Design Masterclass", author: "Joe Natoli", rating: 4.9, students: "8.5k", time: "22h", img: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=600&q=80", popular: false, level: "All Levels", price: 24.99, date: "2023-10-15", tags: ["Design", "Figma"], description: "", slug: "ux-design", category: "Design", thumbnail: "", instructor: { id: "i2", name: "Joe Natoli" } as any, studentsCount: 8500, duration: "22h", lessonsCount: 40, createdAt: new Date() },
    { id: "3", title: "Python for Data Science", author: "Jose Portilla", rating: 4.7, students: "45k", time: "30h", img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80", popular: true, level: "Intermediate", price: 14.99, date: "2023-12-01", tags: ["Data", "Python"], description: "", slug: "python-ds", category: "Data Science", thumbnail: "", instructor: { id: "i3", name: "Jose Portilla" } as any, studentsCount: 45000, duration: "30h", lessonsCount: 60, createdAt: new Date() },
    { id: "4", title: "Digital Marketing 2024", author: "Daragh Walsh", rating: 4.6, students: "15k", time: "18h", img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80", popular: false, level: "Beginner", price: 12.99, date: "2024-01-10", tags: ["Marketing", "SEO"], description: "", slug: "digital-marketing", category: "Marketing", thumbnail: "", instructor: { id: "i4", name: "Daragh Walsh" } as any, studentsCount: 15000, duration: "18h", lessonsCount: 35, createdAt: new Date() },
    { id: "5", title: "React Native Mobile Dev", author: "Maximilian S.", rating: 4.9, students: "20k", time: "35h", img: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=600&q=80", popular: true, level: "Advanced", price: 29.99, date: "2023-09-20", tags: ["Mobile", "React"], description: "", slug: "react-native", category: "Mobile", thumbnail: "", instructor: { id: "i5", name: "Maximilian S." } as any, studentsCount: 20000, duration: "35h", lessonsCount: 80, createdAt: new Date() },
    { id: "6", title: "Graphic Design Bootcamp", author: "Lindsay Marsh", rating: 4.8, students: "9k", time: "25h", img: "https://images.unsplash.com/photo-1626785774573-4b799312afc2?auto=format&fit=crop&w=600&q=80", popular: false, level: "Beginner", price: 18.99, date: "2023-11-20", tags: ["Design", "Adobe"], description: "", slug: "graphic-design", category: "Design", thumbnail: "", instructor: { id: "i6", name: "Lindsay Marsh" } as any, studentsCount: 9000, duration: "25h", lessonsCount: 50, createdAt: new Date() },
    { id: "7", title: "Blockchain Fundamentals", author: "George Levy", rating: 4.5, students: "6k", time: "12h", img: "https://images.unsplash.com/photo-1639322537228-f710d846310a?auto=format&fit=crop&w=600&q=80", popular: false, level: "Intermediate", price: 49.99, date: "2023-12-15", tags: ["Web3", "Blockchain"], description: "", slug: "blockchain", category: "Web3", thumbnail: "", instructor: { id: "i7", name: "George Levy" } as any, studentsCount: 6000, duration: "12h", lessonsCount: 20, createdAt: new Date() },
    { id: "8", title: "Machine Learning A-Z", author: "Kirill Eremenko", rating: 4.8, students: "30k", time: "40h", img: "https://images.unsplash.com/photo-1527474305487-b87b222841cc?auto=format&fit=crop&w=600&q=80", popular: true, level: "Advanced", price: 15.99, date: "2023-11-10", tags: ["AI", "Python"], description: "", slug: "machine-learning", category: "AI", thumbnail: "", instructor: { id: "i8", name: "Kirill Eremenko" } as any, studentsCount: 30000, duration: "40h", lessonsCount: 90, createdAt: new Date() },
];

const FeaturedBanner: React.FC = () => {
    const { addToCart } = useCart();
    // Simulate adding the "Full Stack AI" featured course
    const featuredCourse: Course = {
        id: "featured-1",
        title: "Full Stack AI Engineer Path",
        description: "Zero to Hero in AI Engineering",
        price: 199.99,
        thumbnail: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80",
        instructor: { id: "fi1", name: "Learnova Team" } as any,
        // ... add other required fields with dummy data
        slug: "ai-engineer",
        level: "All Levels",
        category: "AI",
        rating: 5.0,
        studentsCount: 2500,
        duration: "60h",
        lessonsCount: 150,
        tags: ["AI", "Full Stack"],
        createdAt: new Date(),
        updatedAt: new Date(),
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full bg-black dark:bg-zinc-900 rounded-[2.5rem] p-8 md:p-12 mb-16 relative overflow-hidden border-4 border-black dark:border-white shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] dark:shadow-[0px_0px_30px_rgba(255,255,255,0.1)] group"
        >
            <div className="absolute inset-0 opacity-40 group-hover:scale-105 transition-transform duration-700">
                <OptimizedImage
                    src={featuredCourse.thumbnail}
                    alt="Featured"
                    containerClassName="w-full h-full"
                    className="grayscale mix-blend-overlay"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent"></div>
            </div>

            <div className="relative z-10 flex flex-col md:flex-row items-start md:items-end justify-between gap-8 text-white">
                <div className="max-w-2xl">
                    <div className="inline-flex items-center gap-2 bg-piku-lime text-black px-4 py-1.5 rounded-full text-sm font-black uppercase tracking-widest mb-6 border-2 border-black">
                        <Flame size={16} fill="black" /> Course of the Month
                    </div>
                    <h2 className="text-4xl md:text-7xl font-black mb-6 leading-tight">Full Stack AI <br />Engineer Path</h2>
                    <div className="flex flex-wrap gap-4 mb-8">
                        <div className="flex items-center gap-2 bg-white/10 backdrop-blur px-4 py-2 rounded-xl border border-white/20 font-bold">
                            <Star size={18} className="text-yellow-400 fill-yellow-400" /> 5.0
                        </div>
                        <div className="flex items-center gap-2 bg-white/10 backdrop-blur px-4 py-2 rounded-xl border border-white/20 font-bold">
                            <User size={18} /> 2.5k Enrolled
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-4 min-w-[200px]">
                    <div className="text-6xl font-black text-white text-right tracking-tighter">$199<span className="text-2xl text-gray-400">.99</span></div>
                    <Button
                        onClick={() => addToCart(featuredCourse)}
                        className="w-full bg-white text-black hover:bg-piku-cyan border-none text-xl h-16 shadow-[6px_6px_0px_0px_rgba(255,255,255,0.2)]" size="lg"
                    >
                        Enroll Now
                    </Button>
                </div>
            </div>
        </motion.div>
    );
};

const Courses: React.FC = () => {
    const [sortBy, setSortBy] = useState('Recommended');
    const [selectedTag, setSelectedTag] = useState('All');
    const [selectedLevels, setSelectedLevels] = useState<string[]>([]);
    const [priceRange, setPriceRange] = useState<'All' | 'Under 20' | '20-50' | '50+'>('All');
    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState(true);
    const { addToCart } = useCart();

    React.useEffect(() => {
        const fetchCourses = async () => {
            setLoading(true);
            try {
                const { data } = await courseService.getCourses();
                if (data && data.length > 0) {
                    setCourses(data);
                } else {
                    // Fallback to mock data if DB is empty
                    // @ts-ignore
                    setCourses(coursesData.map(c => ({
                        ...c,
                        instructor: { id: 'inst-1', name: c.author } as any,
                        thumbnail: c.img,
                        createdAt: new Date(c.date),
                        updatedAt: new Date(c.date)
                    })));
                }
            } catch (error) {
                console.error('Failed to fetch courses:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchCourses();
    }, []);

    const parseStudents = (s: string | number) => {
        if (typeof s === 'number') return s;
        const num = parseFloat(s.replace(/[^0-9.]/g, ''));
        return s.toLowerCase().includes('k') ? num * 1000 : num;
    };

    const filteredCourses = courses.filter(course => {
        if (selectedTag !== 'All' && !course.tags!.includes(selectedTag)) return false;
        if (selectedLevels.length > 0 && !selectedLevels.includes(course.level as string)) return false;
        if (typeof course.price === 'number') {
            if (priceRange === 'Under 20' && course.price >= 20) return false;
            if (priceRange === '20-50' && (course.price < 20 || course.price > 50)) return false;
            if (priceRange === '50+' && course.price <= 50) return false;
        }
        return true;
    });

    if (loading) return <LoadingSpinner />;

    const sortedCourses = [...filteredCourses].sort((a, b) => {
        // @ts-ignore
        if (sortBy === 'Rating') return b.rating - a.rating;
        // @ts-ignore
        if (sortBy === 'Newest') return new Date(b.date).getTime() - new Date(a.date).getTime();
        // @ts-ignore
        if (sortBy === 'Popularity') return parseStudents(b.students) - parseStudents(a.students);
        // @ts-ignore
        if (sortBy === 'Price') return (a.price || 0) - (b.price || 0);
        return 0;
    });

    const allTags = ['All', ...Array.from(new Set(coursesData.flatMap(c => c.tags || [])))];
    const levels = ["Beginner", "Intermediate", "Advanced", "All Levels"];

    const toggleLevel = (level: string) => {
        setSelectedLevels(prev =>
            prev.includes(level) ? prev.filter(l => l !== level) : [...prev, level]
        );
    };

    const handleAddToCart = (course: Course) => {
        addToCart(course);
    };

    return (
        <div className="pt-32 pb-20 bg-gray-50 dark:bg-black min-h-screen transition-colors duration-500">
            <div className="container mx-auto px-6">

                {/* Header - Styled with Outline/Bold effect */}
                <div className="mb-16">
                    <h1 className="text-7xl md:text-9xl font-black italic mb-4 text-black dark:text-white leading-[0.85] tracking-tighter">
                        EXPLORE <br />
                        <span
                            className="text-transparent bg-clip-text bg-black dark:bg-white text-stroke-2 text-stroke-black dark:text-stroke-white"
                            style={{ WebkitTextStroke: '2px currentColor', color: 'transparent' }}
                        >
                            COURSES.
                        </span>
                    </h1>
                    <p className="text-xl font-bold text-gray-500 dark:text-gray-400 max-w-2xl mt-8">
                        Master modern tech stacks with our project-based learning paths. Verified certificates included.
                    </p>
                </div>

                <FeaturedBanner />

                <div className="flex flex-col lg:flex-row gap-12">

                    {/* Sidebar Filters */}
                    <div className="lg:w-1/4 space-y-8">
                        {/* Search */}
                        <div className="relative">
                            <input type="text" placeholder="Search courses..." className="w-full pl-10 pr-4 py-4 rounded-xl border-4 border-black dark:border-white bg-white dark:bg-zinc-900 focus:outline-none focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:focus:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] transition-all font-bold text-lg" />
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} strokeWidth={3} />
                        </div>

                        {/* Filters Container */}
                        <div className="bg-white dark:bg-zinc-900 rounded-[2rem] p-6 border-4 border-black dark:border-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.2)]">
                            <div className="flex items-center gap-2 mb-6 font-black text-xl uppercase tracking-wider">
                                <Filter size={20} /> Filters
                            </div>

                            {/* Levels */}
                            <div className="mb-8">
                                <div className="text-xs font-black uppercase tracking-widest text-gray-500 mb-4">Level</div>
                                <div className="space-y-3">
                                    {levels.map(level => (
                                        <button
                                            key={level}
                                            onClick={() => toggleLevel(level)}
                                            className="flex items-center gap-3 w-full group"
                                        >
                                            <div className={`w-6 h-6 rounded-md border-2 border-black dark:border-white flex items-center justify-center transition-colors ${selectedLevels.includes(level) ? 'bg-piku-purple text-white' : 'bg-transparent group-hover:bg-gray-100 dark:group-hover:bg-zinc-800'}`}>
                                                {selectedLevels.includes(level) && <CheckSquare size={14} />}
                                            </div>
                                            <span className="font-bold text-sm">{level}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Price */}
                            <div className="mb-8">
                                <div className="text-xs font-black uppercase tracking-widest text-gray-500 mb-4">Price</div>
                                <div className="space-y-2">
                                    {['All', 'Under 20', '20-50', '50+'].map(range => (
                                        <button
                                            key={range}
                                            onClick={() => setPriceRange(range as any)}
                                            className={`w-full text-left px-4 py-2 rounded-lg font-bold transition-all border-2 ${priceRange === range
                                                ? 'bg-black text-white dark:bg-white dark:text-black border-black dark:border-white'
                                                : 'bg-transparent border-transparent hover:bg-gray-100 dark:hover:bg-zinc-800 text-gray-600 dark:text-gray-400'
                                                }`}
                                        >
                                            {range === 'All' ? 'All Prices' : range === '50+' ? '$50+' : range === 'Under 20' ? 'Under $20' : '$20 - $50'}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Tags Cloud */}
                            <div>
                                <div className="text-xs font-black uppercase tracking-widest text-gray-500 mb-4">Topics</div>
                                <div className="flex flex-wrap gap-2">
                                    {allTags.map(tag => (
                                        <button
                                            key={tag}
                                            onClick={() => setSelectedTag(tag)}
                                            className={`px-3 py-1 rounded-lg text-xs font-black uppercase tracking-wide border-2 transition-all ${selectedTag === tag
                                                ? 'bg-piku-lime text-black border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
                                                : 'bg-transparent border-gray-200 text-gray-500 hover:border-black hover:text-black dark:border-zinc-700 dark:hover:border-white dark:hover:text-white'
                                                }`}
                                        >
                                            {tag}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="flex-1 min-w-0">
                        {/* Toolbar */}
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-4">
                            <div className="text-sm font-bold text-gray-500">
                                Showing <span className="text-black dark:text-white">{filteredCourses.length}</span> courses
                            </div>

                            <div className="relative group min-w-[200px]">
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="w-full appearance-none bg-white dark:bg-zinc-900 border-2 border-black dark:border-white pl-4 pr-10 py-3 rounded-xl font-bold text-sm focus:outline-none focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:focus:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] transition-all cursor-pointer text-black dark:text-white"
                                >
                                    <option value="Recommended">Sort by Recommended</option>
                                    <option value="Rating">Top Rated</option>
                                    <option value="Newest">Newest</option>
                                    <option value="Price">Price: Low to High</option>
                                </select>
                                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-black dark:text-white pointer-events-none" size={16} strokeWidth={3} />
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 xl:grid-cols-2 gap-8 pb-32">
                            {sortedCourses.map((course, i) => (
                                <motion.div
                                    key={course.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.05 }}
                                    whileHover={{ y: -8 }}
                                    className="group relative bg-white dark:bg-zinc-900 rounded-[2rem] border-4 border-black dark:border-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[0px_0px_20px_rgba(255,255,255,0.2)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 cursor-pointer flex flex-col h-full overflow-hidden"
                                >
                                    {/* Folder Tab Visual */}
                                    <div className="absolute top-0 right-10 w-24 h-6 bg-black dark:bg-white rounded-b-xl opacity-10 transform translate-y-[-4px]"></div>

                                    {/* Image Container */}
                                    <div className="h-60 relative overflow-hidden border-b-4 border-black dark:border-white">
                                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors z-10"></div>
                                        <OptimizedImage
                                            src={course.thumbnail || (course as any).img}
                                            alt={course.title}
                                            containerClassName="w-full h-full"
                                            className="group-hover:scale-110 transition-transform duration-700"
                                        />

                                        <div className="absolute top-4 left-4 z-20 flex flex-col gap-2">
                                            <span className="bg-piku-cyan text-black text-xs font-black uppercase px-3 py-1 rounded-md border-2 border-black shadow-sm w-fit">
                                                {course.level}
                                            </span>
                                            {course.popular && (
                                                <span className="bg-piku-lime text-black text-xs font-black uppercase px-3 py-1 rounded-md border-2 border-black shadow-sm w-fit">
                                                    Best Seller
                                                </span>
                                            )}
                                        </div>

                                        <button className="absolute top-4 right-4 z-30 w-10 h-10 bg-white rounded-full flex items-center justify-center text-black border-2 border-black hover:bg-piku-purple hover:text-white transition-colors shadow-sm">
                                            <Heart size={18} />
                                        </button>
                                    </div>

                                    <div className="p-8 flex flex-col flex-1 relative bg-white dark:bg-zinc-900">
                                        <div className="flex-1">
                                            <h3 className="font-black text-2xl mb-3 leading-tight text-black dark:text-white group-hover:text-piku-purple dark:group-hover:text-piku-lime transition-colors">{course.title}</h3>

                                            <div className="flex items-center gap-3 mb-6">
                                                <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden border-2 border-black">
                                                    <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${course.instructor?.name || (course as any).author}`} alt="avatar" />
                                                </div>
                                                <div className="text-sm font-bold text-gray-500 dark:text-gray-400">By {course.instructor?.name || (course as any).author}</div>
                                            </div>
                                        </div>

                                        <div className="flex items-end justify-between border-t-2 border-black/5 dark:border-white/5 pt-6 mt-2">
                                            <div className="flex flex-col">
                                                <div className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-1">Price</div>
                                                <div className="text-3xl font-black text-black dark:text-white tracking-tighter">
                                                    ${course.price}
                                                </div>
                                            </div>
                                            <div className="flex flex-col items-end">
                                                <div className="flex items-center gap-1 text-sm font-bold bg-gray-100 dark:bg-zinc-800 px-2 py-1 rounded-md border border-black/5 dark:border-white/10 mb-2">
                                                    <Star size={14} className="fill-orange-400 text-orange-400" /> {course.rating}
                                                </div>
                                                <div className="text-xs font-bold text-gray-400">{course.students} Learners</div>
                                            </div>
                                        </div>

                                        {/* Slide Up Details on Hover */}
                                        <div className="absolute inset-0 bg-white dark:bg-zinc-900 p-8 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex flex-col justify-center items-center text-center gap-6 z-20 border-t-4 border-black dark:border-white">
                                            <div>
                                                <h4 className="font-black text-3xl text-black dark:text-white mb-2">Ready to start?</h4>
                                                <p className="font-bold text-black/60 dark:text-white/80">Join the cohort today.</p>
                                            </div>
                                            <div className="flex gap-4 text-sm font-black text-black dark:text-white border-y-2 border-black/10 dark:border-white/20 py-4 w-full justify-center">
                                                <span className="flex items-center gap-1"><User size={18} /> {parseStudents(course.studentsCount || (course as any).students)}</span>
                                                <span className="flex items-center gap-1"><Clock size={18} /> {course.duration || (course as any).time}</span>
                                            </div>

                                            {/* Enhanced Add to Cart Button */}
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleAddToCart(course as any);
                                                }}
                                                className="w-full group/btn relative overflow-hidden bg-black dark:bg-white text-white dark:text-black font-black text-lg py-4 rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-200"
                                            >
                                                <div className="relative z-10 flex items-center justify-center gap-2 group-hover/btn:-translate-y-12 transition-transform duration-300">
                                                    <span>Add to Cart</span>
                                                    <span className="bg-white/20 px-2 py-0.5 rounded text-xs">${course.price}</span>
                                                </div>
                                                <div className="absolute inset-0 flex items-center justify-center gap-2 translate-y-12 group-hover/btn:translate-y-0 transition-transform duration-300 text-piku-lime dark:text-piku-purple">
                                                    <ShoppingBag size={20} /> Added!
                                                </div>
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Courses;