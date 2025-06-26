import React, { useState, useEffect } from 'react';
import Form from './components/Form';
import List from './components/List';
import './App.css';

function App() {
    const [students, setStudents] = useState([]);
    const [studentToEdit, setStudentToEdit] = useState(null);

    // Cargar datos de localStorage al iniciar
    useEffect(() => {
        const savedStudents = localStorage.getItem('students');
        if (savedStudents) {
            setStudents(JSON.parse(savedStudents));
        }
    }, []);

    // Guardar en localStorage cuando cambia la lista
    useEffect(() => {
        localStorage.setItem('students', JSON.stringify(students));
    }, [students]);

    const addOrUpdateStudent = (student) => {
        if (studentToEdit) {
            // Editar estudiante existente
            setStudents(students.map(s => 
                s.id === student.id ? student : s
            ));
        } else {
            // Agregar nuevo estudiante
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