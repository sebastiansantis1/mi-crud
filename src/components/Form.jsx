import React, { useState, useEffect } from 'react';

function Form({ addOrUpdateStudent, studentToEdit, setStudentToEdit }) {
    const [formData, setFormData] = useState({
        id: '',
        nombre: '',
        asignatura: '',
        promedio: '',
        apreciacion: ''
    });

    useEffect(() => {
        if (studentToEdit) {
            setFormData({
                id: studentToEdit.id,
                nombre: studentToEdit.nombre,
                asignatura: studentToEdit.asignatura,
                promedio: studentToEdit.promedio,
                apreciacion: calcularApreciacion(studentToEdit.promedio)
            });
        } else {
            setFormData({
                id: '',
                nombre: '',
                asignatura: '',
                promedio: '',
                apreciacion: ''
            });
        }
    }, [studentToEdit]);

    const calcularApreciacion = (promedio) => {
        const num = parseFloat(promedio) || 0;
        if (num >= 1 && num <= 3.9) return "Deficiente";
        if (num >= 4.0 && num <= 5.5) return "Con mejora";
        if (num >= 5.6 && num <= 6.4) return "Buen trabajo";
        if (num >= 6.5 && num <= 7.0) return "Destacado";
        return "";
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => {
            const newData = { ...prev, [name]: value };
            if (name === 'promedio') {
                newData.apreciacion = calcularApreciacion(value);
            }
            return newData;
        });
    };

    const validateForm = () => {
        if (!formData.nombre.trim()) {
            alert("El nombre del alumno es requerido");
            return false;
        }
        if (!formData.asignatura.trim()) {
            alert("La asignatura es requerida");
            return false;
        }
        const promedioNum = parseFloat(formData.promedio);
        if (isNaN(promedioNum) || promedioNum < 1 || promedioNum > 7) {
            alert("El promedio debe ser un número entre 1.0 y 7.0");
            return false;
        }
        return true;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            addOrUpdateStudent({
                id: studentToEdit ? studentToEdit.id : Date.now().toString(),
                nombre: formData.nombre,
                asignatura: formData.asignatura,
                promedio: formData.promedio,
                apreciacion: formData.apreciacion
            });
            setFormData({
                id: '',
                nombre: '',
                asignatura: '',
                promedio: '',
                apreciacion: ''
            });
            if (studentToEdit) setStudentToEdit(null);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="student-form">
            <div className="form-group">
                <label>Nombre del Alumno:</label>
                <input
                    type="text"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    placeholder="Ingrese nombre completo"
                    required
                />
            </div>

            <div className="form-group">
                <label>Asignatura:</label>
                <input
                    type="text"
                    name="asignatura"
                    value={formData.asignatura}
                    onChange={handleChange}
                    placeholder="Ingrese asignatura"
                    required
                />
            </div>

            <div className="form-group">
                <label>Promedio (1.0 - 7.0):</label>
                <input
                    type="number"
                    name="promedio"
                    value={formData.promedio}
                    onChange={handleChange}
                    min="1"
                    max="7"
                    step="0.1"
                    placeholder="Ej: 5.6"
                    required
                />
            </div>

            <div className="form-group">
                <label>Escala de Apreciación:</label>
                <input
                    type="text"
                    name="apreciacion"
                    value={formData.apreciacion}
                    readOnly
                    className="apreciacion-input"
                />
            </div>

            <button type="submit" className="submit-btn">
                {studentToEdit ? "Actualizar Estudiante" : "Agregar Estudiante"}
            </button>
        </form>
    );
}

export default Form;