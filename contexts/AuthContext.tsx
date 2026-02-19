import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthState } from '../types';
import { authService } from '../services/auth.service';
import { supabase } from '../lib/supabase';

interface AuthContextType extends AuthState {
    login: (email: string, password: string) => Promise<void>;
    signup: (email: string, password: string, name: string) => Promise<void>;
    logout: () => Promise<void>;
    updateUser: (updates: Partial<User>) => Promise<void>;
    signInWithGoogle: () => Promise<void>;
    signInWithGithub: () => Promise<void>;
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

    // Initialize auth state and listen for changes
    useEffect(() => {
        const initializeAuth = async () => {
            const hasAuthHash = window.location.hash.includes('access_token=') ||
                window.location.hash.includes('type=recovery');

            try {
                const { data: session } = await authService.getSession();

                if (session?.user) {
                    const { data: userProfile } = await authService.getUserProfile(session.user.id);

                    setAuthState({
                        user: userProfile || null,
                        isAuthenticated: !!userProfile,
                        isLoading: false,
                    });
                } else if (!hasAuthHash) {
                    // Only stop loading if there is no hash to process
                    // If there IS a hash, we wait for onAuthStateChange to handle it
                    setAuthState({
                        user: null,
                        isAuthenticated: false,
                        isLoading: false,
                    });
                }
            } catch (error) {
                console.error('Auth initialization failed:', error);
                if (!hasAuthHash) {
                    setAuthState({
                        user: null,
                        isAuthenticated: false,
                        isLoading: false,
                    });
                }
            }
        };

        initializeAuth();

        // Listen for auth state changes
        const { data: { subscription } } = authService.onAuthStateChange(async (event, session) => {
            console.log('Auth state changed:', event);

            if ((event === 'SIGNED_IN' || event === 'USER_UPDATED') && session?.user) {
                let { data: userProfile, error: profileError } = await authService.getUserProfile(session.user.id);

                // If profile is missing (either data is null or error is "no rows found")
                // PGRST116 is the Postgrest error for "no rows found"
                if (!userProfile) {
                    const { data: newProfile } = await authService.updateProfile(session.user.id, {
                        full_name: session.user.user_metadata?.full_name || session.user.user_metadata?.name || 'Learner',
                        avatar_url: session.user.user_metadata?.avatar_url || session.user.user_metadata?.picture
                    });

                    if (newProfile) {
                        const { data: updatedProfile } = await authService.getUserProfile(session.user.id);
                        userProfile = updatedProfile;
                    }
                }

                setAuthState({
                    user: userProfile,
                    isAuthenticated: !!userProfile,
                    isLoading: false,
                });
            } else if (event === 'SIGNED_OUT') {
                setAuthState({
                    user: null,
                    isAuthenticated: false,
                    isLoading: false,
                });
            } else if (event === 'INITIAL_SESSION' && !session) {
                setAuthState(prev => ({ ...prev, isLoading: false }));
            }
        });

        return () => {
            subscription.unsubscribe();
        };
    }, []);

    const login = async (email: string, password: string) => {
        try {
            setAuthState(prev => ({ ...prev, isLoading: true }));

            const { data, error } = await authService.signIn({ email, password });

            if (error) {
                throw new Error(error);
            }

            if (data?.user) {
                const { data: userProfile } = await authService.getUserProfile(data.user.id);

                if (userProfile) {
                    setAuthState({
                        user: userProfile,
                        isAuthenticated: true,
                        isLoading: false,
                    });
                }
            }
        } catch (error: any) {
            setAuthState(prev => ({ ...prev, isLoading: false }));
            console.error('Login failed:', error);
            throw error;
        }
    };

    const signup = async (email: string, password: string, name: string) => {
        try {
            setAuthState(prev => ({ ...prev, isLoading: true }));

            const { data, error } = await authService.signUp({
                email,
                password,
                fullName: name,
            });

            if (error) {
                throw new Error(error);
            }

            // Note: User will need to verify email before they can sign in
            // For now, we'll set loading to false
            setAuthState(prev => ({ ...prev, isLoading: false }));

            // Show success message to user about email verification
            console.log('Signup successful! Please check your email to verify your account.');
        } catch (error: any) {
            setAuthState(prev => ({ ...prev, isLoading: false }));
            console.error('Signup failed:', error);
            throw error;
        }
    };

    const logout = async () => {
        try {
            await authService.signOut();
            setAuthState({
                user: null,
                isAuthenticated: false,
                isLoading: false,
            });
        } catch (error) {
            console.error('Logout failed:', error);
            throw error;
        }
    };

    const updateUser = async (updates: Partial<User>) => {
        try {
            if (!authState.user) {
                throw new Error('No user logged in');
            }

            const profileUpdates: any = {};

            if (updates.name) profileUpdates.full_name = updates.name;
            if (updates.avatar) profileUpdates.avatar_url = updates.avatar;
            if (updates.bio) profileUpdates.bio = updates.bio;

            const { data, error } = await authService.updateProfile(
                authState.user.id,
                profileUpdates
            );

            if (error) {
                throw new Error(error);
            }

            // Update local state
            setAuthState(prev => ({
                ...prev,
                user: prev.user ? { ...prev.user, ...updates } : null,
            }));
        } catch (error) {
            console.error('Update user failed:', error);
            throw error;
        }
    };

    const signInWithGoogle = async () => {
        try {
            const { error } = await authService.signInWithOAuth('google');
            if (error) {
                throw new Error(error);
            }
        } catch (error) {
            console.error('Google sign in failed:', error);
            throw error;
        }
    };

    const signInWithGithub = async () => {
        try {
            const { error } = await authService.signInWithOAuth('github');
            if (error) {
                throw new Error(error);
            }
        } catch (error) {
            console.error('Github sign in failed:', error);
            throw error;
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
                signInWithGoogle,
                signInWithGithub,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
