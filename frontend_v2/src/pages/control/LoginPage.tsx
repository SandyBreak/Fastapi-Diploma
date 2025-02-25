import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/components.css'

const LoginPage = () => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');
    const navigate = useNavigate();

    const handleInputChange = (setter: React.Dispatch<React.SetStateAction<string>>) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setter(e.target.value);
        setError(''); // Сбрасываем ошибку при вводе
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const body = new URLSearchParams({
            'grant_type': 'password',
            'username': username,
            'password': password,
        }).toString();

        try {
            const response = await fetch('http://127.0.0.1:8000/auth/jwt/login', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: body,
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || 'Login failed');
            }

            const data = await response.json();
            localStorage.setItem('token', data.access_token);
            navigate('/authenticated-route');
        } catch (error) {
            setError(error instanceof Error ? error.message : 'An unknown error occurred');
            console.error('Error during login:', error);
        }
    };


    return (
        <div className='mainSection loginPageContainer'>
            <h1>Вход</h1>
            {error && <div className="error">{error}</div>} {/* Отображение сообщения об ошибке */}
            <form className='loginForm' onSubmit={handleSubmit}>
                <div className=''>
                    <label> E-mail
                        <input
                            type="text"
                            value={username}
                            onChange={handleInputChange(setUsername)}
                            required
                        />
                    </label>
                </div>
                <div className=''>
                    <label> Пароль
                        <input
                            type="password"
                            value={password}
                            onChange={handleInputChange(setPassword)}
                            required
                        />
                    </label>
                </div>
                <div className='buttonContainer'>
                    <button type="submit" className="defaultButton">Войти</button>
                </div>
            </form>
        </div>
    );
};

export default LoginPage;
