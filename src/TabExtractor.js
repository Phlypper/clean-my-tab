import React, { useState, useEffect } from 'react';
import mammoth from 'mammoth';

function TabExtractor({ tabContent, fileType }) {
  const [cleanedTablature, setCleanedTablature] = useState('');
  const [filename, setFilename] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const extractTablature = async () => {
      let extractedTablature = '';

      if (fileType === 'txt') {
        extractedTablature = extractTablatureFromTxt(tabContent);
      } else if (fileType === 'docx') {
        extractedTablature = await extractTablatureFromDocx(tabContent);
      }

      setCleanedTablature(extractedTablature);
      setIsLoading(false);
    };

    extractTablature();
  }, [tabContent, fileType]);

  const handleFilenameChange = (event) => {
    setFilename(event.target.value);
  };

  const handleDownload = () => {
    const fileContent = cleanedTablature;
    const fileName = filename || 'cleaned_tablature.txt';
    const element = document.createElement('a');
    const file = new Blob([fileContent], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = fileName;
    document.body.appendChild(element); // Required for Firefox
    element.click();
    document.body.removeChild(element);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Extracted Tablature</h2>
      <pre>{cleanedTablature}</pre>

      <label htmlFor="filename">Enter a filename:</label>
      <input type="text" id="filename" value={filename} onChange={handleFilenameChange} />
      <button onClick={handleDownload}>Download Cleaned Tablature</button>
    </div>
  );
}

function extractTablatureFromTxt(content) {
  // Split the content by newlines to get an array of lines
  const lines = content.split('\n');

  // Extract the tablature lines based on the specified criteria
  const tabLines = lines.filter((line) => {
    // Tab lines should start with a letter (uppercase or lowercase) followed by a vertical line
if (!/^[a-gA-G][|#b]\|/.test(line)) {
  return false;
}

    // Extract the content within the tablature line based on specified patterns
const extractedContent = line
  .replace(/([^-|0-9BRPH TX/\\~#b]|(?<=\S)-(?=\S))+/g, '')
  .replace(/(B|R|P|H|T|X)(?=[0-9])|(?<=[0-9])(B|R|P|H|T|X)|[/\\~#b](?=[0-9])|(?<=[0-9])[/\\~#b]/g, '');

    // Remove the tablature line if it only contains non-tab characters
    return extractedContent.length > 0;
  });

  // Join the extracted tablature lines with newline characters
  const cleanedTablature = tabLines.join('\n');

  return cleanedTablature;
}

async function extractTablatureFromDocx(content) {
  return new Promise((resolve, reject) => {
    try {
      mammoth.extractRawText({ arrayBuffer: content })
        .then((result) => {
          const textContent = result.value;

          const cleanedTablature = extractTablatureFromTxt(textContent);

          resolve(cleanedTablature);
        })
        .catch((error) => {
          reject(error);
        });
    } catch (error) {
      reject(error);
    }
  });
}

export default TabExtractor;
