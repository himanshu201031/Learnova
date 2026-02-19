import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, ShoppingBag, ArrowRight, CreditCard } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
import Button from '../ui/Button';
import { paymentService } from '../../services/payment.service';
import { useAuth } from '../../contexts/AuthContext';

const CartDrawer: React.FC = () => {
    const [isCheckoutLoading, setIsCheckoutLoading] = React.useState(false);
    const { cart, removeFromCart, cartTotal, isCartOpen, setIsCartOpen, clearCart } = useCart();
    const { isAuthenticated } = useAuth();

    const handleCheckout = async () => {
        if (!isAuthenticated) {
            // Should probably redirect to login or show alert
            alert('Please log in to checkout');
            return;
        }

        if (cart.length === 0) return;

        setIsCheckoutLoading(true);
        try {
            // For now, handle the first item in the cart as a single checkout
            // In a production app, you'd send all IDs or a cart reference
            const courseId = cart[0].id;
            const { data, error } = await paymentService.createCheckoutSession(courseId);

            if (error) throw new Error(error);

            if (data?.url) {
                // Redirect to Stripe Checkout
                window.location.href = data.url;
            } else {
                throw new Error('No checkout URL returned');
            }
        } catch (error: any) {
            console.error('Checkout failed:', error);
            alert(`Checkout failed: ${error.message}`);
        } finally {
            setIsCheckoutLoading(false);
        }
    };

    return (
        <AnimatePresence>
            {isCartOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsCartOpen(false)}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60]"
                    />

                    {/* Drawer */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed top-0 right-0 h-full w-full max-w-md bg-white dark:bg-zinc-900 border-l-4 border-black dark:border-white shadow-2xl z-[70] flex flex-col"
                    >
                        {/* Header */}
                        <div className="p-6 border-b-2 border-gray-100 dark:border-zinc-800 flex items-center justify-between bg-gray-50 dark:bg-black">
                            <div className="flex items-center gap-3">
                                <ShoppingBag className="w-6 h-6 text-piku-purple" />
                                <h2 className="text-2xl font-black italic tracking-tighter text-black dark:text-white">YOUR CART</h2>
                                <span className="bg-black text-white dark:bg-white dark:text-black text-xs font-bold px-2 py-1 rounded-full">
                                    {cart.length}
                                </span>
                            </div>
                            <button
                                onClick={() => setIsCartOpen(false)}
                                className="p-2 hover:bg-gray-200 dark:hover:bg-zinc-800 rounded-full transition-colors"
                            >
                                <X size={24} className="text-black dark:text-white" />
                            </button>
                        </div>

                        {/* Cart Items */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-4">
                            {cart.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-center opacity-60">
                                    <ShoppingBag size={64} className="mb-4 text-gray-400" strokeWidth={1} />
                                    <p className="text-xl font-bold text-gray-500">Your cart is empty.</p>
                                    <p className="text-sm text-gray-400">Start exploring courses to add them here.</p>
                                </div>
                            ) : (
                                cart.map((item) => (
                                    <motion.div
                                        layout
                                        key={item.cartId}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, x: -10 }}
                                        className="flex gap-4 p-4 bg-gray-50 dark:bg-zinc-800/50 rounded-xl border-2 border-gray-200 dark:border-zinc-700 hover:border-black dark:hover:border-white transition-colors group"
                                    >
                                        <div className="w-20 h-20 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0 border border-black/10">
                                            <img
                                                src={(item as any).img || item.thumbnail || `https://api.dicebear.com/7.x/shapes/svg?seed=${item.id}`}
                                                alt={item.title}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h4 className="font-bold text-sm text-black dark:text-white line-clamp-2 leading-tight mb-1">
                                                {item.title}
                                            </h4>
                                            <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">{item.instructor.name}</p>
                                            <div className="flex items-center justify-between">
                                                <span className="font-black text-piku-purple text-lg">${item.price}</span>
                                                <button
                                                    onClick={() => removeFromCart(item.id)}
                                                    className="text-gray-400 hover:text-red-500 transition-colors p-1"
                                                    aria-label="Remove item"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))
                            )}
                        </div>

                        {/* Footer */}
                        {cart.length > 0 && (
                            <div className="p-6 border-t-2 border-gray-100 dark:border-zinc-800 bg-gray-50 dark:bg-black space-y-4">
                                <div className="flex items-center justify-between text-lg font-bold">
                                    <span className="text-gray-500">Subtotal</span>
                                    <span className="text-black dark:text-white">${cartTotal.toFixed(2)}</span>
                                </div>
                                <div className="flex items-center justify-between text-2xl font-black text-black dark:text-white">
                                    <span>Total</span>
                                    <span>${cartTotal.toFixed(2)}</span>
                                </div>

                                <div className="pt-4 space-y-3">
                                    <Button
                                        onClick={handleCheckout}
                                        disabled={isCheckoutLoading}
                                        size="lg"
                                        className="w-full text-lg h-14 bg-piku-lime text-black border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 justify-center disabled:opacity-50"
                                    >
                                        {isCheckoutLoading ? 'Processing...' : 'Checkout Now'} <ArrowRight className="ml-2" size={20} />
                                    </Button>
                                    <p className="text-xs text-center text-gray-500 font-medium flex items-center justify-center gap-1">
                                        <CreditCard size={12} /> Secure Checkout
                                    </p>
                                </div>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default CartDrawer;
