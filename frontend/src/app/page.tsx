'use client';

import api from '@/lib/api';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const [mounted, setMounted] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    useEffect(() => {
        const timeout = setTimeout(() => setMounted(true), 0);
        return () => clearTimeout(timeout);
    }, []);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(''); // Clear previous errors

        try {
            const response = await api.post('/login', { email, password });
            const { access_token } = response.data;

            // Save the token in a cookie (expires in 7 days)
            Cookies.set('token', access_token, { expires: 7, secure: true });
            console.log('Login successful! Redirecting...');
            router.push('/dashboard');
        } catch (err: unknown) {
            interface AxiosErrorResponse {
                response?: {
                    data?: unknown;
                };
            }

            const axiosError = err as AxiosErrorResponse;

            if (axiosError.response?.data) {
                console.error('Login error:', axiosError.response.data);
            }

            setError('Invalid credentials. Please try again.');
        }
    };

    if (!mounted) return null;

    return (
        <main
            suppressHydrationWarning={true}
            className="flex min-h-screen items-center justify-center bg-gray-100 p-4"
        >
            <div className="w-full max-w-md space-y-8 rounded-xl bg-white p-10 shadow-lg">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-gray-900">
                        TaskFlow Pro
                    </h1>
                    <p className="mt-2 text-sm text-gray-600">
                        Please sign in to your account
                    </p>
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleLogin}>
                    <div className="space-y-4 rounded-md">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Email Address
                            </label>
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                placeholder="test@example.com"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>
                    {error && (
                        <div className="text-sm text-red-600 bg-red-50 p-2 rounded border border-red-200 text-center">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        Sign In
                    </button>
                </form>
            </div>
        </main>
    );
}
