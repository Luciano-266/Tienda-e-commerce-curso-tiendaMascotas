import React, { useState } from 'react';

function AdminPanel({ inventario, setInventario, volver }) {
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('Perro');
  
  // Estados para el formulario de Crear/Editar
  const [editandoId, setEditandoId] = useState(null); // Si es null, estamos Creando. Si tiene ID, estamos Editando.
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const [img, setImg] = useState('');

  const productosActuales = inventario[categoriaSeleccionada] || [];

  // Lógica para Guardar (Crear o Editar)
  const manejarGuardar = (e) => {
    e.preventDefault();

    // --- Validaciones (Exigido por la rúbrica para nivel Sobresaliente) ---
    if (nombre.trim().length < 3) {
      alert("El nombre del producto debe tener al menos 3 caracteres.");
      return;
    }
    if (isNaN(precio) || Number(precio) <= 0) {
      alert("Por favor, ingresa un precio válido mayor a 0.");
      return;
    }
    if (!img.trim().startsWith('http')) {
      alert("Por favor, ingresa una URL de imagen válida (que empiece con http).");
      return;
    }

    let inventarioActualizado = { ...inventario };

    if (editandoId !== null) {
      // MODO EDITAR (Update)
      inventarioActualizado[categoriaSeleccionada] = inventarioActualizado[categoriaSeleccionada].map(p => 
        p.id === editandoId ? { ...p, nombre, precio: Number(precio), img } : p
      );
      alert("¡Producto actualizado con éxito!");
    } else {
      // MODO CREAR (Create)
      const nuevoProducto = {
        id: Date.now(), // ID único basado en el tiempo
        nombre,
        precio: Number(precio),
        img
      };
      inventarioActualizado[categoriaSeleccionada] = [...productosActuales, nuevoProducto];
      alert("¡Producto agregado con éxito!");
    }

    // Guardar en Estado Global y en Local Storage (Persistencia Rúbrica)
    setInventario(inventarioActualizado);
    localStorage.setItem('inventario_mascotas', JSON.stringify(inventarioActualizado));

    // Limpiar Formulario
    resetearFormulario();
  };

  // Cargar datos en el formulario para editar
  const iniciarEditar = (producto) => {
    setEditandoId(producto.id);
    setNombre(producto.nombre);
    setPrecio(producto.precio);
    setImg(producto.img);
  };

  // Lógica para Eliminar (Delete)
  const manejarEliminar = (id) => {
    if (window.confirm("¿Seguro que deseas eliminar este producto?")) {
      let inventarioActualizado = { ...inventario };
      inventarioActualizado[categoriaSeleccionada] = inventarioActualizado[categoriaSeleccionada].filter(p => p.id !== id);
      
      setInventario(inventarioActualizado);
      localStorage.setItem('inventario_mascotas', JSON.stringify(inventarioActualizado));
      alert("Producto eliminado.");
    }
  };

  const resetearFormulario = () => {
    setEditandoId(null);
    setNombre('');
    setPrecio('');
    setImg('');
  };

  return (
    <section style={{ padding: '40px 5%', backgroundColor: '#f9f9f9', minHeight: '80vh' }}>
      <div className="contenedor-app" style={{ color: '#333' }}>
        
        <header className="admin-header">
          <button onClick={volver} className="btn-retroceder">← Volver al Inicio</button>
          <div className="info-seccion">
            <h2>Panel de Control Inventario</h2>
            <span className="badge">Modo Administrador CRUD</span>
          </div>
        </header>

        {/* Selector de Categoría para Gestionar */}
        <div style={{ marginBottom: '20px', textAlign: 'center' }}>
          <label style={{ fontWeight: 'bold', marginRight: '10px' }}>Selecciona Categoría a Gestionar: </label>
          <select 
            value={categoriaSeleccionada} 
            onChange={(e) => { setCategoriaSeleccionada(e.target.value); resetearFormulario(); }}
            style={{ padding: '8px', borderRadius: '5px', fontSize: '16px' }}
          >
            <option value="Perro">Perros 🐶</option>
            <option value="Gato">Gatos 🐱</option>
            <option value="Otros">Otros Animales 🐹</option>
          </select>
        </div>

        {/* Formulario Integrado (Crear / Editar) */}
        <div style={{ background: 'white', padding: '25px', borderRadius: '12px', boxShadow: '0 4px 10px rgba(0,0,0,0.05)', marginBottom: '30px' }}>
          <h3>{editandoId !== null ? "📝 Editar Producto" : "➕ Agregar Nuevo Producto"}</h3>
          <form onSubmit={manejarGuardar} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginTop: '15px', maxWidth: '100%' }}>
            <input 
              type="text" 
              placeholder="Nombre del Producto (ej: Juguete de Goma)" 
              value={nombre} 
              onChange={(e) => setNombre(e.target.value)} 
              required 
            />
            <input 
              type="number" 
              placeholder="Precio ($)" 
              value={precio} 
              onChange={(e) => setPrecio(e.target.value)} 
              required 
            />
            <input 
              type="text" 
              placeholder="URL de la Imagen (https://...)" 
              value={img} 
              onChange={(e) => setImg(e.target.value)} 
              required 
              style={{ gridColumn: 'span 2' }}
            />
            <div style={{ gridColumn: 'span 2', display: 'flex', gap: '10px' }}>
              <button type="submit" style={{ backgroundColor: '#acbd99', width: '100%' }}>
                {editandoId !== null ? "Actualizar Producto" : "Guardar Producto"}
              </button>
              {editandoId !== null && (
                <button type="button" onClick={resetearFormulario} style={{ backgroundColor: '#e74c3c', width: '30%' }}>
                  Cancelar
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Tabla de Productos Existentes (READ) */}
        <div className="tabla-container">
          <div className="tabla-header">
            <h3>Lista de Productos en {categoriaSeleccionada}s ({productosActuales.length})</h3>
          </div>
          <table className="tabla-visual" style={{ width: '100%' }}>
            <thead>
              <tr>
                <th>Imagen</th>
                <th>Nombre</th>
                <th>Precio</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {productosActuales.length === 0 ? (
                <tr>
                  <td colSpan="4" style={{ textAlign: 'center', padding: '20px' }}>No hay productos en esta categoría. ¡Agrega el primero arriba!</td>
                </tr>
              ) : (
                productosActuales.map(p => (
                  <tr key={p.id}>
                    <td><img src={p.img} alt={p.nombre} style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '5px' }} /></td>
                    <td style={{ fontWeight: 'bold' }}>{p.nombre}</td>
                    <td>${p.precio.toLocaleString()}</td>
                    <td>
                      <button className="btn-accion" onClick={() => iniciarEditar(p)} title="Editar">✏️</button>
                      <button className="btn-accion" onClick={() => manejarEliminar(p.id)} title="Eliminar" style={{ color: '#e74c3c' }}>🗑️</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

      </div>
    </section>
  );
}

export default AdminPanel;