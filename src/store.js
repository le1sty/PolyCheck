import { create } from 'zustand'

export const useStore = create((set, get) => ({
  // Пользователь
  user: {
    id: 1,
    name: 'Иван Петров',
    email: 'ivan@example.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=student'
  },
  
  // Задачи
  tasks: [
    { id: 1, text: 'Изучить Preact', completed: true },
    { id: 2, text: 'Настроить PWA', completed: false },
    { id: 3, text: 'Создать компоненты', completed: false },
    { id: 4, text: 'Добавить стили', completed: true },
    { id: 5, text: 'Протестировать приложение', completed: false }
  ],
  
  // Настройки
  settings: {
    theme: 'light',
    notifications: true
  },
  
  // Онлайн статус
  isOnline: true,
  
  // Действия
  addTask: (text) => set((state) => ({
    tasks: [...state.tasks, { id: Date.now(), text, completed: false }]
  })),
  
  toggleTask: (id) => set((state) => ({
    tasks: state.tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    )
  })),
  
  deleteTask: (id) => set((state) => ({
    tasks: state.tasks.filter(task => task.id !== id)
  })),
  
  updateUser: (userData) => set({ user: { ...get().user, ...userData } }),
  
  toggleTheme: () => set((state) => ({
    settings: { 
      ...state.settings, 
      theme: state.settings.theme === 'light' ? 'dark' : 'light' 
    }
  })),
  
  toggleNotifications: () => set((state) => ({
    settings: { 
      ...state.settings, 
      notifications: !state.settings.notifications 
    }
  })),
  
  setOnlineStatus: (status) => set({ isOnline: status })
}))