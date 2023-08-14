import {Button} from '@mui/material';
import QuestionType from '../../types/QuestionType';

interface QuestionProps {
    question: QuestionType,
    handleAnswer: (answer: string) => void
}

export default function Question({ question, handleAnswer}: QuestionProps) {
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
            buttons.push(<Button variant="contained" onClick={() => handleAnswer(answers[i])}>{answers[i]}</Button>)
        }
        return buttons;
    }
    
    
    return (
        <div>
            <div>
                    <p>{question.category}</p>
                    <p>Difficulty: {question.difficulty}</p>
            </div>
            <div>
            <h5>{question.question}</h5>
            </div>


            <div>
                {createButtons(getAnswers())}
            </div>
        </div>
    )
}