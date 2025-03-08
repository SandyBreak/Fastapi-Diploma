import { useNavigate } from 'react-router-dom';

import '../styles/components.css'

const NotFoundPage = () => {
	const navigate = useNavigate();

  	// Перенаправление на главную страницу
  	const handleGoHome = () => {
		navigate('/authenticated-route');
  	};

  	// Возврат на предыдущую страницу
  	const handleGoBack = () => {
  		navigate(-1);
  	};

  	return (
  	  	<div className='mainSection notFoundpageContainer'>
  	  	  	<h1>404 - Страница не найдена</h1>
  	  	  	<p >Извините, но запрашиваемая страница не существует.</p>
  	  	  	<div>
  	  	  		<button className='defaultButton staticButton' onClick={handleGoHome}>Домой</button>
  	  	  		<button className='defaultButton staticButton' onClick={handleGoBack}>Назад</button>
  	  	  	</div>
  	  	</div>
  	);
};
export default NotFoundPage;