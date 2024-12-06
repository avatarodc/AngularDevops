import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-modal',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div *ngIf="isOpen" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div class="bg-white rounded-lg p-6 w-full max-w-md">
                <div class="flex justify-between items-center mb-4">
                    <h3 class="text-lg font-bold">{{title}}</h3>
                    <button
                        (click)="close.emit()"
                        class="text-gray-500 hover:text-gray-700">
                        ×
                    </button>
                </div>
                <div>
                    <ng-content></ng-content>
                </div>
            </div>
        </div>
    `
})
export class ModalComponent {
    @Input() isOpen = false;
    @Input() title = '';
    @Output() close = new EventEmitter<void>();
}
