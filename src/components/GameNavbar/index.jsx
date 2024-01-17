import { Link } from 'react-router-dom';
import Select from 'react-select';
import './index.css';

const GameNavbar = ({
  userLang,
  setUserLang,
  userTheme,
  setUserTheme,
  fontSize,
  setFontSize,
  socket
}) => {
  const languages = [
    { value: 'py', label: 'Python' },
    { value: 'js', label: 'JavaScript' }
  ];

  const leaveRoom = () => {
    socket.disconnect();
  };

  const themes = [
    { value: 'vs-dark', label: 'Dark' },
    { value: 'light', label: 'Light' }
  ];

  const handleLangChange = (selectedOption) => {
    setUserLang(selectedOption.value);
  };

  const handleThemeChange = (selectedOption) => {
    setUserTheme(selectedOption.value);
  };

  return (
    <div className='navbar'>
      <div className='navbar-item'>
        <label htmlFor='languageSelect'>Language:</label>
        <Select
          id='languageSelect'
          options={languages}
          value={{ value: userLang, label: userLang }}
          onChange={handleLangChange}
          placeholder={userLang}
        />
      </div>

      <div className='navbar-item'>
        <label htmlFor='themeSelect'>Theme:</label>
        <Select
          id='themeSelect'
          options={themes}
          value={{ value: userTheme, label: userTheme }}
          onChange={handleThemeChange}
          placeholder={userTheme}
        />
      </div>

      <div className='navbar-item'>
        <label htmlFor='fontSizeRange'>Font Size:</label>
        <input
          id='fontSizeRange'
          type='range'
          min='18'
          max='30'
          value={fontSize}
          step='2'
          onChange={(e) => setFontSize(e.target.value)}
        />
      </div>

      <Link to='/'>
        <button className='leave' onClick={leaveRoom}>
          Leave Room
        </button>
      </Link>
    </div>
  );
};

export default GameNavbar;
