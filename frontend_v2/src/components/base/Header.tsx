import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import axios from 'axios';

import MenuButton from '../utils/MenuButton';
import logo from '../../assets/logo.png';

const Header = () => {
    const [activePath, setActivePath] = useState(() => {return localStorage.getItem('activePath') || '/authenticated-route';});
    const [username, setUsername] = useState(null);
    const apiUrl = import.meta.env.VITE_API_URL;
    const navigate = useNavigate();
    
    React.useEffect(() => {
        const fetchImages = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await axios.get(`${apiUrl}/users/me`, {
                    headers: {
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });
                setUsername(response.data.username);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };
        fetchImages();
    }, []);

    const handleNavigation = (path: string) => {
        setActivePath(path);
		localStorage.setItem('activePath', path);
        navigate(path);
    };

    const handleLogout = () => {
        localStorage.removeItem('activePath');
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <>
            <header>
                <div className='headerContainer'>
                    <a href='/authenticated-route'><img src={logo} width="100" height="40" alt="Logo" /></a>
                </div>
                <div className='main-menu'>
                    <MenuButton text="Просмотр данных" path="/authenticated-route/view_table" isActive={activePath === '/authenticated-route/view_table'} onNavigate={handleNavigation} />
                    <MenuButton text="Фильтрация данных" path="/authenticated-route/filter_table" isActive={activePath === '/authenticated-route/filter_table'} onNavigate={handleNavigation} />
                </div>
                <div className='headerContainer'>
                    <b>Пользователь: {username}</b>
                    <button className='defaultButton staticButton logoutButton' onClick={handleLogout}>Выйти</button>
                </div>
            </header>
        </>
    );
}

export default Header;
