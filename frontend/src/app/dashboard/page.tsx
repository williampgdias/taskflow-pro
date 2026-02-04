// src/app/dashboard/page.tsx
'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/api';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

interface Task {
    id: number;
    title: string;
    description: string;
    status: 'todo' | 'in_progress' | 'done';
}

export default function DashboardPage() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const fetchTasks = async () => {
            const token = Cookies.get('token');

            if (!token) {
                router.push('/'); // Sem token? Volta pro login!
                return;
            }

            try {
                // Enviamos o token no Header de Autorização
                const response = await api.get('/tasks', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setTasks(response.data.data);
            } catch (error) {
                console.error('Failed to fetch tasks:', error);
                // Se o token for inválido/expirado, limpa e desloga
                Cookies.remove('token');
                router.push('/');
            } finally {
                setLoading(false);
            }
        };

        fetchTasks();
    }, [router]);

    if (loading)
        return (
            <div className="flex h-screen items-center justify-center">
                Loading tasks...
            </div>
        );

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <header className="mb-8 flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-800">My Tasks</h1>
                <button
                    onClick={() => {
                        Cookies.remove('token');
                        router.push('/');
                    }}
                    className="text-sm font-medium text-red-600 hover:underline"
                >
                    Logout
                </button>
            </header>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {tasks.map((task) => (
                    <div
                        key={task.id}
                        className="rounded-lg border bg-white p-6 shadow-sm"
                    >
                        <div className="mb-2 flex items-center justify-between">
                            <span
                                className={`rounded-full px-2 py-1 text-xs font-semibold ${
                                    task.status === 'done'
                                        ? 'bg-green-100 text-green-700'
                                        : 'bg-blue-100 text-blue-700'
                                }`}
                            >
                                {task.status.replace('_', ' ').toUpperCase()}
                            </span>
                        </div>
                        <h3 className="text-lg font-bold text-gray-900">
                            {task.title}
                        </h3>
                        <p className="mt-2 text-sm text-gray-600">
                            {task.description}
                        </p>
                    </div>
                ))}
            </div>

            {tasks.length === 0 && (
                <p className="text-center text-gray-500">
                    No tasks found. Create your first one!
                </p>
            )}
        </div>
    );
}
