import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthState } from '../types';

interface AuthContextType extends AuthState {
    login: (email: string, password: string) => Promise<void>;
    signup: (email: string, password: string, name: string) => Promise<void>;
    logout: () => void;
    updateUser: (user: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [authState, setAuthState] = useState<AuthState>({
        user: null,
        isAuthenticated: false,
        isLoading: true,
    });

    // Check for existing session on mount
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const storedUser = localStorage.getItem('user');
                if (storedUser) {
                    const user = JSON.parse(storedUser);
                    setAuthState({
                        user,
                        isAuthenticated: true,
                        isLoading: false,
                    });
                } else {
                    setAuthState(prev => ({ ...prev, isLoading: false }));
                }
            } catch (error) {
                console.error('Auth check failed:', error);
                setAuthState(prev => ({ ...prev, isLoading: false }));
            }
        };

        checkAuth();
    }, []);

    const login = async (email: string, password: string) => {
        try {
            // TODO: Replace with actual API call
            // const response = await fetch('/api/auth/login', {
            //   method: 'POST',
            //   headers: { 'Content-Type': 'application/json' },
            //   body: JSON.stringify({ email, password }),
            // });
            // const data = await response.json();

            // Mock user for now
            const mockUser: User = {
                id: '1',
                email,
                name: email.split('@')[0],
                avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
                role: 'student',
                createdAt: new Date(),
                emailVerified: true,
            };

            localStorage.setItem('user', JSON.stringify(mockUser));
            localStorage.setItem('token', 'mock-jwt-token');

            setAuthState({
                user: mockUser,
                isAuthenticated: true,
                isLoading: false,
            });
        } catch (error) {
            console.error('Login failed:', error);
            throw error;
        }
    };

    const signup = async (email: string, password: string, name: string) => {
        try {
            // TODO: Replace with actual API call
            // const response = await fetch('/api/auth/signup', {
            //   method: 'POST',
            //   headers: { 'Content-Type': 'application/json' },
            //   body: JSON.stringify({ email, password, name }),
            // });
            // const data = await response.json();

            // Mock user for now
            const mockUser: User = {
                id: '1',
                email,
                name,
                avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
                role: 'student',
                createdAt: new Date(),
                emailVerified: false,
            };

            localStorage.setItem('user', JSON.stringify(mockUser));
            localStorage.setItem('token', 'mock-jwt-token');

            setAuthState({
                user: mockUser,
                isAuthenticated: true,
                isLoading: false,
            });
        } catch (error) {
            console.error('Signup failed:', error);
            throw error;
        }
    };

    const logout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        setAuthState({
            user: null,
            isAuthenticated: false,
            isLoading: false,
        });
    };

    const updateUser = (updates: Partial<User>) => {
        if (authState.user) {
            const updatedUser = { ...authState.user, ...updates };
            localStorage.setItem('user', JSON.stringify(updatedUser));
            setAuthState(prev => ({
                ...prev,
                user: updatedUser,
            }));
        }
    };

    return (
        <AuthContext.Provider
            value={{
                ...authState,
                login,
                signup,
                logout,
                updateUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
