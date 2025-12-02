// Моковые данные для имитации API
const mockApi = {
  // Задержка для имитации сетевого запроса
  delay: (ms) => new Promise(resolve => setTimeout(resolve, ms)),
  
  // Получить задачи
  async getTasks() {
    await this.delay(500)
    return [
      { id: 1, title: 'Первая задача', description: 'Описание задачи', completed: true },
      { id: 2, title: 'Вторая задача', description: 'Еще одна задача', completed: false },
      { id: 3, title: 'Третья задача', description: 'Важная задача', completed: false }
    ]
  },
  
  // Создать задачу
  async createTask(task) {
    await this.delay(300)
    return { id: Date.now(), ...task, createdAt: new Date().toISOString() }
  },
  
  // Обновить задачу
  async updateTask(id, updates) {
    await this.delay(300)
    return { id, ...updates, updatedAt: new Date().toISOString() }
  },
  
  // Удалить задачу
  async deleteTask(id) {
    await this.delay(300)
    return { success: true, id }
  },
  
  // Получить пользователя
  async getUser() {
    await this.delay(400)
    return {
      id: 1,
      name: 'Тестовый Пользователь',
      email: 'test@example.com',
      role: 'student',
      joinedAt: '2024-01-01'
    }
  },
  
  // Обновить профиль
  async updateProfile(data) {
    await this.delay(500)
    return { success: true, user: data }
  },
  
  // Получить статистику
  async getStats() {
    await this.delay(400)
    return {
      totalTasks: 15,
      completedTasks: 8,
      pendingTasks: 7,
      productivity: 65,
      streak: 5
    }
  }
}

export default mockApi