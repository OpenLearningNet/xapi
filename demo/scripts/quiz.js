const QUESTION_PREFIX = "q";

const buildQuiz = (selector, title, questions) => {
  // simple MCQ quiz builder

  const quizLayout = document.querySelector(selector);

  const h1 = document.createElement("h1");
  h1.textContent = title;
  quizLayout.appendChild(h1);

  questions.forEach((question, index) => {
    const p = document.createElement("p");
    p.textContent = question.question;
    quizLayout.appendChild(p);

    question.answers.forEach((answer, answerIndex) => {
      const inputId = `${QUESTION_PREFIX}${index}-${answerIndex}`;
      const input = document.createElement("input");
      input.type = "radio";
      input.name = `${QUESTION_PREFIX}${index}`;
      input.value = answer;
      input.id = inputId;
      quizLayout.appendChild(input);

      const label = document.createElement("label");
      label.textContent = answer;
      label.htmlFor = inputId;
      quizLayout.appendChild(label);

      const br = document.createElement("br");
      quizLayout.appendChild(br);
    });
  });
};

const addQuizSubmitHandler = async (formSelector, onSubmit) => {
  const quiz = document.querySelector(formSelector);

  quiz.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(quiz);
    const answers = [];
    for (const [key, value] of formData.entries()) {
      const index = parseInt(key.substring(QUESTION_PREFIX.length), 10);
      answers[index] = value;
    }

    onSubmit(answers);
  });

  return quiz;
};
