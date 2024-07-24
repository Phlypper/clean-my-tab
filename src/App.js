import React, { useState } from 'react';
import './App.css';
import TabExtractor from './TabExtractor';

function App() {
  const [file, setFile] = useState(null);
  const [tabContent, setTabContent] = useState(null);
  const [fileType, setFileType] = useState('');

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);

    const fileType = selectedFile.name.split('.').pop();
    setFileType(fileType);
  };

  const handleExtractTab = async () => {
    if (!file) {
      return;
    }
  
    try {
      const reader = new FileReader();
      reader.onload = (event) => {
        const fileContent = event.target.result;
        const fileType = file.name.split('.').pop().toLowerCase();
  
        setTabContent(fileContent);
        setFileType(fileType);
      };
      reader.readAsBinaryString(file);
    } catch (error) {
      console.error("Error reading file:", error);
    }
  };
  return (
<div>
  <main>
    <h1>Clean My Tab</h1>
    <p>
      Welcome to Clean My Tab. Here you can upload a text document that you may have copied from a guitar tablature site that has more than just the tablature in the document (i.e., other text surrounding the tablature). This app will extract the tablature from the document and create a new .txt document that you can use in the Guitar Eyes app.
    </p>
    <p><strong>A few caveats:</strong></p>
    <ol>
      <li>
        The tablature file needs to be in .txt or .docx format for use with this app. It currently does not accept any other text file formats.
      </li>
      <li>
        The tablature lines must have a single letter followed by a vertical line for the app to recognize them as part of the tablature (these letters can be in upper or lower case and in any order, in case of a song written in an alternate tuning). So if they are missing, you will have to type those in yourself, before uploading your file to this app.
      </li>
      <li>
        If there are any words or directions inside the tablature lines, you will need to remove them manually.
      </li>
    </ol>
  </main>

  <div>
    <label htmlFor="fileInput">Upload a text document:</label>
    <input type="file" id="fileInput" onChange={handleFileChange} />
    <button onClick={handleExtractTab}>Extract Tablature</button>
    {tabContent && <TabExtractor tabContent={tabContent} fileType={fileType} />}
  </div>
</div>
  );
}

export default App;
