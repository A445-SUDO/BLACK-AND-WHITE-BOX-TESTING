/* Black Box demo logic: observable login behaviour and test cases.
   Demo credentials are intentionally public and are NOT secure authentication. */
window.BlackBoxDemo = (() => {
  const DEMO_USERNAME = "admin";
  const DEMO_PASSWORD = "1234";

  function checkLogin(username, password) {
    const user = String(username ?? "").trim();
    const pass = String(password ?? "");

    if (!user || !pass) {
      return { success: false, message: "Please enter both username and password.", outcome: "Validation message" };
    }
    if (user === DEMO_USERNAME && pass === DEMO_PASSWORD) {
      return { success: true, message: "Login successful. Welcome to the demo portal!", outcome: "Login successful" };
    }
    return { success: false, message: "Invalid username or password.", outcome: "Error message" };
  }

  const testCases = [
    { id: "BB-01", name: "Valid credentials", username: "admin", password: "1234", expected: "Login successful" },
    { id: "BB-02", name: "Wrong password", username: "admin", password: "wrong", expected: "Error message" },
    { id: "BB-03", name: "Wrong username", username: "guest", password: "1234", expected: "Error message" },
    { id: "BB-04", name: "Both fields empty", username: "", password: "", expected: "Validation message" },
    { id: "BB-05", name: "Username empty", username: "", password: "1234", expected: "Validation message" },
    { id: "BB-06", name: "Password empty", username: "admin", password: "", expected: "Validation message" },
    { id: "BB-07", name: "Username with spaces", username: " admin ", password: "1234", expected: "Login successful" }
  ];

  function runTestSuite() {
    return testCases.map(test => {
      const actual = checkLogin(test.username, test.password).outcome;
      return { ...test, actual, passed: actual === test.expected };
    });
  }

  return { checkLogin, runTestSuite };
})();