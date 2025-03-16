import { useState, useEffect } from 'react';
import { useNavigate, Navigate, Outlet } from 'react-router-dom';

import axios from 'axios';

import UniversalAxiosRequest from '../../services/UniversalAxiosRequest';

const AuthenticatedRoute = () => {
    const navigate = useNavigate();
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const token = localStorage.getItem('token');
    //const apiUrl = import.meta.env.VITE_API_URL;
    const Authentication = async () => {
    
        if (!token) {
            setError('No authentication token found.');
            setLoading(false);
            return;
        }
        try {
            const headers =  {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            }
            await UniversalAxiosRequest(`api/authenticated-route`, 'GET', {}, {headers})

            setLoading(false);
        } catch (error: unknown) {
            console.error('Error during fetching message:', error);

            const errorMessage = axios.isAxiosError(error) && error.response
                ? error.response.status === 401
                    ? (localStorage.removeItem('token'), 'Unauthorized access. Redirecting to login...')
                    : `Network response was not ok: ${error.response.statusText}`
                : error instanceof Error
                    ? error.message
                    : 'An unknown error occurred';

            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        Authentication();
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
            {error && <div className='error-message'>Error: {error}</div>} 
            <Outlet />
        </div>
    );
};

export default AuthenticatedRoute;
