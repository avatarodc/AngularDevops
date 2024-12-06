import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  showNotification(message: string): void {
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg
                            transform transition-transform duration-300 flex items-center space-x-2`;

    // Icône de succès
    const icon = document.createElement('span');
    icon.innerHTML = `
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
      </svg>
    `;

    const text = document.createElement('span');
    text.textContent = message;

    notification.appendChild(icon);
    notification.appendChild(text);
    document.body.appendChild(notification);

    // Animation d'entrée
    setTimeout(() => {
      notification.style.transform = 'translateY(10px)';
    }, 100);

    // Suppression après 3 secondes
    setTimeout(() => {
      notification.style.transform = 'translateY(-100%)';
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 300);
    }, 3000);
  }
}
