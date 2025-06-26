import React from "react";

function Item({ item, deleteItem, editItem }) {
    return (
        <li>
            <div className="student-info">
                <p><strong>Nombre:</strong> {item.nombre}</p>
                <p><strong>Asignatura:</strong> {item.asignatura}</p>
                <p><strong>Promedio:</strong> {item.promedio}</p>
                <p><strong>Apreciación:</strong> <span className="neon-effect">{item.apreciacion}</span></p>
            </div>
            <div className="student-actions">
                <button onClick={() => editItem(item)} className="edit-btn">
                    Editar
                </button>
                <button onClick={() => deleteItem(item.id)} className="delete-btn">
                    Eliminar
                </button>
            </div>
        </li>
    );
}

export default Item;