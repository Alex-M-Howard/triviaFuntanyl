'use client';

import { useEffect, useState } from 'react';
import Menu from "./menu";
import Question from "./question";
import Scoreboard from "./scoreboard";
import Answer from "./answer";
import Choice from "./choice";

const NUMBER_OF_QUESTIONS: number = 15;
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

    const handleOptions = () => {
        setCategory(category);
        setDifficulty(difficulty);
        setType(type);

        console.log(category, difficulty, type);
    }

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


    return (
        <div>
            <Menu 
            category={category} 
            setCategory={setCategory}
            difficulty={difficulty} 
            setDifficulty={setDifficulty}
            type={type}
            setType={setType}
            handleOptions={handleOptions}
            />
            {/* <Answer /> */}
            {/* <Choice /> */}
            {/* <Question /> */}
            {/* <Scoreboard /> */}
        </div>
    )
}
