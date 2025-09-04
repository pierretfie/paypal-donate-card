import React, { useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

function App() {
  const [donationAmount, setDonationAmount] = useState("10.00");
  
  // Debug: Log the client ID to console
  console.log("PayPal Client ID:", process.env.REACT_APP_PAYPAL_CLIENT_ID);
  
  const initialOptions = {
    "client-id": process.env.REACT_APP_PAYPAL_CLIENT_ID,
    currency: process.env.REACT_APP_PAYPAL_CURRENCY || "USD",
    intent: "capture"
  };

  const cardStyle = {
    maxWidth: "400px",
    margin: "50px auto",
    padding: "30px",
    background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
    borderRadius: "20px",
    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1)",
    textAlign: "center",
    color: "#ffffff",
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    position: "relative",
    overflow: "hidden"
  };

  const glowEffect = {
    position: "absolute",
    top: "-50%",
    left: "-50%",
    width: "200%",
    height: "200%",
    background: "radial-gradient(circle, rgba(255, 215, 0, 0.1) 0%, transparent 70%)",
    pointerEvents: "none"
  };

  const titleStyle = {
    fontSize: "24px",
    fontWeight: "700",
    marginBottom: "10px",
    background: "linear-gradient(45deg, #ffd700, #ffed4e)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text"
  };

  const descriptionStyle = {
    color: "#b8c5d6",
    marginBottom: "25px",
    fontSize: "16px",
    lineHeight: "1.5"
  };

  const amountInputStyle = {
    width: "100%",
    maxWidth: "200px",
    padding: "12px 16px",
    fontSize: "18px",
    fontWeight: "600",
    color: "#ffffff",
    background: "rgba(255, 255, 255, 0.15)",
    border: "2px dashed rgba(255, 215, 0, 0.5)",
    borderRadius: "12px",
    textAlign: "center",
    marginBottom: "20px",
    outline: "none",
    transition: "all 0.3s ease",
    cursor: "text",
    position: "relative"
  };

  const amountLabelStyle = {
    display: "block",
    color: "#ffd700",
    fontSize: "14px",
    fontWeight: "600",
    marginBottom: "8px",
    textTransform: "uppercase",
    letterSpacing: "0.5px"
  };

  const presetButtonsStyle = {
    display: "flex",
    gap: "8px",
    justifyContent: "center",
    marginBottom: "15px",
    flexWrap: "wrap"
  };

  const presetButtonStyle = {
    padding: "8px 16px",
    fontSize: "14px",
    fontWeight: "600",
    color: "#b8c5d6",
    background: "rgba(255, 255, 255, 0.05)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "all 0.2s ease"
  };

  const handleAmountChange = (e) => {
    const value = e.target.value;
    if (value === '' || /^\d*\.?\d{0,2}$/.test(value)) {
      setDonationAmount(value);
    }
  };

  const setPresetAmount = (amount) => {
    setDonationAmount(amount);
  };

  return (
    <div style={{ 
      minHeight: "100vh", 
      background: "#0a0a0a",
      padding: "20px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }}>
      <PayPalScriptProvider options={initialOptions}>
        <div style={cardStyle}>
          <div style={glowEffect}></div>
          <div style={{ position: "relative", zIndex: 1 }}>
            <h2 style={titleStyle}>✨ Support Developer</h2>
            <p style={descriptionStyle}>
              Help promote amazing projects and support the developer's journey
            </p>
            
            <div style={{ marginBottom: "25px" }}>
              <label style={amountLabelStyle}>Enter amount to donate (USD)</label>
              <p style={{ 
                color: "#9ca3af", 
                fontSize: "12px", 
                marginBottom: "15px",
                fontStyle: "italic"
              }}>
                💡 Click presets or type any custom amount (e.g., $2, $15.50, $100)
              </p>
              <div style={presetButtonsStyle}>
                {["5.00", "10.00", "25.00", "50.00"].map(amount => (
                  <button
                    key={amount}
                    style={{
                      ...presetButtonStyle,
                      ...(donationAmount === amount ? {
                        background: "rgba(255, 215, 0, 0.2)",
                        borderColor: "rgba(255, 215, 0, 0.5)",
                        color: "#ffd700"
                      } : {})
                    }}
                    onClick={() => setPresetAmount(amount)}
                    onMouseEnter={(e) => {
                      if (donationAmount !== amount) {
                        e.target.style.background = "rgba(255, 255, 255, 0.1)";
                        e.target.style.borderColor = "rgba(255, 255, 255, 0.2)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (donationAmount !== amount) {
                        e.target.style.background = "rgba(255, 255, 255, 0.05)";
                        e.target.style.borderColor = "rgba(255, 255, 255, 0.1)";
                      }
                    }}
                  >
                    ${amount}
                  </button>
                ))}
              </div>
              <input
                type="text"
                value={donationAmount}
                onChange={handleAmountChange}
                placeholder="Enter amount to donate"
                style={{
                  ...amountInputStyle,
                  ...(donationAmount && parseFloat(donationAmount) > 0 ? {
                    borderColor: "rgba(255, 215, 0, 0.6)",
                    boxShadow: "0 0 0 3px rgba(255, 215, 0, 0.1)"
                  } : {})
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "rgba(255, 215, 0, 0.8)";
                  e.target.style.borderStyle = "solid";
                  e.target.style.boxShadow = "0 0 0 3px rgba(255, 215, 0, 0.2)";
                  e.target.style.background = "rgba(255, 255, 255, 0.2)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "rgba(255, 215, 0, 0.5)";
                  e.target.style.borderStyle = "dashed";
                  e.target.style.boxShadow = "none";
                  e.target.style.background = "rgba(255, 255, 255, 0.15)";
                }}
              />
            </div>
            <PayPalButtons
              style={{ 
                layout: "vertical",
                color: "gold",
                shape: "rect",
                label: "donate"
              }}
              createOrder={async () => {
                try {
                  const amount = parseFloat(donationAmount);
                  if (!amount || amount <= 0) {
                    throw new Error("Please enter a valid donation amount");
                  }
                  
                  const res = await fetch(`${process.env.REACT_APP_API_URL || "http://localhost:5000"}/api/orders`, { 
                    method: "POST",
                    headers: {
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ amount: amount.toFixed(2) })
                  });
                  const order = await res.json();
                  
                  if (!res.ok) {
                    throw new Error(order.error || "Failed to create order");
                  }
                  
                  return order.id;
                } catch (error) {
                  console.error("Error creating order:", error);
                  throw error;
                }
              }}
              onApprove={async (data) => {
                try {
                  const res = await fetch(`${process.env.REACT_APP_API_URL || "http://localhost:5000"}/api/orders/${data.orderID}/capture`, {
                    method: "POST"
                  });
                  const details = await res.json();
                  
                  if (!res.ok) {
                    throw new Error(details.error || "Failed to capture payment");
                  }
                  
                  alert("✅ Thank you for your donation, " + details.payer.name.given_name + "! Your support helps promote the developer.");
                } catch (error) {
                  console.error("Error capturing payment:", error);
                  alert("❌ Payment failed: " + error.message);
                }
              }}
              onError={(err) => {
                console.error("PayPal Checkout onError", err);
                alert(`❌ PayPal Error: ${err.message || JSON.stringify(err)}`);
              }}
            />
          </div>
        </div>
      </PayPalScriptProvider>
    </div>
  );
}

export default App;
