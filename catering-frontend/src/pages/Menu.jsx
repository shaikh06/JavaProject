import { useState, useEffect, useContext } from 'react';
import { getMenus } from '../services/api';
import { CartContext } from '../context/CartContext';

const Menu = () => {
  const [menus, setMenus] = useState([]);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    getMenus().then(response => setMenus(response.data));
  }, []);

  return (
    <div>
      <h2>Menu</h2>
      <div className="row">
        {menus.map(item => (
          <div key={item.id} className="col-md-4 mb-3">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{item.name}</h5>
                <p className="card-text">${item.price}</p>
                <button className="btn btn-success" onClick={() => addToCart(item)}>Add to Cart</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Menu;