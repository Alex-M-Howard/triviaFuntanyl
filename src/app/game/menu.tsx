import React, { useState } from 'react';

export default function Menu({category, setCategory, difficulty, setDifficulty, type, setType, handleOptions}) {

    const handleSubmit = (evt: any) => {
        evt.preventDefault();
        handleOptions();
    }

    return (
        <form>

            <label htmlFor='difficulty'>Choose a difficulty</label>
            <select name='difficulty' id='difficulty' value={difficulty} onChange={e => setDifficulty(e.target.value)}>
                <option value='easy'>Easy</option>
                <option value='medium'>Medium</option>
                <option value='hard'>Hard</option>
            </select>
            
            <label htmlFor='type'>Choose a type</label>
            <select name='type' id='type' value={type} onChange={e => setType(e.target.value)}>
                <option value='multiple'>Multiple Choice</option>
                <option value='boolean'>True/False</option>
            </select>

            <button onClick={handleSubmit}>Play</button>
        </form>
    )
}