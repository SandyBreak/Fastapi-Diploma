import { useNavigate, Navigate, Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react';

const AuthenticatedRoute = () => {
    const navigate = useNavigate();
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const token = localStorage.getItem('token');

    const helloMessage = async () => {
        const url = 'http://127.0.0.1:8000/authenticated-route';

        if (!token) {
            setError('No authentication token found.');
            setLoading(false);
            return;
        }

        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                if (response.status === 401) {
                    localStorage.removeItem('token');
                    setError('Unauthorized access. Redirecting to login...');
                } else {
                    throw new Error('Network response was not ok: ' + response.statusText);
                }
            } else {
                setLoading(false);
            }
        } catch (error) {
            setError(error instanceof Error ? error.message : 'An unknown error occurred');
            console.error('Error during fetching message:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        helloMessage();
    }, []);

    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => {
                navigate('/login');
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [error, navigate]);

    if (loading) {
        return <div>Loading...</div>;
    }

    // Если произошла ошибка аутентификации, перенаправляем на страницу входа
    if (!token) {
        return <Navigate to="/login" replace />;
    }

    return (
        <div>
            {error && <div>Error: {error}</div>} 
            <Outlet />
        </div>
    );
};

export default AuthenticatedRoute;
