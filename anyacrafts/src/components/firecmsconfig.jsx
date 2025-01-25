
import { ordersCollection } from './orderCollection.jsx'; // Import the orders collection
import { db, auth } from '../firebaseconfig'; // Import Firestore and Auth from your firebase.js file

export const firecmsconfig = {
  collections: [ordersCollection],  // Add your collections here
  authentication: {
    isAuthenticated: () => {
      // Check if the user is authenticated
      return !!auth.currentUser;  // This will return true if the user is logged in, otherwise false
    },
  },
  database: {
    db: db,  // Pass the initialized Firestore instance here
  },
};