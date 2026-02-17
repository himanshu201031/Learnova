import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, Check, X, Loader2 } from 'lucide-react';
import { notificationService } from '../../services/notification.service';
import { useAuth } from '../../contexts/AuthContext';
import { Notification } from '../../types';

interface NotificationCenterProps {
    isOpen: boolean;
    onClose: () => void;
}

const NotificationCenter: React.FC<NotificationCenterProps> = ({ isOpen, onClose }) => {
    const { user } = useAuth();
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchNotifications = async () => {
        if (!user) return;
        setIsLoading(true);
        try {
            const { data } = await notificationService.getNotifications(user.id, { limit: 10 });
            if (data) setNotifications(data);
        } catch (error) {
            console.error('Failed to fetch notifications:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (isOpen && user) {
            fetchNotifications();

            // Subscribe to new notifications
            const subscription = notificationService.subscribeToNotifications(user.id, (payload) => {
                const newNotif = payload.new as Notification;
                setNotifications(prev => [newNotif, ...prev].slice(0, 10));
            });

            return () => {
                subscription.unsubscribe();
            };
        }
    }, [isOpen, user]);

    const handleMarkAllAsRead = async () => {
        if (!user) return;
        await notificationService.markAllAsRead(user.id);
        setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    };

    const handleMarkAsRead = async (id: string) => {
        await notificationService.markAsRead(id);
        setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    className="absolute right-0 top-16 w-80 md:w-96 bg-white dark:bg-zinc-900 rounded-2xl border-4 border-black dark:border-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.3)] z-50 overflow-hidden"
                >
                    {/* Header */}
                    <div className="p-4 border-b-2 border-gray-100 dark:border-zinc-800 flex items-center justify-between">
                        <h3 className="font-black text-lg text-black dark:text-white flex items-center gap-2">
                            <Bell size={20} className="fill-current" /> Notifications
                        </h3>
                        {notifications.some(n => !n.read) && (
                            <button
                                onClick={handleMarkAllAsRead}
                                className="text-xs font-bold text-piku-purple hover:underline"
                            >
                                Mark all as read
                            </button>
                        )}
                    </div>

                    {/* List */}
                    <div className="max-h-[400px] overflow-y-auto">
                        {isLoading ? (
                            <div className="p-12 flex justify-center">
                                <Loader2 className="animate-spin text-piku-purple" size={32} />
                            </div>
                        ) : notifications.length > 0 ? (
                            <div className="divide-y-2 divide-gray-100 dark:divide-zinc-800">
                                {notifications.map((notif) => (
                                    <div
                                        key={notif.id}
                                        onClick={() => !notif.read && handleMarkAsRead(notif.id)}
                                        className={`p-4 hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors relative group cursor-pointer ${!notif.read ? 'bg-blue-50/50 dark:bg-piku-purple/10' : ''}`}
                                    >
                                        {!notif.read && (
                                            <div className="absolute top-4 right-4 w-2 h-2 bg-piku-purple rounded-full"></div>
                                        )}

                                        <h4 className="font-bold text-sm mb-1 text-black dark:text-white pr-4">{notif.title}</h4>
                                        <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2 leading-relaxed">
                                            {notif.message}
                                        </p>
                                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                                            {new Date(notif.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="p-8 text-center text-gray-500 font-bold">
                                No new notifications
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    <div className="p-3 border-t-2 border-gray-100 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-950 text-center">
                        <button className="text-xs font-black uppercase tracking-widest hover:text-piku-purple transition-colors">
                            View All History
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default NotificationCenter;
