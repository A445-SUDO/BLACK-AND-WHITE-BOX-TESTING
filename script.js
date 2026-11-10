/* UI wiring for both interactive labs and the knowledge quiz. */
(() => {
  const $ = selector => document.querySelector(selector);

  // WHITE BOX LAB
  const ageInput = $("#age-input");
  const ageValue = $("#age-value");
  const codeAge = $("#code-age");
  const whiteResult = $("#white-result");
  const coverageValue = $("#coverage-value");
  const coverageBar = $("#coverage-bar");
  const coverageNote = $("#coverage-note");
  const traceText = $("#trace-text");

  function showWhiteResult() {
    const result = WhiteBoxDemo.runVotingTest(Number(ageInput.value));
    ageValue.textContent = result.age;
    codeAge.textContent = result.age;
    whiteResult.innerHTML = `<span class="result-kicker">PROGRAM OUTPUT</span><strong>${result.output}</strong><small>${result.branch} branch executed</small>`;
    traceText.textContent = `${result.condition}. The ${result.branch === "TRUE" ? "if" : "else"} branch ran.`;
    coverageValue.textContent = `${result.branchCoverage}%`;
    coverageBar.style.width = `${result.branchCoverage}%`;
    coverageNote.textContent = `${result.visitedBranches.length} of 2 branches visited in this session`;
    ["#line-condition", "#line-true", "#line-else", "#line-false"].forEach(id => {
      $(id).classList.remove("active-line", "inactive-line");
    });
    $("#line-condition").classList.add("active-line");
    if (result.eligible) {
      $("#line-true").classList.add("active-line");
      $("#line-else").classList.add("inactive-line");
      $("#line-false").classList.add("inactive-line");
    } else {
      $("#line-true").classList.add("inactive-line");
      $("#line-else").classList.add("active-line");
      $("#line-false").classList.add("active-line");
    }
  }
  ageInput.addEventListener("input", () => {
    ageValue.textContent = ageInput.value;
    codeAge.textContent = ageInput.value;
  });
  $("#run-white").addEventListener("click", showWhiteResult);
  showWhiteResult();

  // BLACK BOX LAB
  const loginForm = $("#login-form");
  const loginFeedback = $("#login-feedback");
  loginForm.addEventListener("submit", event => {
    event.preventDefault();
    const result = BlackBoxDemo.checkLogin($("#login-user").value, $("#login-pass").value);
    loginFeedback.textContent = result.message;
    loginFeedback.className = `login-feedback ${result.success ? "success" : "error"}`;
  });

  $("#run-suite").addEventListener("click", () => {
    const results = BlackBoxDemo.runTestSuite();
    $("#test-results").innerHTML = results.map(test => `
      <tr>
        <td><b>${test.id}</b><br>${test.name}</td>
        <td>${test.username || "—"} / ${test.password ? "••••" : "—"}</td>
        <td>${test.expected}</td>
        <td class="${test.passed ? "pass" : "fail"}">${test.passed ? "PASS ✓" : "FAIL ✕"}<br><small>${test.actual}</small></td>
      </tr>`).join("");
    const passed = results.filter(test => test.passed).length;
    $("#suite-summary").innerHTML = `<span>SUITE SUMMARY</span><strong>${passed}/${results.length} passed · ${results.length - passed} failed</strong>`;
  });
  $("#clear-suite").addEventListener("click", () => {
    $("#test-results").innerHTML = '<tr class="empty-row"><td colspan="4">No test cases run yet.</td></tr>';
    $("#suite-summary").innerHTML = "<span>SUITE SUMMARY</span><strong>Waiting for execution</strong>";
  });

  // QUIZ
  const questions = [
    { question: "Which testing method generally requires knowledge of source code?", options: ["White Box Testing", "Black Box Testing", "Acceptance Testing"], answer: 0, explanation: "White Box Testing examines internal code, logic and execution paths." },
    { question: "A tester checks a login form without viewing its code. Which approach is this?", options: ["White Box Testing", "Black Box Testing", "Branch Coverage"], answer: 1, explanation: "Black Box Testing checks observable functionality without needing the implementation." },
    { question: "What does branch coverage measure?", options: ["How attractive the interface is", "Whether decision outcomes have been executed", "How many users are online"], answer: 1, explanation: "Branch coverage checks whether each decision outcome, such as TRUE and FALSE, has been executed." }
  ];
  let questionIndex = 0;
  let score = 0;
  let answered = false;

  function renderQuestion() {
    const q = questions[questionIndex];
    $("#quiz-number").textContent = `QUESTION ${String(questionIndex + 1).padStart(2, "0")} / 03`;
    $("#quiz-progress").style.width = `${((questionIndex + 1) / questions.length) * 100}%`;
    $("#quiz-question").textContent = q.question;
    $("#quiz-feedback").textContent = "";
    $("#quiz-next").disabled = true;
    $("#quiz-next").textContent = questionIndex === questions.length - 1 ? "Finish quiz →" : "Next question →";
    answered = false;
    $("#quiz-options").innerHTML = q.options.map((option, index) =>
      `<button class="quiz-option" type="button" data-answer="${index}">${String.fromCharCode(65 + index)}. ${option}</button>`
    ).join("");
    $("#quiz-options").querySelectorAll("button").forEach(button => {
      button.addEventListener("click", () => chooseAnswer(Number(button.dataset.answer)));
    });
  }

  function chooseAnswer(choice) {
    if (answered) return;
    answered = true;
    const q = questions[questionIndex];
    const correct = choice === q.answer;
    if (correct) score++;
    $("#quiz-options").querySelectorAll("button").forEach((button, index) => {
      button.disabled = true;
      if (index === q.answer) button.classList.add("correct");
      else if (index === choice) button.classList.add("wrong");
    });
    $("#quiz-feedback").textContent = `${correct ? "Correct! " : "Not quite. "}${q.explanation}`;
    $("#quiz-next").disabled = false;
    $("#quiz-score").innerHTML = `YOUR SCORE<strong>${score} / 3</strong>`;
  }

  $("#quiz-next").addEventListener("click", () => {
    if (!answered) return;
    if (questionIndex < questions.length - 1) {
      questionIndex++;
      renderQuestion();
    } else {
      $("#quiz-question").textContent = `Quiz complete — ${score} out of 3!`;
      $("#quiz-options").innerHTML = "";
      $("#quiz-feedback").textContent = score === 3 ? "Excellent work. You've understood the key ideas." : "Good effort. Review the two labs and try again by refreshing the page.";
      $("#quiz-next").textContent = "Restart quiz ↻";
      $("#quiz-next").disabled = false;
      $("#quiz-next").onclick = () => {
        questionIndex = 0; score = 0;
        $("#quiz-score").innerHTML = "YOUR SCORE<strong>— / 3</strong>";
        $("#quiz-next").onclick = null;
        renderQuestion();
      };
    }
  });
  renderQuestion();
})();