interface Table {name: string, label: string}

export const TablesList: Table[] = [
    { name: 'clients', label: 'Клиенты' },
    { name: 'services', label: 'Услуги' },
    { name: 'orders', label: 'Заказы' },
    { name: 'reviews', label: 'Отзывы' },
    { name: 'payments', label: 'Платежи' },
];


export type ResponseTypes = Client | Service | Review | Order | Payment;
export type TableNames = 'clients' | 'services' | 'orders' | 'reviews' | 'payments';

export type Client = {
    id: number
    first_name: string
    last_name: string
    phone: string
    email: string
    registration_date: Date
    action_column: null;
}

export type Service = {
    id: number
    name: string
    description: string
    price: number
    action_column: null;
}

export type Review = {
    id: number
    client: number
    name_service: number
    review_date: Date
    rating: number
    text: string
    action_column: null;
}

export type Order = {
    id: number
    client: number
    name_service: number
    order_date: Date
    status: string
    action_column: null;
}

export type Payment = {
    id: number
    order_id: number
    amount: number
    payment_date: Date
    payment_method: string
    action_column: null;
}


export const AddFormFields: TableFields = {
    clients: [
        { type: 'input', input_type: 'text', name: 'first_name', placeholder: 'Имя'},
        { type: 'input', input_type: 'text', name: 'last_name', placeholder: 'Фамилия'},
        { type: 'input', input_type: 'number', name: 'phone', placeholder: 'Телефон'},
        { type: 'input', input_type: 'email', name: 'email', placeholder: 'example@example.com'},
    ],
    services: [
        { type: 'input', input_type: 'text', name: 'name', placeholder: 'Услуга'},
        { type: 'input', input_type: 'text', name: 'description', placeholder: 'Описание'},
        { type: 'input', input_type: 'number', name: 'price', placeholder: 'Цена'},
    ],
    orders: [
        { type: 'select', select_type: 'services', name: 'service_id', options: ['Выберите услугу']},
        { type: 'select', select_type: 'clients', name: 'client_id', options: ['Выберите клиента']},
        { type: 'select', name: 'status', options: ['Укажите cтатус', 'Выполнен', 'В ожидании', 'Отменен']},
        { type: 'input', input_type: 'date', name: 'order_date'},
    ],
    reviews: [
        { type: 'select', select_type: 'services', name: 'service_id', options: ['Выберите услугу']},
        { type: 'select', select_type: 'clients', name: 'client_id', options: ['Выберите клиента']},
        { type: 'input', input_type: 'date', name: 'review_date', placeholder: 'Дата'},
        { type: 'input', input_type: 'number', name: 'rating', placeholder: 'Оценка'},
        { type: 'input', input_type: 'text', name: 'text', placeholder: 'Отзыв'},
    ],
    payments: [
        { type: 'select', select_type: 'orders', name: 'order_id', options: ['Выберите ID заказа'] },
        { type: 'input', input_type: 'number', name: 'amount', placeholder: 'Сумма оплаты'},
        { type: 'input', input_type: 'date', name: 'payment_date', placeholder: 'Дата платежа'},
        { type: 'select', name: 'payment_method', options: ['Выберите способ оплаты', 'Кредитная карта', 'Дебетовая карта', 'Наличные']},

    ]
};

interface TableFields {
    clients: FormField[]
    services: FormField[]
    orders: FormField[]
    reviews: FormField[]
    payments: FormField[]
}
  
export interface FormField {
    name: string
    type: string
    input_type?: string
    select_type?: string
    options?: Array<string>
    placeholder?: string
}