import React, { useEffect, useState } from "react";
import "./MyOrders.css";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL;
    const response = await fetch(`${apiUrl}/api/my-orders/`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("auth-token")}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to Fetch orders");
        }

        const data = await response.json();
        console.log("Data received from backend:", data);
        setOrders(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (localStorage.getItem("auth-token")) {
      fetchOrders();
    } else {
      setLoading(false);
      setError("You must be logged in to view your orders.");
    }
  }, []);

  const handleCancelOrder = async (orderId) => {
    if (!window.confirm("Are you sure you want to cancel this order?")) {
      return;
    }
    try {
      const apiUrl = import.meta.env.VITE_API_URL;
    const response = await fetch(`${apiUrl}/api/orders/${orderId}/cancel/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('auth-token')}`,
        },
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.error || "Failed to cancel order.");
      }

      setOrders(currentOrders =>
        currentOrders.map(order => order.id === orderId ? responseData : order)
      );

      alert("Order  Successfully Cancelled.");

    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };

  if (loading) {
    return (
      <div className="text-center my-5">
        <h2>Loading Your Orders....</h2>
      </div>
    );
  }

  if (error) {
    return <div className="alert alert-danger my-5 ">{error}</div>;
  }

  const handleDownloadInvoice = async (orderId) => {
    try  {

       const apiUrl = import.meta.env.VITE_API_URL;
            const response = await fetch(`${apiUrl}/api/orders/${orderId}/invoice/`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('auth-token')}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.error || 'Failed to download invoice.');
      }
      const blob = await response.blob();

      const url = window.URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;

      a.download = `invoice_${orderId}.pdf`;

      document.body.appendChild(a);

      a.click();

      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  }; 
  return (
    <div className="my-orders-page conatiner my-5">
      <h1 className="mb-4">My Orders</h1>
      {orders.length === 0 ? (
        <p>You have not placed any order yet.</p>
      ) : (
        <div className="accordion" id="ordersAccordion">
          {orders.map((order) => (
            <div className="accordion-item" key={order.id}>
              <h2 className="accordion-header" id={`heading-${order.id}`}>
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target={`#collapse-${order.id}`}
                  aria-expanded="false"
                  aria-controls={`collapse-${order.id}`}
                >
                  <div className="order-summary">
                    <span>Order #{order.id}</span>
                    <span>
                      Date: {new Date(order.created_at).toLocaleDateString()}
                    </span>
                    <span>
                      Total: ${parseFloat(order.order_total).toFixed(2)}
                    </span>
                    <span>
                      Status:
                      <span
                        className={`status status-${order.status.toLowerCase()}`}
                      >
                        {order.status}
                      </span>
                    </span>
                  </div>
                </button>
              </h2>
              <div
                id={`collapse-${order.id}`}
                className="accordion collapse collapse"
                aria-labelledby={`heading-${order.id}`}
                data-bs-parent="#ordersAccordion"
              >
                <div className="accordion-body">
                  <ul className="list-group">
                    {order.items.map((item, index) => (
                      <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                        <div>
                          <strong>
                            {item.product ? item.product.name : "[Product no longer available]"}
                          </strong>
                          <br />
                          <small>Quantity: {item.quantity}</small>
                        </div>
                        <span>${parseFloat(item.price).toFixed(2)}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="order-actions mt-3">
                    {order.status === 'Pending' && (
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => handleCancelOrder(order.id)}
                      >
                        Cancel Order
                      </button>
                    )}
                    {order.status === 'Delivered' && (
                      <button
                        className="btn btn-sm btn-outline-primary"
                        onClick={() => handleDownloadInvoice(order.id)}
                        >
                          Download Invoice
                      </button> 
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrders;
