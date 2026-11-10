/* White Box demo logic: branch tracing for an age eligibility condition. */
window.WhiteBoxDemo = (() => {
  const visitedBranches = new Set();

  function runVotingTest(age) {
    const eligible = Number(age) >= 18;
    const branch = eligible ? "TRUE" : "FALSE";
    visitedBranches.add(branch);

    return {
      age: Number(age),
      eligible,
      branch,
      output: eligible ? "Eligible to vote" : "Not eligible to vote",
      condition: `age >= 18 evaluated as ${branch}`,
      visitedBranches: [...visitedBranches],
      branchCoverage: Math.round((visitedBranches.size / 2) * 100)
    };
  }

  function resetCoverage() {
    visitedBranches.clear();
  }

  return { runVotingTest, resetCoverage };
})();