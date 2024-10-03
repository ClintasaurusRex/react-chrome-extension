import useDarkMode from "../helpers/useDarkMode";
import useFontSize from "../helpers/useFontSize";
import { useEffect, useState } from "react";
import "./Options.scss";
import useSummarizer from "../helpers/useSummarizer";

const Options = () => {
  const { darkMode, darkModeChange } = useDarkMode();
  const { fontSizeChange, fontSize } = useFontSize();
  const { summaryLength, handleSummaryLengthChange } = useSummarizer();
  const [isSoundEnabled, setIsSoundEnabled] = useState(true);

  useEffect(() => {
    chrome.storage.sync.get(["soundEnabled"], function (result) {
      if (result.soundEnabled !== undefined) {
        setIsSoundEnabled(result.soundEnabled);
      }
    });
  }, []);

  // Handle sound toggle change
  const handleSoundToggle = (e) => {
    const isChecked = e.target.checked;
    setIsSoundEnabled(isChecked);
    chrome.storage.sync.set({ soundEnabled: isChecked }); // Save preference in Chrome storage
  };

  // have to do a hook about the up section

  return (
    <div className="options-container">
      <h1 id="tldr-options">T.L.D.R. Options</h1>
      <div className="options-list">
        <div className="option-item">
          <label htmlFor="darkMode">Enable Night Mode:</label>
          <input
            type="checkbox"
            id="darkMode"
            name="darkMode"
            checked={darkMode}
            onChange={darkModeChange}
          />
        </div>

        <div className="option-item">
          <label htmlFor="fontSize">Font Size:</label>
          <select id="fontSize" name="fontSize" value={fontSize} onChange={fontSizeChange}>
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
            <option value="x-large">Extra Large</option>
          </select>
        </div>

        <div className="option-item">
          <label htmlFor="soundEffect">Enable Sound Effects:</label>
          <input
            type="checkbox"
            id="soundEffect"
            name="soundEffect"
            checked={isSoundEnabled}
            onChange={handleSoundToggle}
          />
        </div>

        <div className="option-item">
          <label htmlFor="summaryLength">Summary Length:</label>
          <select
            id="summaryLength"
            name="summaryLength"
            value={summaryLength}
            onChange={handleSummaryLengthChange}
          >
            <option value="short">Short</option>
            <option value="medium">Medium</option>
            <option value="long">Long</option>
          </select>
        </div>
      </div>
      {darkMode && <h2 id="darkmode-on">Night Mode On</h2>}
    </div>
  );
};

export default Options;
