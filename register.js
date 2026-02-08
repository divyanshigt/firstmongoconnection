document.getElementById("registrationForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    // form values
    const name = document.getElementById("name").value;
    const password = document.getElementById("password").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;

    const sex = document.querySelector('input[name="sex"]:checked')?.value;

    const day = document.getElementById("day").value;
    const month = document.getElementById("month").value;
    const year = document.getElementById("year").value;

    // languages (multiple checkbox)
    const languages = [];
    document.querySelectorAll('input[name="language"]:checked')
        .forEach(lang => languages.push(lang.value));

    const address = document.getElementById("address").value;

    // data object
    const userData = {
        name,
        password,
        email,
        phone,
        sex,
        day,
        month,
        year,
        languages,
        address
    };

    try {
        const response = await fetch("http://localhost:5000/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userData)
        });

        const result = await response.json();
        alert(result.message);

        // redirect to login page after success
        if (result.message === "Registration successful") {
            window.location.href = "login.html";
        }

    } catch (error) {
        console.error("Error:", error);
        alert("Something went wrong");
    }
});
