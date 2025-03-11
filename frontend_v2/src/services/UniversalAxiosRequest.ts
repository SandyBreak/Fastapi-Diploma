import axios, { AxiosRequestConfig } from 'axios';
import { ResponseTypes } from '../types/TableTypes.ts';

/**
 * Универсальная функция для отправки запросов к API
 * @param {string} path - Путь к API
 * @param {object} [params={}] - Параметры запроса (для GET) или данные (для POST, PUT)
 * @param {string} [method='GET'] - HTTP-метод (GET, POST, PUT, DELETE и т.д.)
 * @param {object} [config={}] - Дополнительные настройки Axios
 * @returns {Promise} - Промис с ответом от API
 */

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';
type AxiosResponse = ResponseTypes | [];

const UniversalAxiosRequest = async (path: string, method: HttpMethod = 'GET', params: object = {}, config: object = {}
): Promise<AxiosResponse> => {
    try {
        const options: AxiosRequestConfig = {
            method,
            url: path,
            ...config,
        };

        // Если метод GET, добавляем параметры в запрос
        if (method.toUpperCase() === 'GET') {
            options.params = params;
        } else {
            // Для других методов добавляем данные в тело запроса
            options.data = params;
        }

        const response = await axios(options);
        return response.data;
    } catch (error) {
        console.error('API Request Error:', error);
        throw error;
    }
};
export default UniversalAxiosRequest;
