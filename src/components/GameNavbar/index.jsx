import Select from "react-select";
import "./index.css";

const GameNavbar = ({
  userLang,
  setUserLang,
  userTheme,
  setUserTheme,
  fontSize,
  setFontSize,
}) => {
  const languages = [
    { value: "py", label: "Python" },
    { value: "js", label: "JavaScript" },
  ];

  const themes = [
    { value: "vs-dark", label: "Dark" },
    { value: "light", label: "Light" },
  ];

  const handleLangChange = (selectedOption) => {
    setUserLang(selectedOption.value);
  };

  const handleThemeChange = (selectedOption) => {
    setUserTheme(selectedOption.value);
  };

  return (
    <div className="navbar">
      <h1>Code Compiler</h1>

      <label htmlFor="languageSelect">Select Language</label>
      <Select
        id="languageSelect"
        options={languages}
        value={{ value: userLang, label: userLang }}
        onChange={handleLangChange}
        placeholder={userLang}
      />

      <label htmlFor="themeSelect">Select Theme</label>
      <Select
        id="themeSelect"
        options={themes}
        value={{ value: userTheme, label: userTheme }}
        onChange={handleThemeChange}
        placeholder={userTheme}
      />

      <label htmlFor="fontSizeRange">Font Size</label>
      <input
        id="fontSizeRange"
        type="range"
        min="18"
        max="30"
        value={fontSize}
        step="2"
        onChange={(e) => setFontSize(e.target.value)}
      />
      <button className="leave">Leave Room</button>
    </div>
  );
};

export default GameNavbar;
