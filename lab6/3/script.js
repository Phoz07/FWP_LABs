const quizContainer = document.getElementById("quiz-container");

const handleRenderQuiz = (data) => {
  data.map((item, index) => {
    const quiz = document.createElement("div");
    const question = document.createElement("p");
    question.textContent = `${index + 1}. ${item.question}`;
    question.style.fontSize = "20px";
    question.style.marginBottom = "8px";

    const answers = document.createElement("div");
    answers.classList = "answers";
    for (let i in item.answers) {
      if (i === "correct") {
        continue;
      }
      const answerSelect = document.createElement("div");
      answerSelect.classList = "answerSelect";
      const answerLabel = document.createElement("label");
      answerLabel.textContent = `${i.toUpperCase()}. ${item.answers[i]}`;
      answerLabel.htmlFor = item.answers[i];
      const answerInput = document.createElement("input");
      answerInput.type = "radio";
      answerInput.name = `question${index + 1}`;
      answerInput.value = item.answers[i];
      answerInput.id = item.answers[i];
      answerSelect.appendChild(answerInput);
      answerSelect.appendChild(answerLabel);
      answers.appendChild(answerSelect);
    }
    quiz.appendChild(question);
    quiz.appendChild(answers);
    quizContainer.appendChild(quiz);
  });
};

const handleFetchData = () => {
  fetch("./questionAnswerData.json")
    .then((response) => response.json())
    .then((data) => handleRenderQuiz(data))
    .catch((error) => console.log("Fetch Error: ", error));
};

window.onload = () => {
  handleFetchData();
};
