clean-my-tab

This is an app designed to help users format their guitar tablature for use with the “Guitar Eyes” app.
It allows users to upload guitar tablature via .txt file and it will remove most unwanted text that may be in the file that would cause issues with the parsing of the tablature. Once the file is uploaded, the app will “Clean” the original file and produce a new .txt file that is formatted for use with the Guitar Eyes app and gives the user the ability to rename the file to whatever they wish and it will be downloaded to their downloads file on their computer. There are a few things this app will not do; if the tablature in the original text file does not have single letters, followed by a vertical line, before each tablature line, the app will not recognize them as part of the tablature. So, the user will have to type those characters in before uploading the file to this app. The other issue is, if there is any text inserted into the actual tablature lines, themselves (I.e. playing instructions, etc.), the app will not be able to remove that text. So, the user will have to remove those words or characters either before uploading the file to this app or before uploading the “Cleaned tablature” file to Guitar Eyes.

 Below are instructions on how to set up and run the application locally.

 Table of Contents

- [Installation]
- [Running the App]
- [Building for Production]
- [Contributing]
##Before installation, create a new folder and open it in your desired code editor

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Phlypper/clean-my-tab.git
   cd clean-my-tab

2. Install dependencies:
   ```bash

npm install browserify-zlib
npm install util
Npm install mammoth

## Running the App

To start the development server, run:
```bash
npm start

The application will be available at `http://localhost:3000/`.

## Building for Production

To create a production build, run:
```bash
npm run build

The production-ready files will be in the `build` directory.

## Contributing

Contributions are welcome! Please submit a pull request or open an issue if you have any suggestions or find any bugs.

***This app was created with the help of multiple A.I. GPTs***
