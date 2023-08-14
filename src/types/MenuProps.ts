import Category from './Category';

interface MenuProps {
    category: number;
    categories: Category[];
    setCategory: React.Dispatch<React.SetStateAction<number>>;
    difficulty: string;
    setDifficulty: React.Dispatch<React.SetStateAction<string>>;
    type: string;
    setType: React.Dispatch<React.SetStateAction<string>>;
    handleOptions: () => void;
}

export default MenuProps;
