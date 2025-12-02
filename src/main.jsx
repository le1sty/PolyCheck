import { render } from 'preact'
import { App } from './app.jsx'
import './index.css'

// Проверяем iOS
const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

// Регистрируем Service Worker
if ('serviceWorker' in navigator && !isIOS) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('Service Worker зарегистрирован:', registration);
      })
      .catch(error => {
        console.log('Service Worker регистрация не удалась:', error);
      });
  });
}

// Для iOS добавляем специальные обработчики
if (isIOS) {
  // Предотвращаем резиновую полосу
  document.addEventListener('touchmove', (e) => {
    if (e.scale !== 1) {
      e.preventDefault();
    }
  }, { passive: false });
  
  // Фиксируем высоту для iOS
  const setVH = () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  };
  
  window.addEventListener('resize', setVH);
  window.addEventListener('orientationchange', setVH);
  setVH();
}

render(<App />, document.getElementById('app'))