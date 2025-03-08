import React from 'react';

import '../../styles/components.css';

interface MenuButtonProps {
    text: string;
    path: string;
    isActive: boolean;
    onNavigate: (path: string) => void;
}

const MenuButton: React.FC<MenuButtonProps> = ({ text, path, isActive, onNavigate}) => {
    
    const handleClick = () => {
        onNavigate(path);
    };

    return (
        <>
            <button
                className={`defaultButton ${isActive ? 'activeButton' : 'inactiveButton'}`}
                onClick={handleClick}
                >
                {text}
            </button>
        </>
    );
};

export default MenuButton;
