import Header from '../components/base/Header.tsx'
import Footer from '../components/base/Footer.tsx'

import '../styles/components.css'

const Home = () => {

    return (
      	<>
        	<Header />
        		<div className='mainSection' style={{display: 'flex', alignItems: 'center'}}>

					<h1>Добро пожаловать в информационную систему "Сервисная служба".</h1>

					<p>Здесь вы найдете информацию о различных аспектах работы нашей сервисной службы, включая управление данными, фильтрацию и анализ информации.</p>
						
					<h2>Структура системы:</h2>
					<h3>Управление данными</h3>
					<ul>
    				    <li>Клиенты</li>
    				    <li>Услуги</li>
    				    <li>Заказы</li>
    				    <li>Отзывы</li>
    				    <li>Платежи</li>
    				</ul>
    				<h4>Функционал раздела:</h4>
    				<p>Просмотр данных, добавление и удаление данных, а также редактирование информации о клиентах и услугах.</p>
					<h3>Фильтрация данных</h3>
					<ul>
    				    <li>Клиенты</li>
    				    <li>Услуги</li>
    				    <li>Заказы</li>
    				    <li>Отзывы</li>
    				    <li>Платежи</li>
    				</ul>
    				<h4>Функционал раздела:</h4>
    				<p>Просмотр данных с применением числовых и текстовых фильтров для более удобного поиска и анализа информации.</p>
					<h4>Дата создания: 19 марта 2025 г.</h4>
        		</div>
        	<Footer />
        </>
    )
}
  
export default Home