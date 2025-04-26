import React, { useEffect, useState } from 'react';

function App() {
  const [apartments, setApartments] = useState([]);
  const [maxPrice, setMaxPrice] = useState('');

  useEffect(() => {
    fetch('/.netlify/functions/fetchListings')
      .then((res) => res.json())
      .then((data) => setApartments(data));
  }, []);

  const filteredApartments = apartments.filter((apt) => {
    if (!maxPrice) return true;
    const priceNumber = Number(apt.price.replace(/[^0-9]/g, ''));
    return priceNumber <= maxPrice;
  });

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>
      <h1>Cambridge 1BR Apartments Near Red Line</h1>

      {/* Max Price Filter */}
      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="maxPrice" style={{ marginRight: '0.5rem' }}>Max Price:</label>
        <input
          type="number"
          id="maxPrice"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          placeholder="e.g., 2500"
        />
      </div>

      {filteredApartments.length === 0 ? (
        <p>No apartments found matching your criteria.</p>
      ) : (
        <div style={{ display: 'grid', gap: '1.5rem' }}>
          {filteredApartments.map((apt, idx) => (
            <div key={idx} style={{ border: '1px solid #ccc', padding: '1rem', borderRadius: '8px', display: 'flex', gap: '1rem' }}>
              <img
                src={apt.image || 'https://via.placeholder.com/100x100.png?text=No+Image'}
                alt="Apartment"
                style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '8px' }}
              />
              <div>
                <h2 style={{ margin: '0 0 0.5rem' }}>
                  <a href={apt.url} target="_blank" rel="noopener noreferrer" style={{ color: '#007bff', textDecoration: 'none' }}>
                    {apt.title}
                  </a>
                </h2>
                <p style={{ margin: '0.5rem 0', fontWeight: 'bold' }}>{apt.price}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
