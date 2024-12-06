import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Student } from '../../models/student.model';
import { StudentService } from '../../services/student.service';
import { StudentFormComponent } from '../student-form/student-form.component';
import { ModalComponent } from '../modal/modal.component';

@Component({
    selector: 'app-student-list',
    standalone: true,
    imports: [CommonModule, StudentFormComponent, ModalComponent],
    template: `
        <div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
            <div class="max-w-6xl mx-auto bg-white rounded-xl shadow-lg p-8">
                <!-- Header Section -->
                <div class="flex justify-between items-center mb-8">
                    <div>
                        <h2 class="text-3xl font-bold text-gray-800">Liste des Etudiants</h2>
                        <p class="text-gray-600 mt-1">Gestion des étudiants de l'école</p>
                    </div>
                    <button
                        class="bg-gradient-to-r from-green-400 to-green-500 text-white px-6 py-3 rounded-lg
                               hover:from-green-500 hover:to-green-600 transform hover:scale-105 transition-all duration-200
                               shadow-md flex items-center space-x-2 font-medium"
                        (click)="openAddModal()">
                        <span class="text-xl">+</span>
                        <span>Ajouter un étudiant</span>
                    </button>
                </div>

                <!-- Table Section -->
                <div class="bg-white rounded-xl overflow-hidden shadow-md">
                    <table class="w-full">
                        <thead>
                            <tr class="bg-gradient-to-r from-gray-50 to-gray-100">
                                <th class="px-6 py-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">ID</th>
                                <th class="px-6 py-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Prénom</th>
                                <th class="px-6 py-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Nom</th>
                                <th class="px-6 py-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-200">
                            <tr *ngFor="let student of students"
                                class="hover:bg-gray-50 transition-colors duration-150">
                                <td class="px-6 py-4 whitespace-nowrap text-gray-500">{{student.id}}</td>
                                <td class="px-6 py-4 whitespace-nowrap text-gray-800 font-medium">{{student.firstName}}</td>
                                <td class="px-6 py-4 whitespace-nowrap text-gray-800">{{student.lastName}}</td>
                                <td class="px-6 py-4 whitespace-nowrap space-x-3">
                                    <button
                                        class="inline-flex items-center px-4 py-2 bg-blue-500 hover:bg-blue-600
                                               text-white rounded-lg transition-all duration-200 transform hover:scale-105
                                               shadow-sm hover:shadow focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                                        (click)="openEditModal(student)">
                                        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                                        </svg>
                                        Modifier
                                    </button>
                                    <button
                                        class="inline-flex items-center px-4 py-2 bg-red-500 hover:bg-red-600
                                               text-white rounded-lg transition-all duration-200 transform hover:scale-105
                                               shadow-sm hover:shadow focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                                        (click)="onDelete(student.id)">
                                        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                                        </svg>
                                        Supprimer
                                    </button>
                                </td>
                            </tr>
                            <tr *ngIf="students.length === 0">
                                <td colspan="4" class="text-center py-12">
                                    <div class="flex flex-col items-center justify-center text-gray-500">
                                        <svg class="w-16 h-16 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                  d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"/>
                                        </svg>
                                        <p class="text-xl font-medium mb-1">Aucun étudiant enregistré</p>
                                        <p class="text-gray-400">Cliquez sur le bouton "Ajouter" pour commencer</p>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <!-- Modals -->
                <app-modal
                    [isOpen]="isAddModalOpen"
                    title="Ajouter un nouvel étudiant"
                    (close)="closeAddModal()">
                    <app-student-form
                        (studentSubmitted)="onStudentAdded()">
                    </app-student-form>
                </app-modal>

                <app-modal
                    [isOpen]="!!selectedStudent"
                    title="Modifier les informations de l'étudiant"
                    (close)="closeEditModal()">
                    <app-student-form
                        *ngIf="selectedStudent"
                        [student]="selectedStudent"
                        (studentSubmitted)="onStudentUpdated()">
                    </app-student-form>
                </app-modal>
            </div>
        </div>
    `
})
export class StudentListComponent implements OnInit {
    students: Student[] = [];
    selectedStudent: Student | null = null;
    isAddModalOpen = false;

    constructor(private studentService: StudentService) {}

    ngOnInit(): void {
        this.studentService.getStudents().subscribe(
            students => this.students = students
        );
    }

    openAddModal(): void {
        this.isAddModalOpen = true;
    }

    closeAddModal(): void {
        this.isAddModalOpen = false;
    }

    openEditModal(student: Student): void {
        this.selectedStudent = { ...student };
    }

    closeEditModal(): void {
        this.selectedStudent = null;
    }

    onStudentAdded(): void {
        this.closeAddModal();
    }

    onStudentUpdated(): void {
        this.closeEditModal();
    }

   // Dans la méthode onDelete du StudentListComponent
onDelete(id: number | undefined): void {
  if (id === undefined) return;

  const modal = document.createElement('div');
  modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
  modal.innerHTML = `
      <div class="bg-white rounded-lg p-6 max-w-sm mx-4">
          <h3 class="text-lg font-semibold mb-4">Confirmation de suppression</h3>
          <p class="text-gray-600 mb-6">Êtes-vous sûr de vouloir supprimer cet étudiant ?</p>
          <div class="flex justify-end space-x-3">
              <button id="cancel" class="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                  Annuler
              </button>
              <button id="confirm" class="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
                  Supprimer
              </button>
          </div>
      </div>
  `;

  document.body.appendChild(modal);

  modal.querySelector('#cancel')?.addEventListener('click', () => {
      document.body.removeChild(modal);
  });

  modal.querySelector('#confirm')?.addEventListener('click', () => {
      this.studentService.deleteStudent(id);
      document.body.removeChild(modal);
  });
}
}

