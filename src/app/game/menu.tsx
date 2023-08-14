import React from 'react';
import {Grid, MenuItem, FormControl, InputLabel, Select, Button} from '@mui/material';

export default function Menu({category, categories, setCategory, difficulty, setDifficulty, type, setType, handleOptions}) {

    const handleSubmit = (evt: any) => {
        evt.preventDefault();
        handleOptions();
    }

    const categoryOptions = categories.map((category: any) => {
        return (
            <MenuItem key={category.id} value={category.id}>{category.name}</MenuItem>
        )
    });

    return (
        <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Category</InputLabel>
            <Select
                labelId="category-label"
                id="category"
                value={category}
                label="Category"
                onChange={e => setCategory(e.target.value)}
            >
                {categoryOptions}
            </Select>
            </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
            <InputLabel id="difficulty-label">Difficulty</InputLabel>
            <Select
                labelId="difficulty-label"
                id="difficulty"
                value={difficulty}
                label="Difficulty"
            >
                <MenuItem value={'easy'}>Easy</MenuItem>
                <MenuItem value={'medium'}>Medium</MenuItem>
                <MenuItem value={'hard'}>Hard</MenuItem>
            </Select>
            </FormControl>
            </Grid>
            
            <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
            <InputLabel id="type-label">Type</InputLabel>
            <Select
                labelId="type-label"
                id="type"
                value={type}
                label="Type"
            >
                <MenuItem value={'multiple'}>Multiple Choice</MenuItem>
                <MenuItem value={'boolean'}>True/False</MenuItem>
            </Select>
            </FormControl>
            </Grid>
            <Button onClick={handleSubmit}>Play</Button>
        </Grid>
    )
}