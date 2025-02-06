function Test() {
  return (
    <>
      <div className="Test">
        <form
          id="login-form"
          onSubmit={async (e) => {
            e.preventDefault();
            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;

            try {
              const response = await fetch(
                "http://localhost:4000/api/users/login",
                {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ email, password }),
                  credentials: "include", // Send cookies with request
                }
              );

              const data = await response.json();
              if (response.ok) {
                alert("Login successful!");
                console.log("User Data:", data);
              } else {
                alert(data.message || "Login failed!");
              }
            } catch (error) {
              console.error("Error:", error);
            }
          }}
        >
          <h2>Login</h2>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            required
          />
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            required
          />
          <button type="submit">Login</button>
        </form>
      </div>
    </>
  );
}

export default Test;
