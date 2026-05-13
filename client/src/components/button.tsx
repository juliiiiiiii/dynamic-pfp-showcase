
interface ButtonProps {
    text: string,
    onClick?: () => void;
    href?: string;
    disabled?: boolean;
}

export function Button({ text, onClick, href, disabled }: ButtonProps) {

    const className = `bg-gray-800 text-white hover:bg-white hover:border-black hover:text-black transition-colors font-bold py-2 px-4 rounded border-2 cursor-pointer`;

    if(href) {
        return (
            <a
                href={href}
                className={className}
            >
                {text}
            </a>
        );
    }

    return (
        <button 
            className={className}
            onClick={onClick}
            disabled={disabled}
        >
            { text }
        </button>
    )
}