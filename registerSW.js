if('serviceWorker' in navigator) {window.addEventListener('load', () => {navigator.serviceWorker.register('/Klikier/sw.js', { scope: '/Klikier/' })})}