import React from 'react';

function Header({ setVista, cartCount, vista }) {
  
  // Función para movernos por las secciones de la página de inicio de forma limpia
  const navegarA = (e, seccionId) => {
    e.preventDefault(); // Evita que se ensucie la URL con el '#'
    setVista('inicio');
    
    // Esperamos un milisegundo a que cargue la vista de inicio y hacemos scroll suave
    setTimeout(() => {
      const elemento = document.getElementById(seccionId);
      if (elemento) {
        elemento.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <header className="header">
      <h1 className="logo" style={{ cursor: 'pointer' }} onClick={(e) => navegarA(e, 'hero-section')}>
        PetWorld
      </h1>
      <nav className="nav">
        <a href="#" onClick={(e) => navegarA(e, 'hero-section')}>Inicio</a>
        <a href="#" onClick={(e) => navegarA(e, 'productos-section')}>Productos</a>
        <a href="#" onClick={(e) => navegarA(e, 'contacto-section')}>Contacto</a>
        
        {/* Botón para ir al panel de Administración (CRUD) */}
        <button 
          onClick={() => setVista('crud')} 
          style={{ 
            marginLeft: '20px', 
            padding: '5px 12px', 
            fontSize: '14px',
            borderRadius: '5px',
            cursor: 'pointer',
            border: 'none',
            fontWeight: 'bold',
            backgroundColor: vista === 'crud' ? '#333' : '#acbd99',
            color: 'white'
          }}
        >
          ⚙️ Admin Panel
        </button>

        {/* Icono del Carrito */}
        <span style={{ marginLeft: '20px', fontSize: '20px', position: 'relative', cursor: 'pointer' }}>
          🛒 <span style={{
            position: 'absolute',
            top: '-10px',
            right: '-10px',
            background: '#e74c3c',
            color: 'white',
            fontSize: '11px',
            padding: '2px 6px',
            borderRadius: '50%'
          }}>{cartCount}</span>
        </span>
      </nav>
    </header>
  );
}

export default Header;