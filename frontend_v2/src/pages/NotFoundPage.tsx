import { useNavigate } from 'react-router-dom';

import '../styles/components.css'

const NotFoundPage = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/authenticated-route'); // Перенаправление на главную страницу
  };

  const handleGoBack = () => {
    navigate(-1); // Возврат на предыдущую страницу
  };

  return (
    <div className='mainSection notFoundpageContainer'>
      <h1>404 - Страница не найдена</h1>
      <p >Извините, но запрашиваемая страница не существует.</p>
      <div>
        <button className='defaultButton' onClick={handleGoHome}>Домой</button>
        <button className='defaultButton' onClick={handleGoBack}>Назад</button>
      </div>
    </div>
  );
};
export default NotFoundPage;