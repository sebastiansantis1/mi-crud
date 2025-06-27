import React, { useState, useEffect } from 'react';
import Form from './components/form';
import List from './components/List';
import './App.css';

function App() {
    const [students, setStudents] = useState(() => {
        // Cargar datos iniciales directamente en el estado inicial
        try {
            const savedStudents = localStorage.getItem('students');
            if (savedStudents) {
                const parsedStudents = JSON.parse(savedStudents);
                return Array.isArray(parsedStudents) ? parsedStudents : [];
            }
        } catch (error) {
            console.error("Error al cargar estudiantes:", error);
        }
        return [];
    });

    const [studentToEdit, setStudentToEdit] = useState(null);

    // Guardar datos cuando cambian
    useEffect(() => {
        localStorage.setItem('students', JSON.stringify(students));
    }, [students]);

    const addOrUpdateStudent = (student) => {
        if (studentToEdit) {
            setStudents(students.map(s => 
                s.id === student.id ? student : s
            ));
        } else {
            setStudents([...students, student]);
        }
    };

    const deleteStudent = (id) => {
        setStudents(students.filter(student => student.id !== id));
    };

    return (
        <div className="app-container">
            <div className="app">
                <h1 className="neon-effect">Evaluación de Alumnos</h1>
                <Form 
                    addOrUpdateStudent={addOrUpdateStudent}
                    studentToEdit={studentToEdit}
                    setStudentToEdit={setStudentToEdit}
                />
                <div className="student-list-container">
                    <List 
                        items={students}
                        deleteItem={deleteStudent}
                        editItem={setStudentToEdit}
                    />
                </div>
            </div>
        </div>
    );
}

export default App;