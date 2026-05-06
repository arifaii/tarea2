import React from "react";

interface HeaderProps {
  onSearch: (term: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onSearch }) => {
  const [inputValue, setInputValue] = React.useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch(inputValue);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleClear = () => {
    setInputValue("");
    onSearch("");
  };

  return (
    <header className="header">
      <div className="header-container">
        <h1 className="logo">✨ Rick and Morty Catalog</h1>
        <form onSubmit={handleSubmit} className="search-form">
          <input
            type="text"
            placeholder="Buscar personaje..."
            value={inputValue}
            onChange={handleChange}
            className="search-input"
          />
          <button type="submit" className="search-button">
            🔍 Buscar
          </button>
          {inputValue && (
            <button
              type="button"
              onClick={handleClear}
              className="clear-button"
            >
              ✖
            </button>
          )}
        </form>
      </div>
    </header>
  );
};
