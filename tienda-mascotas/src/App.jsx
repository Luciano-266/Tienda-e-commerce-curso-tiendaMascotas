import { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import SelectorMascotas from './components/SelectorMascotas';
import VistaProductos from './components/VistaProductos';
import AdminPanel from './components/AdminPanel';

// Base de datos inicial por defecto
const productosPorDefecto = {
  "Perro": [
    { id: 1, nombre: "Cama ortopedica", precio: 35000, img: "https://www.clubdeperrosygatos.cl/wp-content/uploads/2024/05/cama-ortopedica-azul.webp" },
    { id: 2, nombre: "Alimento Pro Plan 15kg", precio: 52000, img: "https://i5.walmartimages.cl/asr/b58847fe-258e-4d40-9abc-c3d105eb4de6.24934200a8c57c7d9d2fba054740fa0f.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF" },
    { id: 3, nombre: "Juguete Mordedor", precio: 8000, img: "https://www.clubdeperrosygatos.cl/wp-content/uploads/2025/01/Juguete-Para-Perro-Mordedor-Tuerca-Spin-Fluor-1.webp" }
  ],
  "Gato": [
    { id: 9, nombre: "Rascador Multinivel", precio: 45000, img: "https://images.unsplash.com/photo-1545249390-6bdfa286032f?auto=format&fit=crop&q=80&w=400" },
    { id: 10, nombre: "Comida premium", precio: 65000, img: "https://www.tusmascotas.cl/wp-content/uploads/2022/08/premier-gato.png" }
  ],
  "Otros": [
    { id: 13, nombre: "Acuario de Vidrio", precio: 65000, img: "https://m.media-amazon.com/images/I/61z9cc4FmlL._AC_UF894,1000_QL80_.jpg" }
  ]
};

function App() {
  const [vista, setVista] = useState('inicio'); // 'inicio', 'productos', 'crud'
  const [mascotaSeleccionada, setMascotaSeleccionada] = useState('');
  const [carrito, setCarrito] = useState([]);
  
  // Estado inicial inteligente: Carga desde Local Storage si existe, sino usa el por defecto
  const [inventario, setInventario] = useState(() => {
    const datosLocales = localStorage.getItem('inventario_mascotas');
    return datosLocales ? JSON.stringify(JSON.parse(datosLocales)) === '{}' ? productosPorDefecto : JSON.parse(datosLocales) : productosPorDefecto;
  });

  const manejarSeleccionMascota = (nombreMascota) => {
    setMascotaSeleccionada(nombreMascota);
    setVista('productos');
  };

  const agregarAlCarrito = (producto) => {
    setCarrito([...carrito, producto]);
    alert(`🛒 ¡${producto.nombre} agregado al carrito!`);
  };

  // Manejo del envío del formulario de contacto (Validaciones nativas de React)
  const manejarContactoSubmit = (e) => {
    e.preventDefault();
    alert("¡Éxito! Gracias por escribirnos, nos pondremos en contacto pronto.");
    e.target.reset();
  };

  return (
    <div>
      <Header setVista={setVista} cartCount={carrito.length} vista={vista} />

      {/* VISTA DE INICIO */}
      {vista === 'inicio' && (
        <div id="vista-inicio">
          <div id="hero-section">
            <Hero />
          </div>
          
          <div id="productos-section">
            <SelectorMascotas onSeleccionar={manejarSeleccionMascota} />
          </div>

          {/* SECCIÓN OFERTAS (Tu tabla original estilizada) */}
          <section className="precios">
            <h2>Ofertas Disponibles</h2>
            <table>
              <thead>
                <tr>
                  <th>Oferta</th>
                  <th>Precio</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Set completo para perros</td>
                  <td>$50.000</td>
                </tr>
                <tr>
                  <td>Set completo para gatos</td>
                  <td>$45.000</td>
                </tr>
                <tr>
                  <td>Set Mixto perro y gato</td>
                  <td>$80.000</td>
                </tr>
              </tbody>
            </table>
          </section>

          {/* SECCIÓN CONTACTO (Tu formulario original integrado) */}
          <section id="contacto-section" className="contacto">
            <h2>Contacto</h2>
            <form onSubmit={manejarContactoSubmit}>
              <input type="text" placeholder="Nombre" minLength="3" required />
              <input type="email" placeholder="Email" required />
              <textarea placeholder="Mensaje" minLength="10" required></textarea>
              <button type="submit">Enviar</button>
            </form>
          </section>

          {/* FOOTER */}
          <footer className="footer">
            <p>PetWorld. Todos los derechos reservados.</p>
            <div className="redes">
              <a href="#">Facebook</a>
              <a href="#">Instagram</a>
              <a href="#">Twitter</a>
            </div>
          </footer>
        </div>
      )}

      {/* VISTA DETALLE DE PRODUCTOS DE LA MASCOTA */}
      {vista === 'productos' && (
        <VistaProductos 
          categoria={mascotaSeleccionada}
          productos={inventario[mascotaSeleccionada] || []}
          agregarAlCarrito={agregarAlCarrito}
          volver={() => setVista('inicio')}
        />
      )}

      {/* VISTA CRUD DE ADMINISTRACIÓN (Punto clave rúbrica) */}
      {vista === 'crud' && (
        <AdminPanel 
          inventario={inventario}
          setInventario={setInventario}
          volver={() => setVista('inicio')}
        />
      )}
    </div>
  );
}

export default App;
