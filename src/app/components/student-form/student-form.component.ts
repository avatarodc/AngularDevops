import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Student } from '../../models/student.model';
import { StudentService } from '../../services/student.service';

@Component({
    selector: 'app-student-form',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    template: `
        <form [formGroup]="studentForm" (ngSubmit)="onSubmit()" class="space-y-4">
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Prenom</label>
                <input
                    type="text"
                    formControlName="firstName"
                    class="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    [class.border-red-500]="studentForm.get('firstName')?.invalid && studentForm.get('firstName')?.touched"
                >
                <div
                    *ngIf="studentForm.get('firstName')?.invalid && studentForm.get('firstName')?.touched"
                    class="text-red-500 text-sm mt-1"
                >
                    Le prenom est requis (minimum 2 caracteres)
                </div>
            </div>

            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Nom</label>
                <input
                    type="text"
                    formControlName="lastName"
                    class="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    [class.border-red-500]="studentForm.get('lastName')?.invalid && studentForm.get('lastName')?.touched"
                >
                <div
                    *ngIf="studentForm.get('lastName')?.invalid && studentForm.get('lastName')?.touched"
                    class="text-red-500 text-sm mt-1"
                >
                    Le nom est requis (minimum 2 caracteres)
                </div>
            </div>

            <div class="flex justify-end">
                <button
                    type="submit"
                    [disabled]="studentForm.invalid"
                    class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {{ student ? 'Modifier' : 'Ajouter' }}
                </button>
            </div>
        </form>
    `
})
export class StudentFormComponent implements OnChanges {
    @Input() student: Student | null = null;
    @Output() studentSubmitted = new EventEmitter<void>();

    studentForm: FormGroup;

    constructor(
        private fb: FormBuilder,
        private studentService: StudentService
    ) {
        this.studentForm = this.createForm();
    }

    ngOnChanges(): void {
        if (this.student) {
            this.studentForm.patchValue(this.student);
        } else {
            this.studentForm.reset();
        }
    }

    private createForm(): FormGroup {
        return this.fb.group({
            id: [null],
            firstName: ['', [Validators.required, Validators.minLength(2)]],
            lastName: ['', [Validators.required, Validators.minLength(2)]]
        });
    }

    onSubmit(): void {
        if (this.studentForm.valid) {
            const studentData = this.studentForm.value;

            if (studentData.id) {
                this.studentService.updateStudent(studentData);
            } else {
                this.studentService.addStudent(studentData);
            }

            this.studentForm.reset();
            this.studentSubmitted.emit();
        }
    }
}
