'use client';

import { useEffect, useState } from 'react';
import Menu from "./menu";
import Question from "./question";
import Scoreboard from "./scoreboard";
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
    const [totalQuestions, setTotalQuestions] = useState<number>(NUMBER_OF_QUESTIONS);
    const [questions, setQuestions] = useState<QuestionType[]>([]);
    const [category, setCategory] = useState<number>(0);
    const [categories, setCategories] = useState<Category[]>([]);
    const [difficulty, setDifficulty] = useState<string>('easy');
    const [type, setType] = useState<string>('multiple');
    const [score, setScore] = useState<number>(0);

    useEffect(() => {
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
        console.log(category, difficulty, type)
        const fetchQuestions = async () => {
            const response = await fetch(BASE_API_URL + `?amount=${totalQuestions}&category=${category}&difficulty=${difficulty}&type=${type}`);
            const data = await response.json();
            const questions: QuestionType[] = data.results;
            setQuestions(questions);
        }

        fetchQuestions();
    }

    if (categories.length < 1) {
        return (
            <div>Loading...</div>
        )
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
        )
    }


    const handleAnswer = (answer: string) => {
        if (questions.length > 0 && answer === questions[0].correct_answer) setScore(score + 1);
        
        setQuestions(questions.slice(1));
        if (questions.length < 1) setQuestions([]);
    }


    return (
        <div>
            <Score score={score}/>
            <Question question={questions[0]} handleAnswer={handleAnswer}/>            
        </div>
    )
}
