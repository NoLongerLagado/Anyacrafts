import React, { useContext } from 'react';
import { Link } from 'react-router-dom'
import { UserContext } from '../components/UserContext';

const Account = () => {
  const { user, signOut } = useContext(UserContext);

  return (
    <div className="account">
      <h1>Account</h1>
      <h2>{user ? `Welcome, ${user.fullName}` : 'Welcome!'}</h2>
      {user ? (
        <button onClick={signOut}>Sign Out</button>
      ) : (
        <Link to="/login">Sign In</Link>
      )}

      {user && (
        <div>
          <h2>Your Orders</h2>
          <table>
            <thead>
              <tr>
                <th>Order Name</th>
                <th>Date</th>
                <th>Payment</th>
                <th>Price</th>
                <th>Shipping Status</th>
              </tr>
            </thead>
            <tbody>
              {user.orders?.map((order, index) => (
                <tr key={index}>
                  <td>{order.name}</td>
                  <td>{order.date}</td>
                  <td>{order.payment}</td>
                  <td>{`₱${order.price}`}</td>
                  <td>{order.shippingStatus}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Account;
