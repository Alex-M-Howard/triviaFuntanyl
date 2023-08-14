import React, { ChangeEvent } from 'react';
import { Grid, MenuItem, FormControl, InputLabel, Select, Button } from '@mui/material';
import Category from '../../types/Category';
import MenuProps from '../../types/MenuProps';


export default function Menu({
    category,
    categories,
    setCategory,
    difficulty,
    setDifficulty,
    type,
    setType,
    handleOptions
}: MenuProps): JSX.Element {

    const handleSubmit = (evt: React.FormEvent) => {
        evt.preventDefault();
        handleOptions();
    }

    const categoryOptions = categories.map((category: Category) => (
        <MenuItem key={category.id} value={category.id}>
            {category.name}
        </MenuItem>
    ));

    return (
        <Grid container spacing={3} direction={'column'} justifyContent={'center'} alignContent={'center'} sx={{minHeight: '100vh'}}>
            <Grid item xs={12} sx={{maxWidth: '500px', minWidth: '300px', mx: 'auto'}}>
                <FormControl fullWidth>
                    <InputLabel id="category-label">Category</InputLabel>
                    <Select
                        labelId="category-label"
                        id="category"
                        value={category}
                        label="Category"
                        onChange={e => setCategory(e.target.value as number)}
                    >
                        {categoryOptions}
                    </Select>
                </FormControl>
            </Grid>

            <Grid item xs={12} sx={{maxWidth: '500px', minWidth: '300px', mx: 'auto'}}>
                <FormControl fullWidth>
                    <InputLabel id="difficulty-label">Difficulty</InputLabel>
                    <Select
                        labelId="difficulty-label"
                        id="difficulty"
                        value={difficulty}
                        label="Difficulty"
                        onChange={e => setDifficulty(e.target.value as string)}
                    >
                        <MenuItem value={'easy'}>Easy</MenuItem>
                        <MenuItem value={'medium'}>Medium</MenuItem>
                        <MenuItem value={'hard'}>Hard</MenuItem>
                    </Select>
                </FormControl>
            </Grid>

            <Grid item xs={12} sx={{maxWidth: '500px', minWidth: '300px', mx: 'auto'}}>
                <FormControl fullWidth>
                    <InputLabel id="type-label">Type</InputLabel>
                    <Select
                        labelId="type-label"
                        id="type"
                        value={type}
                        label="Type"
                        onChange={e => setType(e.target.value as string)}
                    >
                        <MenuItem value={'multiple'}>Multiple Choice</MenuItem>
                        <MenuItem value={'boolean'}>True/False</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={12} sx={{maxWidth: '500px', minWidth: '300px', mx: 'auto'}}>
                <Button variant='contained' onClick={handleSubmit} sx={{width: '100%'}}>Play</Button>
            </Grid>
        </Grid>
    );
}
