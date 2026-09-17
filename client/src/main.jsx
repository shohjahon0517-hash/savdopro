import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

function App() {
  return (
    <div className="app">
      <header className="topbar">
        <h1>Savdo Pro</h1>
        <span>POS tizimi</span>
      </header>

      <main className="dashboard">
        <section className="card">
          <h2>Umumiy sotuv</h2>
          <p className="big">245,000 so'm</p>
        </section>

        <section className="card">
          <h2>Mahsulotlar</h2>
          <ul>
            <li>Non</li>
            <li>Suv</li>
            <li>Pepsi</li>
          </ul>
        </section>

        <section className="card wide">
          <h2>Bugungi hisobot</h2>
          <div className="stats">
            <div><strong>12</strong><span>Buyurtma</span></div>
            <div><strong>7</strong><span>Mahsulot</span></div>
            <div><strong>92%</strong><span>Daromad</span></div>
          </div>
        </section>
      </main>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
