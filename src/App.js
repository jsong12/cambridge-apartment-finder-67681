import React, { useEffect, useState } from 'react';

function App() {
  const [apartments, setApartments] = useState([]);

  useEffect(() => {
    fetch('/.netlify/functions/fetchListings')
      .then((res) => res.json())
      .then((data) => setApartments(data));
  }, []);

  return (
    <div>
      <h1>Cambridge 1BR Apartments Near Red Line</h1>
      <ul>
        {apartments.map((apt, idx) => (
          <li key={idx}>
            <a href={apt.url} target="_blank" rel="noopener noreferrer">
              {apt.title}
            </a><br />
            {apt.price} – {apt.distance} mins walk to Red Line
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
