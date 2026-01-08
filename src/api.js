// src/api.js
import axios from 'axios';

// Создаем экземпляр axios с базовым URL
const api = axios.create({
  baseURL: 'https://polystats.ru/api',
  headers: {
    'Content-Type': 'application/json',
  }
});

// Хранилище для токена
let accessToken = localStorage.getItem('access_token') || null;

export const setAccessToken = (token) => {
  accessToken = token;
  localStorage.setItem('access_token', token);
};

export const getAccessToken = () => {
  return accessToken;
};

export const clearAccessToken = () => {
  accessToken = null;
  localStorage.removeItem('access_token');
};

// Интерцептор для добавления токена к каждому запросу
api.interceptors.request.use(
  (config) => {
    // Если есть токен, добавляем его в заголовки
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Интерцептор для обработки ответов
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    // Обрабатываем ошибку 401 (неавторизован)
    if (error.response?.status === 401) {
      clearAccessToken();
      console.warn('Сессия истекла, выполнен выход из системы');
    }
    
    // Пробрасываем ошибку дальше
    return Promise.reject(error.response?.data || error);
  }
);

// API для аутентификации
export const authAPI = {
  // Регистрация
  register: async (email, password, groupName) => {
    const response = await api.post('/v1/auth/register', {
      email,
      password,
      group_name: groupName,
      is_active: true,
      is_superuser: false,
      is_verified: false,
    });
    return response;
  },

  // Вход
  login: async (username, password) => {
    const formData = new URLSearchParams();
    formData.append('username', username);
    formData.append('password', password);
    formData.append('grant_type', 'password');

    const response = await api.post('/v1/auth/login', formData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    if (response.access_token) {
      setAccessToken(response.access_token);
    }

    return response;
  },

  // Выход
  logout: async () => {
    try {
      await api.post('/v1/auth/logout');
    } finally {
      clearAccessToken();
    }
  },
};

// API для предметов
export const subjectsAPI = {
  // Получить список предметов
  getSubjects: async () => {
    const response = await api.get('/v1/subjects/list');
    return response;
  },

  // Добавить предмет
  addSubject: async (name) => {
    const response = await api.post('/v1/subjects/add', { name });
    return response;
  },

  // Удалить предмет
  deleteSubject: async (subjectId) => {
    await api.delete(`/v1/subjects/${subjectId}`);
    return true;
  },
};

// Вспомогательные функции
export const checkAuth = () => {
  return !!getAccessToken();
};

export const initAuth = () => {
  const token = getAccessToken();
  if (token) {
    console.log('Токен загружен из localStorage');
  }
};

// Инициализируем аутентификацию при загрузке модуля
initAuth();

// Экспортируем экземпляр axios для кастомных запросов
export { api };