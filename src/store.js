import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useStore = create(
  persist(
    (set, get) => ({
      user: null,
      
      groups: [
        { id: 'it-101', name: 'ИТ-101', faculty: 'Информационные технологии' },
        { id: 'it-102', name: 'ИТ-102', faculty: 'Информационные технологии' },
        { id: 'cs-201', name: 'КС-201', faculty: 'Компьютерные науки' },
      ],
      
      disciplines: [
        { id: 'math-1', name: 'Математический анализ', groupId: 'it-101', color: '#ffffff' },
        { id: 'prog-1', name: 'Программирование', groupId: 'it-101', color: '#888888' },
        { id: 'web-1', name: 'Веб-технологии', groupId: 'it-101', color: '#444444' },
        { id: 'db-1', name: 'Базы данных', groupId: 'it-101', color: '#222222' },
      ],
      
      tasks: [
        { id: '1', disciplineId: 'math-1', title: 'Домашнее задание 1', type: 'homework', completed: true },
        { id: '2', disciplineId: 'math-1', title: 'Контрольная работа', type: 'test', completed: false },
        { id: '3', disciplineId: 'prog-1', title: 'Лабораторная работа', type: 'lab', completed: true },
      ],
      
      settings: {
        theme: 'dark',
        notifications: true
      },
      
      isOnline: true,
      
      // Регистрация нового пользователя
      register: (email, password, groupId) => set(state => {
        const existingUser = mockUsers.find(u => u.email === email);
        if (existingUser) {
          throw new Error('Пользователь с таким email уже существует');
        }
        
        // Добавляем пользователя в mockUsers
        mockUsers.push({ email, password });
        
        return {
          user: {
            id: Date.now().toString(),
            email,
            name: email.split('@')[0],
            groupId,
            avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`
          }
        };
      }),
      
      login: (email) => set({ 
        user: { 
          id: Date.now().toString(), 
          email, 
          name: email.split('@')[0],
          groupId: 'it-101',
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`
        } 
      }),
      
      logout: () => set({ user: null }),
      
      // Добавление новой дисциплины
      addDiscipline: (name, groupId) => set(state => ({
        disciplines: [
          ...state.disciplines,
          {
            id: `discipline-${Date.now()}`,
            name,
            groupId,
            color: '#ffffff'
          }
        ]
      })),
      
      // Удаление дисциплины и всех ее задач
      deleteDiscipline: (disciplineId) => set(state => {
        // Сначала удаляем все задачи этой дисциплины
        const updatedTasks = state.tasks.filter(task => task.disciplineId !== disciplineId);
        
        // Затем удаляем саму дисциплину
        const updatedDisciplines = state.disciplines.filter(d => d.id !== disciplineId);
        
        return {
          disciplines: updatedDisciplines,
          tasks: updatedTasks
        };
      }),
      
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
      
      // Получение всех групп для регистрации
      getAllGroups: () => {
        return get().groups;
      },
      
      getDisciplinesByGroup: (groupId) => {
        const { disciplines, tasks } = get();
        return disciplines
          .filter(d => d.groupId === groupId)
          .map(discipline => {
            const disciplineTasks = tasks.filter(t => t.disciplineId === discipline.id);
            const completedCount = disciplineTasks.filter(t => t.completed).length;
            const totalCount = disciplineTasks.length;
            
            return {
              ...discipline,
              progress: totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0,
              completedCount,
              totalCount
            };
          });
      },
      
      getDisciplineById: (disciplineId) => {
        const { disciplines, tasks } = get();
        const discipline = disciplines.find(d => d.id === disciplineId);
        if (!discipline) return null;
        
        const disciplineTasks = tasks.filter(t => t.disciplineId === disciplineId);
        const completedCount = disciplineTasks.filter(t => t.completed).length;
        const totalCount = disciplineTasks.length;
        
        return {
          ...discipline,
          tasks: disciplineTasks,
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
      }
    }
  )
);

export const mockUsers = [
  { email: 'student@university.ru', password: '123456' },
  { email: 'test@test.com', password: 'test123' }
];