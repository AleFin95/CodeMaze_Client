import Select from "react-select";
import "./Navbar.css";
import "./index";

const Navbar = ({
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
    { value: "cpp", label: "C++" },
    { value: "c", label: "C" },
    { value: "go", label: "GoLang" },
    { value: "cs", label: "C#" },
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
    </div>
  );
};

export default Navbar;