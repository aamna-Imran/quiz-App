import inquirer from "inquirer";
// API from trivia database
let url = "https://opentdb.com/api.php?amount=21&category=17&difficulty=easy&type=multiple";
// fetching data
let fetchData = async (data) => {
    let fetchQues = await fetch(data);
    let response = await fetchQues.json();
    return response.results;
};
let data = await fetchData(url);
// quiz asking funx
let startQuiz = async () => {
    // score board
    let score = 0;
    // username
    let user = await inquirer.prompt({
        type: "input",
        name: "f-name",
        message: "Enter your name :"
    });
    // quiz loop
    for (let i = 1; i <= 20; i++) {
        let answers = [...data[i].incorrect_answers, data[i].correct_answer];
        let question = await inquirer.prompt({
            type: "list",
            name: "ans",
            message: `Q#${[i]} ${data[i].question}`,
            choices: answers
        });
        if (question.ans == data[i].correct_answer) {
            ++score;
        }
        else {
            console.log(`correct answer was ${data[i].correct_answer}`);
        }
    }
    console.log(`${user["f-name"]} your score is ${score} out of 20`);
};
startQuiz();
