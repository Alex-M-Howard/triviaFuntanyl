'use client';
import React from 'react';
import Menu from "./menu";
import Question from "./question";
import Score from "./score";
import QuestionType from "../../types/QuestionType";

const NUMBER_OF_QUESTIONS: number = 10;
const BASE_API_URL: string = 'https://opentdb.com/api.php';
const CATEGORIES_API_URL: string = 'https://opentdb.com/api_category.php';
const CATEGORY_QUESTION_COUNT_API_URL: string = 'https://opentdb.com/api_count.php?category=';

interface Category {
    id: number;
    name: string;
    questionCount: number;
}

export default function Game(): JSX.Element {
    const [totalQuestions, setTotalQuestions] = React.useState<number>(NUMBER_OF_QUESTIONS);
    const [questions, setQuestions] = React.useState<QuestionType[]>([]);
    const [category, setCategory] = React.useState<number>(0);
    const [categories, setCategories] = React.useState<Category[]>([]);
    const [difficulty, setDifficulty] = React.useState<string>('easy');
    const [type, setType] = React.useState<string>('multiple');
    const [score, setScore] = React.useState<number>(0);
    const [gameOver, setGameOver] = React.useState<boolean>(false);

    React.useEffect(() => {
        const fetchQuestionCount = async (categories: Category[]) => {
            const updatedCategories = await Promise.all(categories.map(async (category: Category) => {
                const response = await fetch(CATEGORY_QUESTION_COUNT_API_URL + category.id);
                const data = await response.json();
                return {
                    ...category,
                    questionCount: data.category_question_count.total_question_count,
                };
            }));
            
            setCategories(updatedCategories);
        }
    
        const fetchCategories = async () => {
            const response = await fetch(CATEGORIES_API_URL);
            const data = await response.json();
            const categories: Category[] = data.trivia_categories;
            setCategories(categories);
            fetchQuestionCount(categories);
        }
    
        fetchCategories();
    }, []);

    const handleOptions = () => {
        const fetchQuestions = async () => {
            const response = await fetch(BASE_API_URL + `?amount=${totalQuestions}&category=${category}&difficulty=${difficulty}&type=${type}`);
            const data = await response.json();
            const questions: QuestionType[] = data.results;
            setQuestions(questions);
            setScore(0); // Reset the score when new questions are loaded
            setGameOver(false); // Reset the game over state
        }

        fetchQuestions();
    }

    const handleAnswer = (answer: string) => {
        if (questions.length > 0) {
            if (answer === questions[0].correct_answer) {
                setScore(score + 1);
            }

            setQuestions(questions.slice(1));

            if (questions.length < 1) {
                setGameOver(true);
            }
        }
    }

    if (categories.length < 1) {
        return <div>Loading...</div>;
    }

    if (gameOver) {
        return (
            <div>
                <Score score={score} />
                <h2>Game Over! Your final score: {score}</h2>
            </div>
        );
    }

    if (questions.length < 1) {
        return (
            <Menu 
                category={category}
                categories={categories} 
                setCategory={setCategory}
                difficulty={difficulty} 
                setDifficulty={setDifficulty}
                type={type}
                setType={setType}
                handleOptions={handleOptions}
            />
        );
    }

    return (
        <div>
            <Score score={score} />
            <Question question={questions[0]} handleAnswer={handleAnswer} />            
        </div>
    );
}
