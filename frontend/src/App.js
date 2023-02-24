import './App.css';
import data from './data';

function App() {
  return (
    <div>
      <header>
        <a href="/">
          <span className="logoFirst">Ecom</span>Bidding
        </a>
      </header>

      <main>
        <h2>Listed Products</h2>
        <div className="products">
          {data.products.map((product) => (
            <div className="items" key={product.id}>
              <a href={`/products/${product.id}`}>
                <img src={product.image} alt={product.name} />
              </a>
              <div className="items__info">
                <a href={`/products/${product.id}`}>
                  <p>{product.name}</p>
                  <p>
                    <small>₹</small>
                    {product.price}
                  </p>
                </a>
                <button>Add to Cart</button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;
