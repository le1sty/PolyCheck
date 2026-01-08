// src/store.js
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { authAPI, subjectsAPI, getAccessToken, checkAuth, clearAccessToken } from './api'

export const useStore = create(
  persist(
    (set, get) => ({
      user: null,
      subjects: [],
      tasks: [
        { id: '1', disciplineId: '1', title: 'Домашнее задание 1', type: 'homework', completed: true },
        { id: '2', disciplineId: '1', title: 'Контрольная работа', type: 'test', completed: false },
        { id: '3', disciplineId: '2', title: 'Лабораторная работа', type: 'lab', completed: true },
      ],
      settings: {
        theme: 'dark',
        notifications: true
      },
      isOnline: true,
      isLoading: false,
      error: null,
      
      initUserFromToken: async () => {
        const token = getAccessToken();
        if (token) {
          set({ 
            user: {
              id: '1',
              email: 'user@example.com',
              name: 'User',
              groupName: 'ИТ-101'
            }
          });
        }
      },
      
      // Регистрация с обработкой ошибок axios
      register: async (email, password, groupName) => {
        set({ isLoading: true, error: null });
        
        try {
          const data = await authAPI.register(email, password, groupName);
          
          // Автоматически логинимся после регистрации
          const loginData = await authAPI.login(email, password);
          
          set({
            user: {
              id: data.id.toString(),
              email: data.email,
              name: email.split('@')[0],
              groupName: data.group_name,
              groupId: data.group_id
            },
            isLoading: false
          });
          
          return { success: true, data };
        } catch (error) {
          console.error('Ошибка регистрации:', error);
          
          let errorMessage = 'Произошла ошибка при регистрации';
          
          if (error.detail === 'REGISTER_USER_ALREADY_EXISTS') {
            errorMessage = 'Пользователь с таким email уже существует';
          } else if (error.detail) {
            errorMessage = error.detail;
          } else if (error.message) {
            errorMessage = error.message;
          }
          
          set({ error: errorMessage, isLoading: false });
          throw new Error(errorMessage);
        }
      },
      
      // Вход с обработкой ошибок axios
      login: async (email, password) => {
        set({ isLoading: true, error: null });
        
        try {
          const data = await authAPI.login(email, password);
          
          set({ 
            user: { 
              id: Date.now().toString(), 
              email, 
              name: email.split('@')[0],
              groupName: 'ИТ-101'
            },
            isLoading: false
          });
          
          return { success: true, data };
        } catch (error) {
          console.error('Ошибка входа:', error);
          
          let errorMessage = 'Произошла ошибка при входе';
          
          if (error.detail === 'LOGIN_BAD_CREDENTIALS') {
            errorMessage = 'Неверный email или пароль';
          } else if (error.detail) {
            errorMessage = error.detail;
          } else if (error.message) {
            errorMessage = error.message;
          }
          
          set({ error: errorMessage, isLoading: false });
          throw new Error(errorMessage);
        }
      },
      
      // Демо вход
      demoLogin: (email) => set({ 
        user: { 
          id: Date.now().toString(), 
          email, 
          name: email.split('@')[0],
          groupName: 'ИТ-101'
        } 
      }),
      
      // Выход
      logout: async () => {
        set({ isLoading: true });
        
        try {
          await authAPI.logout();
        } catch (error) {
          console.error('Ошибка при выходе:', error);
        } finally {
          clearAccessToken();
          set({ user: null, subjects: [], isLoading: false });
        }
      },
      
      // Загрузка предметов
      loadSubjects: async () => {
        set({ isLoading: true, error: null });
        
        try {
          const data = await subjectsAPI.getSubjects();
          const subjects = data.map(subject => ({
            id: subject.id.toString(),
            name: subject.name,
            activities: subject.activities || []
          }));
          
          set({ subjects, isLoading: false });
          return subjects;
        } catch (error) {
          console.error('Ошибка загрузки предметов:', error);
          set({ error: 'Не удалось загрузить предметы', isLoading: false });
          return [];
        }
      },
      
      // Добавление предмета
      addSubject: async (name) => {
        set({ isLoading: true, error: null });
        
        try {
          const data = await subjectsAPI.addSubject(name);
          const newSubject = {
            id: data.id.toString(),
            name: data.name,
            activities: data.activities || []
          };
          
          set(state => ({
            subjects: [...state.subjects, newSubject],
            isLoading: false
          }));
          
          return newSubject;
        } catch (error) {
          console.error('Ошибка добавления предмета:', error);
          
          let errorMessage = 'Не удалось добавить предмет';
          if (error.detail) {
            errorMessage = error.detail;
          }
          
          set({ error: errorMessage, isLoading: false });
          throw new Error(errorMessage);
        }
      },
      
      // Удаление предмета
      deleteSubject: async (subjectId) => {
        set({ isLoading: true, error: null });
        
        try {
          await subjectsAPI.deleteSubject(parseInt(subjectId));
          
          set(state => ({
            subjects: state.subjects.filter(s => s.id !== subjectId),
            tasks: state.tasks.filter(task => task.disciplineId !== subjectId),
            isLoading: false
          }));
          
          return true;
        } catch (error) {
          console.error('Ошибка удаления предмета:', error);
          
          let errorMessage = 'Не удалось удалить предмет';
          if (error.detail) {
            errorMessage = error.detail;
          }
          
          set({ error: errorMessage, isLoading: false });
          throw new Error(errorMessage);
        }
      },
      
      // Очистка ошибки
      clearError: () => set({ error: null }),
      
      // Остальные методы (локальные)
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
        const newTheme = state.settings.theme === 'dark' ? 'light' : 'dark';
        
        if (newTheme === 'light') {
          document.documentElement.setAttribute('data-theme', 'light');
        } else {
          document.documentElement.removeAttribute('data-theme');
        }
        
        return {
          settings: { 
            ...state.settings, 
            theme: newTheme
          }
        };
      }),
      
      setOnlineStatus: (status) => set({ isOnline: status }),
      
      getSubjectsWithProgress: () => {
        const { subjects, tasks } = get();
        return subjects.map(subject => {
          const subjectTasks = tasks.filter(t => t.disciplineId === subject.id);
          const completedCount = subjectTasks.filter(t => t.completed).length;
          const totalCount = subjectTasks.length;
          
          return {
            ...subject,
            progress: totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0,
            completedCount,
            totalCount
          };
        });
      },
      
      getSubjectById: (subjectId) => {
        const { subjects, tasks } = get();
        const subject = subjects.find(s => s.id === subjectId);
        if (!subject) return null;
        
        const subjectTasks = tasks.filter(t => t.disciplineId === subjectId);
        const completedCount = subjectTasks.filter(t => t.completed).length;
        const totalCount = subjectTasks.length;
        
        return {
          ...subject,
          tasks: subjectTasks,
          progress: totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0,
          completedCount,
          totalCount
        };
      },

      getTasksStats: () => {
        const { tasks } = get();
        const completed = tasks.filter(t => t.completed).length;
        const total = tasks.length;
        const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;
        
        return {
          completed,
          total,
          completionRate
        };
      }
    }),
    {
      name: 'poly-stats-storage',
      getStorage: () => localStorage,
      onRehydrateStorage: () => (state) => {
        if (state?.settings?.theme === 'light') {
          document.documentElement.setAttribute('data-theme', 'light');
        }
        if (checkAuth() && !state?.user) {
          state?.initUserFromToken?.();
        }
      }
    }
  )
);

export const mockUsers = [
  { email: 'student@university.ru', password: '123456' },
  { email: 'test@test.com', password: 'test123' }
];