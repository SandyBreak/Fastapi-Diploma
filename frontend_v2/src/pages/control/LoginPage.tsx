import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/components.css'
import UniversalAxiosRequest from '../../services/UniversalAxiosRequest';

const LoginPage = () => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');
    const navigate = useNavigate();
    const apiUrl = import.meta.env.VITE_API_URL;


    const handleInputChange = (setter: React.Dispatch<React.SetStateAction<string>>) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setter(e.target.value);
        setError('');
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const body = new URLSearchParams({
            'grant_type': 'password',
            'username': username,
            'password': password,
        });
        const headers =  {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
        }
        try {
            const response = await UniversalAxiosRequest(`${apiUrl}/auth/jwt/login`, 'POST', body, headers);
            console.log(response)
            if ('access_token' in response) {
                localStorage.setItem('token', response.access_token);
                navigate('/authenticated-route');
            }
        } catch (error) {
            setError(error instanceof Error ? error.message : 'An unknown error occurred');
            console.error('Error during login:', error);
        }
    };


    return (
        <div className='mainSection loginPageContainer'>
            <h1>Вход</h1>
            {error && <div className="error-message">{error}</div>}
            <form className='loginForm' onSubmit={handleSubmit}>
                <div className=''>
                    <label> E-mail
                        <input
                            type="text"
                            value={username}
                            onChange={handleInputChange(setUsername)}
                            required={true}
                        />
                    </label>
                </div>
                <div className=''>
                    <label> Пароль
                        <input
                            type="password"
                            value={password}
                            onChange={handleInputChange(setPassword)}
                            required={true}
                        />
                    </label>
                </div>
                <div className='buttonContainer'>
                    <button type="submit" className='defaultButton staticButton'>Войти</button>
                </div>
            </form>
        </div>
    );
};

export default LoginPage;
