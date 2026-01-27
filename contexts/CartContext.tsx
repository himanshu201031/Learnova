import React, { createContext, useContext, useState, useEffect } from 'react';
import { Course } from '../types';

interface CartItem extends Course {
    cartId: string; // Unique ID for cart item (could allow duplicates if needed, though usually courses are unique)
}

interface CartContextType {
    cart: CartItem[];
    addToCart: (course: Course) => void;
    removeFromCart: (courseId: string) => void;
    clearCart: () => void;
    cartTotal: number;
    isCartOpen: boolean;
    setIsCartOpen: (isOpen: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [isCartOpen, setIsCartOpen] = useState(false);

    // Load from local storage on mount
    useEffect(() => {
        try {
            const savedCart = localStorage.getItem('learnova_cart');
            if (savedCart) {
                setCart(JSON.parse(savedCart));
            }
        } catch (error) {
            console.error('Failed to load cart from local storage:', error);
        }
    }, []);

    // Save to local storage on change
    useEffect(() => {
        localStorage.setItem('learnova_cart', JSON.stringify(cart));
    }, [cart]);

    const addToCart = (course: Course) => {
        // Check if already in cart
        if (cart.some(item => item.id === course.id)) {
            // Could show toast notification here: "Already in cart"
            setIsCartOpen(true);
            return;
        }

        setCart(prev => [...prev, { ...course, cartId: `${course.id}-${Date.now()}` }]);
        setIsCartOpen(true);
    };

    const removeFromCart = (courseId: string) => {
        setCart(prev => prev.filter(item => item.id !== courseId));
    };

    const clearCart = () => {
        setCart([]);
    };

    const cartTotal = cart.reduce((total, item) => total + item.price, 0);

    return (
        <CartContext.Provider value={{
            cart,
            addToCart,
            removeFromCart,
            clearCart,
            cartTotal,
            isCartOpen,
            setIsCartOpen
        }}>
            {children}
        </CartContext.Provider>
    );
};
