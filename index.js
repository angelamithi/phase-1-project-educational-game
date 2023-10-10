const answers = [];

const selectRandomCountry = function () {
    const flagContainer = document.querySelector("#image-container");
    const formContainer = document.querySelector("form#formquiz");
    const answerFeedback = document.querySelector("p");
    let correctAnswer;

    fetch("https://restcountries.com/v3.1/region/africa")
        .then(resp => resp.json())
        .then(countries => {
            const randomNumber = Math.floor(Math.random() * countries.length);
            const countryFlag = countries[randomNumber].flags.svg;
            correctAnswer = countries[randomNumber].name.common;

            const flagImage = document.createElement("img");
            flagImage.src = countryFlag;
            flagImage.alt = correctAnswer;

            answers.push(correctAnswer);
            for (let i = 0; i < 2; i++) {
                const randomNumber = Math.floor(Math.random() * countries.length);
                const countryName = countries[randomNumber].name.common;
                if (!answers.includes(countryName)) {
                    answers.push(countryName);
                } else {
                    i--;
                }
            }
            answers.sort(() => Math.random() - 0.5);

            const answer1 = document.createElement("input");
            answer1.type = "radio";
            answer1.name = "answers";
            answer1.id = "radio-button1";
            answer1.value = answers[0];

            const label1 = document.createElement("label");
            label1.setAttribute("for", "radio-button1");
            label1.textContent = answers[0];

            const answer2 = document.createElement("input");
            answer2.type = "radio";
            answer2.name = "answers";
            answer2.id = "radio-button2";
            answer2.value = answers[1];

            const label2 = document.createElement("label");
            label2.setAttribute("for", "radio-button2");
            label2.textContent = answers[1];

            const answer3 = document.createElement("input");
            answer3.type = "radio";
            answer3.name = "answers";
            answer3.id = "radio-button3";
            answer3.value = answers[2];

            const label3 = document.createElement("label");
            label3.setAttribute("for", "radio-button3");
            label3.textContent = answers[2];

            const submitButton = document.createElement("input");
            submitButton.type = "submit";
            submitButton.id = "submit-answer";
            submitButton.value = "Check Answer!";
            submitButton.style.display = "block";
            submitButton.style.margin = "auto";
            submitButton.style.marginTop = "20px";
            submitButton.style.borderRadius = "5px";
            submitButton.style.backgroundColor = "orange";
          

            formContainer.appendChild(flagImage);
            formContainer.appendChild(answer1);
            formContainer.appendChild(label1);
            formContainer.appendChild(answer2);
            formContainer.appendChild(label2);
            formContainer.appendChild(answer3);
            formContainer.appendChild(label3);
            formContainer.appendChild(submitButton);

            formContainer.addEventListener("submit", function (e) {
                e.preventDefault();

                const selectedAnswer = document.querySelector('input[name="answers"]:checked').value;

                if (selectedAnswer === correctAnswer) {
                    answerFeedback.textContent = "Correct!";
                } else {
                    answerFeedback.textContent = `Incorrect! The correct answer is: ${correctAnswer}`;
                }
            });
        })

        .catch(error => {
            console.error("Error fetching data: ", error);
        });
};

document.addEventListener("DOMContentLoaded", () => {
    selectRandomCountry();
});
