import React, { useState } from 'react';

const products = [
  { id: 1, name: 'Coca-Cola 1L', price: 12000, stock: 20, barcode: '5901234123457' },
  { id: 2, name: 'Osh', price: 35000, stock: 10, barcode: '0123456789012' },
  { id: 3, name: 'Suv 0.5L', price: 5000, stock: 40, barcode: '9876543210123' },
  { id: 4, name: 'Pepsi 1.5L', price: 15000, stock: 18, barcode: '4567891234567' },
  { id: 5, name: 'Kofe', price: 18000, stock: 25, barcode: '3216549870123' },
  { id: 6, name: 'Non', price: 6000, stock: 50, barcode: '6549873210987' },
];

const formatMoney = (value) => `${Number(value).toLocaleString('uz-UZ')} so'm`;

export default function App() {
  const [search, setSearch] = useState('');
  const [cart, setCart] = useState([
    { id: 1, name: 'Coca-Cola 1L', price: 12000, quantity: 2 },
    { id: 3, name: 'Suv 0.5L', price: 5000, quantity: 1 },
  ]);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase()) ||
    product.barcode.includes(search)
  );

  const addToCart = (product) => {
    setCart((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      if (exists) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (id, change) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, quantity: Math.max(0, item.quantity + change) } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount = Math.round(subtotal * 0.05);
  const tax = Math.round(subtotal * 0.1);
  const total = subtotal - discount + tax;

  return (
    <div className="pos-shell">
      <aside className="sidebar">
        <div className="brand-box">
          <span className="brand">Savdo Pro</span>
          <small>POS Dashboard</small>
        </div>

        <nav className="nav">
          <button className="nav-item active">Kassa</button>
          <button className="nav-item">Mahsulotlar</button>
          <button className="nav-item">Sotuvlar</button>
          <button className="nav-item">Hisobot</button>
        </nav>

        <div className="mini-card">
          <p>Bugun</p>
          <h3>{formatMoney(245000)}</h3>
          <span>+12.5% dan ko'proq</span>
        </div>
      </aside>

      <main className="main-panel">
        <header className="topbar">
          <div>
            <p className="eyebrow">Do'kon</p>
            <h1>Oltin Market</h1>
          </div>
          <div className="status-pill">Ochiq</div>
        </header>

        <section className="toolbar">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Mahsulot yoki barkod qidiring..."
          />
          <button className="primary-btn">+ Mahsulot qo'shish</button>
        </section>

        <section className="content-grid">
          <div className="products-panel">
            <div className="section-header">
              <h2>Mahsulotlar</h2>
              <span>{filteredProducts.length} ta</span>
            </div>

            <div className="product-grid">
              {filteredProducts.map((product) => (
                <div key={product.id} className="product-card">
                  <div className="product-thumb">{product.name.slice(0, 2).toUpperCase()}</div>
                  <h3>{product.name}</h3>
                  <p>{formatMoney(product.price)}</p>
                  <small>Stock: {product.stock}</small>
                  <button onClick={() => addToCart(product)}>Savatga qo'sh</button>
                </div>
              ))}
            </div>
          </div>

          <div className="cart-panel">
            <div className="section-header">
              <h2>Savatcha</h2>
              <span>{cart.reduce((sum, item) => sum + item.quantity, 0)} mahsulot</span>
            </div>

            <div className="cart-list">
              {cart.map((item) => (
                <div key={item.id} className="cart-item">
                  <div>
                    <strong>{item.name}</strong>
                    <small>{formatMoney(item.price)}</small>
                  </div>

                  <div className="qty-box">
                    <button onClick={() => updateQuantity(item.id, -1)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, 1)}>+</button>
                  </div>
                </div>
              ))}
            </div>

            <div className="totals">
              <div><span>Subtotal</span><strong>{formatMoney(subtotal)}</strong></div>
              <div><span>Chegirma</span><strong>- {formatMoney(discount)}</strong></div>
              <div><span>Soliq</span><strong>{formatMoney(tax)}</strong></div>
              <div className="grand-total">
                <span>Umumiy</span>
                <strong>{formatMoney(total)}</strong>
              </div>
            </div>

            <button className="checkout-btn">To'lovni yakunlash</button>
          </div>
        </section>
      </main>
    </div>
  );
}
