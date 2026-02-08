document.getElementById("registrationForm").addEventListener("submit", async function (e) {
  e.preventDefault(); // 🚫 page reload stop

  const data = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    password: document.getElementById("password").value,
    phone: document.getElementById("phone").value,
    sex: document.querySelector('input[name="sex"]:checked')?.value,
    day: document.getElementById("day").value,
    month: document.getElementById("month").value,
    year: document.getElementById("year").value,
    address: document.getElementById("address").value
  };

  try {
    const res = await fetch("http://localhost:3000/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    const result = await res.json();
    alert(result.message);
  } catch (err) {
    alert("❌ Server not reachable");
  }
});
