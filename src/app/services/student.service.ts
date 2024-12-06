// src/app/services/student.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Student } from '../models/student.model';
import { NotificationService } from './notification.service';

@Injectable({
    providedIn: 'root'
})
export class StudentService {
    private students: Student[] = [];
    private studentsSubject = new BehaviorSubject<Student[]>([]);

    constructor(private notificationService: NotificationService) {}

    getStudents(): Observable<Student[]> {
        return this.studentsSubject.asObservable();
    }

    addStudent(student: Student): void {
        const newStudent = {
            ...student,
            id: this.generateId()
        };
        this.students.push(newStudent);
        this.studentsSubject.next([...this.students]);
        this.notificationService.showNotification('Étudiant ajouté avec succès !');
    }

    updateStudent(student: Student): void {
        const index = this.students.findIndex(s => s.id === student.id);
        if (index !== -1) {
            this.students[index] = student;
            this.studentsSubject.next([...this.students]);
            this.notificationService.showNotification('Étudiant modifié avec succès !');
        }
    }

    deleteStudent(id: number): void {
        this.students = this.students.filter(s => s.id !== id);
        this.studentsSubject.next([...this.students]);
        this.notificationService.showNotification('Étudiant supprimé avec succès !');
    }

    private generateId(): number {
        return this.students.length > 0
            ? Math.max(...this.students.map(s => s.id ?? 0)) + 1
            : 1;
    }
}
