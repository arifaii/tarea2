export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">
        <p className="copyright">
          © {currentYear} By Ariela Faivisovich Krowicki - Todos los derechos
          reservados
        </p>
        <p className="api-credit">
          Datos proporcionados por{" "}
          <a
            href="https://rickandmortyapi.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="api-link"
          >
            Rick and Morty API
          </a>
        </p>
      </div>
    </footer>
  );
};
