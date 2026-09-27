(function () {
  function mount(
    container,
    question,
    { id, field, reward = 0, onSuccess } = {},
  ) {
    const done = field && Store.state[field].includes(id);
    const heading = document.createElement("h3");
    heading.textContent = question.question;
    container.append(heading);
    const options = document.createElement("div");
    options.className = "quiz-options";
    options.setAttribute("role", "group");
    options.setAttribute("aria-label", question.question);
    const feedback = document.createElement("div");
    feedback.className = "feedback";
    feedback.setAttribute("role", "status");
    feedback.setAttribute("aria-live", "polite");
    if (done)
      feedback.textContent =
        "Já resolvido. Podes praticar novamente, sem repetir XP.";
    question.answers.forEach((answer, index) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "quiz-option";
      button.textContent = String.fromCharCode(65 + index) + "  " + answer;
      button.addEventListener("click", () => {
        options.querySelectorAll("button").forEach((b) => {
          b.classList.remove("incorrect", "correct");
          b.removeAttribute("aria-pressed");
        });
        button.setAttribute("aria-pressed", "true");
        if (index === question.correct) {
          button.classList.add("correct");
          window.ExperienceMotion?.signal("success", button);
          const earned = field ? Store.add(field, id) : false;
          feedback.className = "feedback success";
          feedback.textContent =
            "✓ Boa. " +
            question.explanation +
            (earned ? ` +${reward} XP.` : "");
          options.querySelectorAll("button").forEach((b) => {
            b.disabled = true;
          });
          onSuccess?.();
        } else {
          button.classList.add("incorrect");
          window.ExperienceMotion?.signal("error", button);
          feedback.className = "feedback retry";
          feedback.textContent =
            "Ainda não. " + question.explanation + " Podes tentar outra vez.";
        }
      });
      options.append(button);
    });
    container.append(options, feedback);
  }
  window.Quiz = { mount };
})();
