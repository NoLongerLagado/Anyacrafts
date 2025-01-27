// src/collections/ordersCollection.jsx
import { buildCollection } from "@firecms/core";
import { auth } from "../firebaseconfig"; // Import auth to access the current user

export const ordersCollection = buildCollection({
  name: "Orders",
  path: "orders", // Firestore collection path
  permissions: ({ authController }) => ({
    edit: true,
    create: false,
    delete: false,
  }),
  schema: {
    properties: {
      firstName: {
        title: "First Name",
        dataType: "string",
        validation: { required: true },
      },
      lastName: {
        title: "Last Name",
        dataType: "string",
        validation: { required: true },
      },
      email: {
        title: "Email",
        dataType: "string",
        validation: { required: true, email: true },
      },
      address: {
        title: "Address",
        dataType: "string",
      },
      modeOfDelivery: {
        title: "Mode of Delivery",
        dataType: "string",
        enumValues: {
          lalamove: "Lalamove",
          pickup: "Pick-up",
        },
      },
      paymentMode: {
        title: "Payment Mode",
        dataType: "string",
        enumValues: {
          gcash: "GCash",
          paypal: "PayPal",
          bpi: "BPI",
          cashonpickup: "Cash on Pick-up",
        },
      },
      subtotal: {
        title: "Subtotal",
        dataType: "number",
      },
      orderDate: {
        title: "Order Date",
        dataType: "timestamp",
      },
      status: {
        title: "Order Status",
        dataType: "string",
        enumValues: {
          pending: "Pending",
          delivered: "Delivered",
        },
      },
      selectedItems: {
        title: "Selected Items",
        dataType: "array",
        of: {
          dataType: "map",
          properties: {
            id: {
              title: "Product ID",
              dataType: "string",
            },
            title: {
              title: "Product Name",
              dataType: "string",
            },
            price: {
              title: "Price",
              dataType: "number",
            },
            quantity: {
              title: "Quantity",
              dataType: "number",
            },
            totalPrice: {
              title: "Total Price",
              dataType: "number",
            },
            image: {
              title: "Product Image",
              dataType: "string",
              config: {
                url: (value) => value, // Display product image URL
              },
            },
          },
        },
      },
      userId: {
        title: "User ID",
        dataType: "string", // This will store the user's UID
        validation: { required: true },
      },
    },
  },
  // Add a function to ensure the user is authenticated and set the userId
  actions: [
    {
      name: "Create Order",
      action: async ({ values }) => {
        const user = auth.currentUser;
        if (!user) {
          throw new Error("User not authenticated");
        }

        const orderData = {
          ...values,
          userId: user.uid, // Add the logged-in user's UID to the order data
          orderDate: new Date(), // Set the order date
        };

        // Proceed to add the order to Firestore
        const orderRef = await addDoc(collection(db, "orders"), orderData);
        return orderRef.id; // Return the order ID
      },
    },
  ],
});
