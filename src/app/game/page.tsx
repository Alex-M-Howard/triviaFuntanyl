'use client';

import { useEffect, useState } from 'react';
import Menu from "./menu";
import Question from "./question";
import Scoreboard from "./scoreboard";
import Choice from "./choice";

const NUMBER_OF_QUESTIONS: number = 10;
const BASE_API_URL: string = 'https://opentdb.com/api.php';
const CATEGORIES_API_URL: string = 'https://opentdb.com/api_category.php';
const CATEGORY_QUESTION_COUNT_API_URL: string = 'https://opentdb.com/api_count.php?category=';

export default function Game() {
    const [totalQuestions, setTotalQuestions] = useState(NUMBER_OF_QUESTIONS);
    const [questions, setQuestions] = useState([]);
    const [category, setCategory] = useState('');
    const [categories, setCategories] = useState([]);
    const [difficulty, setDifficulty] = useState('easy');
    const [type, setType] = useState('multiple');
    const [score, setScore] = useState(0);

    useEffect(() => {
        const fetchQuestionCount = async (categories: any[]) => {
            const updatedCategories = await Promise.all(categories.map(async (category: any) => {
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
            const categories = data.trivia_categories;
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
            const questions = data.results;
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
        if (answer === questions[0].correct_answer) {
            setScore(score + 1);
        }

        setQuestions(questions.slice(1));

        if (questions.length < 1) {
            setQuestions([]);
        }
        // ? DISPLAY SCORE HERE?
    }


    return (
        <div>
            <Question question={questions[0]} handleAnswer={handleAnswer}/>            
            {/* <Answer /> */}
            {/* <Choice /> */}
            {/* <Question /> */}
            {/* <Scoreboard /> */}
        </div>
    )
}
