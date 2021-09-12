import React from 'react';
import "./Header.scss";

export const Header = () => {
    return (
        <header className="header">
            <div className="container">
                <ul className="header-list">
                    <a href="/" className="header-list-item">
                        <li>Home</li>
                    </a>

                    <a href="/add" className="header-list-item">
                        <li>add</li>
                    </a>
                </ul>
            </div>
        </header>
    )
}
