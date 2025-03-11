import {createColumnHelper, ColumnDef} from '@tanstack/react-table';

import { Service, Client, Order, Review, Payment, TableNames } from '../types/TableTypes.ts';

import DeleteButton from '../components/utils/DeleteButton.tsx';

const clientColumnHelper = createColumnHelper<Client>();
const serviceColumnHelper = createColumnHelper<Service>();
const orderColumnHelper = createColumnHelper<Order>();
const reviewColumnHelper = createColumnHelper<Review>();
const paymentsColumnHelper = createColumnHelper<Payment>();

const CreateColumnsMap = (activeTable: string, onSave: () => void, setErrorMessage: (message: string | null) => void): Record<TableNames, ColumnDef<any, any>[]> => {

	return {
		clients:  [
			clientColumnHelper.accessor('id', {
				header: () => <span>ID</span>,
			}),
			clientColumnHelper.accessor('first_name', {
				header: () => <span>Имя</span>,
			}),
			clientColumnHelper.accessor('last_name', {
			  	header: () => <span>Фамилия</span>,
			}),
			clientColumnHelper.accessor('phone', {
				header: () => <span>Телефон</span>,
			}),
			clientColumnHelper.accessor('email', {
				header: () => <span>Почта</span>,
			}),
			clientColumnHelper.accessor('action_column', {
				header: () => <span>Действие</span>,
				cell: ({ row }) => (<DeleteButton activeTable={activeTable} row={row} onSave={onSave} setErrorMessage={setErrorMessage}/>),
			}),
		],
	  	services: [
			serviceColumnHelper.accessor('id', {
				header: () => <span>ID</span>,
			}),
			serviceColumnHelper.accessor('name', {
				header: () => <span>Услуга</span>,
			}),
			serviceColumnHelper.accessor('description', {
				header: () => <span>Описание</span>,
			}),
			serviceColumnHelper.accessor('price', {
				header: () => <span>Цена</span>,
			}),
			serviceColumnHelper.accessor('action_column', {
				header: () => <span>Действие</span>,
				cell: ({ row }) => (<DeleteButton activeTable={activeTable} row={row} onSave={onSave} setErrorMessage={setErrorMessage}/>),
			}),
		],
		orders: [
			orderColumnHelper.accessor('id', {
				header: () => <span>ID</span>,
			}),
			orderColumnHelper.accessor('name_service', {
				header: () => <span>Услуга</span>,
			}),
			orderColumnHelper.accessor('client', {
				header: () => <span>Клиент</span>,
			}),
			orderColumnHelper.accessor('status', {
				header: () => <span>Статус</span>,
			}),
			orderColumnHelper.accessor('order_date', {
				header: () => <span>Дата</span>,
			}),
			orderColumnHelper.accessor('action_column', {
				header: () => <span>Действие</span>,
				cell: ({ row }) => (<DeleteButton activeTable={activeTable} row={row} onSave={onSave} setErrorMessage={setErrorMessage}/>),
			}),
	  	],
		reviews: [
			reviewColumnHelper.accessor('id', {
			  	header: () => <span>ID</span>,
			}),
			reviewColumnHelper.accessor('name_service', {
				header: () => <span>Сервис</span>,
			}),
			reviewColumnHelper.accessor('client', {
			  	header: () => <span>Клиент</span>
			}),
			reviewColumnHelper.accessor('review_date', {
				header: () => <span>Дата отзыва</span>,
			}),
			reviewColumnHelper.accessor('rating', {
				header: () => <span>Оценка</span>,
			}),
			reviewColumnHelper.accessor('text', {
				header: () => <span>Отзыв</span>,
			}),
			reviewColumnHelper.accessor('action_column', {
				header: () => <span>Действие</span>,
				cell: ({ row }) => (<DeleteButton activeTable={activeTable} row={row} onSave={onSave} setErrorMessage={setErrorMessage}/>),
			}),
	  	],
		payments: [
			paymentsColumnHelper.accessor('id', {
				header: () => <span>ID</span>,
			}),
			paymentsColumnHelper.accessor('order_id', {
				header: () => <span>ID Заказа</span>,
			}),
			paymentsColumnHelper.accessor('amount', {
				header: () => <span>Сумма платежа</span>,
			}),
			paymentsColumnHelper.accessor('payment_date', {
				header: () => <span>Дата платежа</span>,
			}),
			paymentsColumnHelper.accessor('payment_method', {
				header: () => <span>Метод оплаты</span>,
			}),
			paymentsColumnHelper.accessor('action_column', {
				header: () => <span>Действие</span>,
				cell: ({ row }) => (<DeleteButton activeTable={activeTable} row={row} onSave={onSave} setErrorMessage={setErrorMessage}/>),
			}),
	  	]
	}
}

export default CreateColumnsMap;