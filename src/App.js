import React, { useEffect, useState } from 'react';

function App() {
  const [apartments, setApartments] = useState([]);

  useEffect(() => {
    fetch('/.netlify/functions/fetchListings')
      .then((res) => res.json())
      .then((data) => setApartments(data));
  }, []);

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>
      <h1>Cambridge 1BR Apartments Near Red Line</h1>
      {apartments.length === 0 ? (
        <p>Loading apartments...</p>
      ) : (
        <div style={{ display: 'grid', gap: '1.5rem' }}>
          {apartments.map((apt, idx) => (
            <div key={idx} style={{ border: '1px solid #ccc', padding: '1rem', borderRadius: '8px', display: 'flex', gap: '1rem' }}>
              {apt.image && (
                <img
                  src={apt.image}
                  alt="Apartment"
                  style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '8px' }}
                />
              )}
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
