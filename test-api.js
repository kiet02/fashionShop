const fetch = require('node-fetch');

async function test() {
  try {
    const payload = {
      fullName: "Test User",
      email: "test@example.com",
      phoneNumber: "0123456789",
      address: "123 Test St",
      note: "Test note",
      paymentMethod: "COD",
      orderDetail: [
        {
          productId: 1,
          quantity: 1,
          price: 1000
        }
      ]
    };

    console.log("Sending payload:", payload);
    const res = await fetch('http://localhost:3000/api/order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const text = await res.text();
    console.log("Response status:", res.status);
    console.log("Response text:", text.substring(0, 500));
  } catch (err) {
    console.error("Fetch error:", err);
  }
}

test();
