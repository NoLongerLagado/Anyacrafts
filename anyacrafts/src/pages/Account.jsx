import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../components/UserContext';
import { db } from '../firebaseconfig'; // Import the Firestore instance
import { collection, query, where, onSnapshot } from 'firebase/firestore'; // Firestore query and real-time updates

const Account = () => {
  const { user, signOut } = useContext(UserContext);  // Get current user context
  const [orders, setOrders] = useState([]); // Local state to hold user's orders

  // Fetch user's orders from Firestore when the component is mounted
  useEffect(() => {
    if (user) {
      const ordersRef = collection(db, 'orders'); // Reference to the 'orders' collection
      const q = query(ordersRef, where('userId', '==', user.uid)); // Query to get orders for the current user

      // Real-time listener to fetch and update orders
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        if (querySnapshot.empty) {
          console.log('No orders found for this user.');
        } else {
          const fetchedOrders = querySnapshot.docs.map(doc => doc.data());
          console.log('Fetched orders:', fetchedOrders);  // Debug log to check the fetched data
          setOrders(fetchedOrders);  // Update state with the fetched orders
        }
      });

      // Cleanup listener on component unmount
      return () => unsubscribe();
    }
  }, [user]); // Only re-run when the user changes

  return (
    <div className="account">
      <h1>Account</h1>
      <h2>{user ? `Welcome, ${user.firstName} ${user.lastName}` : 'Welcome!'}</h2>
      {user ? (
        <button onClick={signOut}>Sign Out</button>
      ) : (
        <Link to="/login">Sign In</Link>
      )}

      {user && (
        <div>
          <h2>Your Orders</h2>
          {orders.length > 0 ? (
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
                {orders.map((order, index) => (
                  <tr key={index}>
                    <td>
                      {order.selectedItems.map((item, idx) => (
                        <div key={idx}>
                          <strong>{item.title}</strong> - {item.size} - {item.color} 
                          <br />
                          {item.pcs} pcs - ₱{item.price}
                        </div>
                      ))}
                    </td>
                    <td>{new Date(order.orderDate.seconds * 1000).toLocaleDateString()}</td> {/* Format Firestore timestamp */}
                    <td>{order.paymentMode}</td>
                    <td>{`₱${order.subtotal.toFixed(2)}`}</td> {/* Display subtotal price */}
                    <td>{order.status}</td> {/* Shipping status */}
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No orders found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Account;
