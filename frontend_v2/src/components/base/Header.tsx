import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import MenuButton from '../MenuButton';
import logo from '../../assets/logo.png';

const Header = () => {
  	const navigate = useNavigate();
  	const [username, setUsername] = useState(null);

  	React.useEffect(() => {
        const fetchImages = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await axios.get('http://127.0.0.1:8000/users/me', {
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
  	
	const handleLogout = () => {
  	  	localStorage.removeItem('token');
  	  	navigate('/login');
  	};

  	return (
  	  	<>
  	    	<header>
  	    	  	<div className='headerContainer'>
  	    	  	  	<a href='/authenticated-route'><img src={logo} width="100" height="40"/></a>
  	    	  	</div>
  	    	  	<div className='main-menu'>
  	    	  	  	<MenuButton text="Просмотр данных" path="/authenticated-route/view_table"/>
  	    	  	  	<MenuButton text="Фильтрация данных" path="/authenticated-route/filter_table"/>
  	    	  	  	<MenuButton text="Обновление данных" path="/authenticated-route/update_table"/>
  	    	  	</div>
  	    	  	<div className='headerContainer'>
					<b style={{margin:'0'}}>Пользователь: {username}</b>
  	    	  	  	<button className='defaultButton' style={{display: 'flex', margin:'0'}} onClick={handleLogout}>Выйти</button>
  	    	  	</div>
  	    	</header>
  	  	</>
  	)
}

export default Header
