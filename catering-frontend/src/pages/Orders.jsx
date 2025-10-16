import { useState, useEffect } from 'react';
import { getOrders } from '../services/api';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    getOrders()
      .then(response => {
        setOrders(response.data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load orders. Please try again.');
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div>
      <h2>Your Orders</h2>
      <ul className="list-group">
        {orders.map(order => (
          <li key={order.id} className="list-group-item">
            Order #{order.id} - Total: ${order.total} - Status: {order.status}
            <ul>
              {order.items.map(item => (
                <li key={item.id}>{item.menuItem.name} x {item.quantity}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Orders;