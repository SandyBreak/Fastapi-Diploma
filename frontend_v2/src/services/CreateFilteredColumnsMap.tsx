import React from 'react';
import { ColumnDef } from '@tanstack/react-table';

import { Service, Client, Order, Review, Payment, TableNames} from '../types/TableTypes.ts';



const CreateFilteredColumnsMap = (): Record<TableNames, ColumnDef<any, any>[]> => {
    
    const clientColumns = React.useMemo<ColumnDef<Client, any>[]>(
        () => [
            {
                accessorKey: 'id',
                cell: (info) => info.getValue(),
                meta: {
                    filterVariant: 'range',
                },
            },
            {
                accessorFn: (row) => row.first_name,
                id: 'first_name',
                cell: (info) => info.getValue(),
                header: () => <span>Имя</span>,
            },
            {
                accessorFn: (row) => row.last_name,
                id: 'last_name',
                cell: (info) => info.getValue(),
                header: () => <span>Фамилия</span>,
            },
            {
                accessorKey: 'phone',
                header: () => 'Телефон',
            },
            {
                accessorFn: (row) => row.email,
                id: 'email',
                cell: (info) => info.getValue(),
                header: () => <span>Почта</span>,
            }
        ],
        []
    );
    const servicesColumns = React.useMemo<ColumnDef<Service, any>[]>(
        () => [
            {
                accessorKey: 'id',
                cell: (info) => info.getValue(),
                meta: {
                    filterVariant: 'range',
                },
            },
            {
                accessorFn: (row) => row.name,
                id: 'name',
                cell: (info) => info.getValue(),
                header: () => <span>Услуга</span>,
            },
            {
                accessorFn: (row) => row.description,
                id: 'description',
                cell: (info) => info.getValue(),
                header: () => <span>Описание</span>,
            },
            {
                accessorFn: (row) => row.price,
                id: 'price',
                cell: (info) => info.getValue(),
                header: () => <span>Цена</span>,
                meta: {
                    filterVariant: 'range',
                },
            },
            ],
    []);

    const ordersColumns = React.useMemo<ColumnDef<Order, any>[]>(
        () => [
            {
                accessorKey: 'id',
                cell: (info) => info.getValue(),
                meta: {
                    filterVariant: 'range',
                },
            },
            {
                accessorFn: (row) => row.name_service,
                id: 'name_service',
                cell: (info) => info.getValue(),
                header: () => <span>Услуга</span>,
            },
            {
                accessorFn: (row) => row.client,
                id: 'client',
                cell: (info) => info.getValue(),
                header: () => <span>Клиент</span>,
            },
            {
                accessorFn: (row) => row.status,
                id: 'status',
                cell: (info) => info.getValue(),
                header: () => <span>Статус</span>,
            },
            {
                accessorFn: (row) => row.order_date,
                id: 'order_date',
                cell: (info) => info.getValue(),
                header: () => <span>Дата</span>,
            },
        ],
    []);

    const reviewsColumns = React.useMemo<ColumnDef<Review, any>[]>(
        () => [
            {
                accessorKey: 'id',
                cell: (info) => info.getValue(),
                meta: {
                    filterVariant: 'range',
                },
            },
            {
                accessorFn: (row) => row.name_service,
                id: 'name_service',
                cell: (info) => info.getValue(),
                header: () => <span>Сервис</span>,
            },
            {
                accessorFn: (row) => row.client,
                id: 'client',
                cell: (info) => info.getValue(),
                header: () => <span>Клиент</span>,
            },
            {
                accessorFn: (row) => row.review_date,
                id: 'review_date',
                cell: (info) => info.getValue(),
                header: () => <span>Дата отзыва</span>,
            },
            {
                accessorFn: (row) => row.rating,
                id: 'rating',
                cell: (info) => info.getValue(),
                header: () => <span>Оценка</span>,
                meta: {
                    filterVariant: 'range',
                },
            },
            {
                accessorFn: (row) => row.text,
                id: 'text',
                cell: (info) => info.getValue(),
                header: () => <span>Отзыв</span>,
            },
        ],
    []);

    const paymentsColumns = React.useMemo<ColumnDef<Payment, any>[]>(
        () => [
            {
                accessorKey: 'id',
                cell: (info) => info.getValue(),
                meta: {
                    filterVariant: 'range',
                },
            },
            {
                accessorFn: (row) => row.order_id,
                id: 'order_id',
                cell: (info) => info.getValue(),
                header: () => <span>ID Заказа</span>,
            },
            {
                accessorFn: (row) => row.amount,
                id: 'amount',
                cell: (info) => info.getValue(),
                header: () => <span>Сумма платежа</span>,
                meta: {
                    filterVariant: 'range',
                },
            },
            {
                accessorFn: (row) => row.payment_date,
                id: 'payment_date',
                cell: (info) => info.getValue(),
                header: () => <span>Дата платежа</span>,
            },
            {
                accessorFn: (row) => row.payment_method,
                id: 'payment_method',
                cell: (info) => info.getValue(),
                header: () => <span>Метод оплаты</span>,
            },
        ],
    []);

    return  {
        clients: clientColumns,
        services: servicesColumns,
        orders: ordersColumns,
        reviews: reviewsColumns,
        payments: paymentsColumns
    };

}

export default CreateFilteredColumnsMap;







