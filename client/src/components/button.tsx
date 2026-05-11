
interface ButtonProps {
    text: string,
    onClick: () => void;
}

export function Button({ text, onClick }: ButtonProps) {
    return (
        <button 
            className="bg-gray-800 text-white hover:bg-white hover:border-black hover:text-black transition-colors font-bold py-2 px-4 rounded border-2 cursor-pointer"
            onClick={onClick}
        >
            { text }
        </button>
    )
}