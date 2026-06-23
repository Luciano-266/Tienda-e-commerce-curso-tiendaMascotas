import React from 'react';

function SelectorMascotas({ onSeleccionar }) {
  const categorias = [
    {
      nombre: "Perro",
      img: "https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&q=80&w=500",
      desc: "Alimentos, Snacks, Premios, Juguetes, Camas, Casas, Higiene, Collares."
    },
    {
      nombre: "Gato",
      img: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=500",
      desc: "Alimento, Caja de arena, Juguetes, Rascadores, Camas, Higiene, Cepillos."
    },
    {
      nombre: "Otros",
      img: "https://images.unsplash.com/photo-1535241749838-299277b6305f?auto=format&fit=crop&q=80&w=500",
      desc: "Semseeds, Jaulas, Nidos, Snacks, Cepillos, Ruedas, Alimento Especial, Peceras."
    }
  ];

  return (
    <section class="productos">
      <h2>¿Para quién estás comprando hoy?</h2>
      <div class="cards">
        {categorias.map((cat) => (
          <div class="card" key={cat.nombre} onClick={() => onSeleccionar(cat.nombre)} style={{ cursor: 'pointer' }}>
            <img src={cat.img} alt={cat.nombre} class="card-img" />
            <h3>{cat.nombre}</h3>
            <p>{cat.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default SelectorMascotas;