export default function Button({ text, handleAnswer }) {

    const handleClick = () => {
        handleAnswer(text);
    }

    return (
        <button onClick={handleClick}>{text}</button>
    )
}