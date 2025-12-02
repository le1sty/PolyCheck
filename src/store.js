import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useStore = create(
  persist(
    (set, get) => ({
      // Пользователь
      user: null,
      
      // Группы
      groups: [
        { id: 'it-101', name: 'ИТ-101', faculty: 'Информационные технологии' },
        { id: 'it-102', name: 'ИТ-102', faculty: 'Информационные технологии' },
        { id: 'cs-201', name: 'КС-201', faculty: 'Компьютерные науки' },
      ],
      
      // Дисциплины
      disciplines: [
        { id: 'math-1', name: 'Математический анализ', groupId: 'it-101', color: '#4f46e5' },
        { id: 'prog-1', name: 'Программирование', groupId: 'it-101', color: '#10b981' },
        { id: 'web-1', name: 'Веб-технологии', groupId: 'it-101', color: '#f59e0b' },
        { id: 'db-1', name: 'Базы данных', groupId: 'it-101', color: '#ef4444' },
      ],
      
      // Задачи
      tasks: [
        { id: '1', disciplineId: 'math-1', title: 'Домашнее задание 1', type: 'homework', completed: true },
        { id: '2', disciplineId: 'math-1', title: 'Контрольная работа', type: 'test', completed: false },
        { id: '3', disciplineId: 'prog-1', title: 'Лабораторная работа', type: 'lab', completed: true },
      ],
      
      // Настройки
      settings: {
        theme: 'light', // По умолчанию светлая тема
        notifications: true
      },
      
      // Онлайн статус
      isOnline: true,
      
      // Действия
      login: (email) => set({ 
        user: { 
          id: Date.now().toString(), 
          email, 
          name: email.split('@')[0],
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`
        } 
      }),
      
      logout: () => set({ user: null }),
      
      selectGroup: (groupId) => set(state => ({
        user: state.user ? { ...state.user, groupId } : null
      })),
      
      addTask: (disciplineId, title, type) => set(state => ({
        tasks: [
          ...state.tasks,
          {
            id: Date.now().toString(),
            disciplineId,
            title,
            type,
            completed: false
          }
        ]
      })),
      
      toggleTask: (taskId) => set(state => ({
        tasks: state.tasks.map(task => 
          task.id === taskId ? { ...task, completed: !task.completed } : task
        )
      })),
      
      deleteTask: (taskId) => set(state => ({
        tasks: state.tasks.filter(task => task.id !== taskId)
      })),
      
      toggleTheme: () => set(state => {
        const newTheme = state.settings.theme === 'light' ? 'dark' : 'light'
        
        // Применяем тему к документу
        if (newTheme === 'dark') {
          document.documentElement.setAttribute('data-theme', 'dark')
        } else {
          document.documentElement.removeAttribute('data-theme')
        }
        
        return {
          settings: { 
            ...state.settings, 
            theme: newTheme
          }
        }
      }),
      
      setOnlineStatus: (status) => set({ isOnline: status }),
      
      // Геттеры
      getDisciplinesByGroup: (groupId) => {
        const { disciplines, tasks } = get()
        return disciplines
          .filter(d => d.groupId === groupId)
          .map(discipline => {
            const disciplineTasks = tasks.filter(t => t.disciplineId === discipline.id)
            const completedCount = disciplineTasks.filter(t => t.completed).length
            const totalCount = disciplineTasks.length
            
            return {
              ...discipline,
              progress: totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0,
              completedCount,
              totalCount
            }
          })
      },
      
      getDisciplineById: (disciplineId) => {
        const { disciplines, tasks } = get()
        const discipline = disciplines.find(d => d.id === disciplineId)
        if (!discipline) return null
        
        const disciplineTasks = tasks.filter(t => t.disciplineId === disciplineId)
        const completedCount = disciplineTasks.filter(t => t.completed).length
        const totalCount = disciplineTasks.length
        
        return {
          ...discipline,
          tasks: disciplineTasks,
          progress: totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0,
          completedCount,
          totalCount
        }
      },

      getTasksStats: () => {
        const { tasks } = get()
        const completed = tasks.filter(t => t.completed).length
        const total = tasks.length
        const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0
        
        return {
          completed,
          total,
          completionRate
        }
      }
    }),
    {
      name: 'student-tracker-storage',
      getStorage: () => localStorage,
      // При загрузке из localStorage применяем сохраненную тему
      onRehydrateStorage: () => (state) => {
        if (state?.settings?.theme === 'dark') {
          document.documentElement.setAttribute('data-theme', 'dark')
        }
      }
    }
  )
)

// Моковые пользователи для тестирования
export const mockUsers = [
  { email: 'student@university.ru', password: '123456' },
  { email: 'test@test.com', password: 'test123' }
]