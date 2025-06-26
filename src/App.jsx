import React, { useState, useEffect } from 'react';
import Form from './components/Form';
import List from './components/List';
import './App.css';

function App() {
    const [students, setStudents] = useState([]);
    const [studentToEdit, setStudentToEdit] = useState(null);

    // 1. Cargar datos INICIALES con verificación de errores
    useEffect(() => {
        const loadStudents = () => {
            try {
                const savedStudents = localStorage.getItem('students');
                if (savedStudents) {
                    const parsedStudents = JSON.parse(savedStudents);
                    if (Array.isArray(parsedStudents)) {
                        setStudents(parsedStudents);
                    } else {
                        console.error("Los datos no son un array válido:", parsedStudents);
                        localStorage.removeItem('students');
                    }
                }
            } catch (error) {
                console.error("Error al cargar estudiantes:", error);
                localStorage.removeItem('students');
            }
        };
        
        loadStudents();
    }, []);

    // 2. Guardar datos CADA QUE CAMBIAN
    useEffect(() => {
        const saveStudents = () => {
            try {
                localStorage.setItem('students', JSON.stringify(students));
                console.log("Datos guardados:", students); // Para depuración
            } catch (error) {
                console.error("Error al guardar estudiantes:", error);
            }
        };
        
        saveStudents();
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