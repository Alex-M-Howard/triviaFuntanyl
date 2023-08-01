export default function Question({ question, handleAnswer}) {
    console.log(question)
    
    const getAnswers = () => {
        const answers = question.incorrect_answers;
        answers.push(question.correct_answer);
        
        answers.sort(() => Math.random() - 0.5);
        return answers;
    }
    
    const createButtons = (answers: any) => {
        const buttons = [];
        for (let i = 0; i < answers.length; i++) {
            buttons.push(<button onClick={() => handleAnswer(answers[i])}>{answers[i]}</button>)
        }
        return buttons;
    }
    
    
    return (
        <div>
            <h1>Category: {question.category}</h1>
            <h1>Difficulty: {question.difficulty}</h1>
            <h1>Question: {question.question}</h1>

            {createButtons(getAnswers())}

        </div>
    )
}