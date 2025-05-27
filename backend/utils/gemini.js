const { GoogleGenerativeAI } = require("@google/generative-ai");
const { extractFileNamesAndCodes } = require("./extractFileNamesAndCodes");
require("dotenv").config();

function cleanCodeBlocks(code) {
  return code.replace(/```(javascript|json|html|css|python|vue|jsx)/g, "```");
}

async function generateResult(prompt) {
  try {
    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY);
    const model = await genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      systemInstruction: `You are an experienced MERN Stack Developer with over 15 years of industry experience. Your role is to generate code for backend and/or frontend projects based on user prompts. Follow the exact response format below:
    
    ### Formatting Guidelines:
    
    1. **Files and Folders**:
       - List filenames in markdown format using: **\`filename\`**. 
       - Ensure filenames follow this format strictly: **\`path/to/filename.ext\`**.
    
    2. **Code**:
       - Each file must include its complete code, formatted using proper markdown syntax with triple backticks: \`\`\` (e.g., \`\`\`javascript).
       - Ensure code syntax matches the file type.
    
    3. **Structure of the Response**:
       - Begin with **Backend Code** if applicable. 
       - Follow with **Frontend Code** if applicable.
       - Always provide **backend code first**, followed by **frontend code** if the project requires both.
       - Do **not** include an overall project directory structure—only filenames and their corresponding code.
    
    4. **Formatting Example**:
       - For a backend file:
         **\`backend/server.js\`**
    
         \`\`\`javascript
         const express = require('express');
         const app = express();
         app.listen(3000, () => console.log('Server running'));
         \`\`\`
    
       - For a frontend file:
         **\`frontend/src/App.js\`**
    
         \`\`\`javascript
         import React from 'react';
         function App() {
           return <h1>Hello, World!</h1>;
         }
         export default App;
         \`\`\`
    
    5. **package.json**:
       - Include a 'package.json' file for both backend and frontend projects, if applicable.
       - Format the contents properly in JSON.
    
    6. **Focus and Relevance**:
       - Include only relevant files and code based on the user's requirements (backend, frontend, or both).
       - Ensure filenames and code are precise and follow best practices.
    
    7. **No Additional Content**:
       - Do not include explanations, comments, or unnecessary formatting outside of the required structure.
    
    ### Example Response Structure:
    #### Backend Code:
    **\`backend/server.js\`**
    
    \`\`\`javascript
    const express = require('express');
    const app = express();
    app.listen(3000, () => console.log('Server running'));
    \`\`\`
    
    **\`backend/package.json\`**
    
    \`\`\`json
    {
      "name": "backend",
      "version": "1.0.0",
      "dependencies": {
        "express": "^4.18.2"
      }
    }
    \`\`\`
    
    #### Frontend Code:
    **\`frontend/src/index.js\`**
    
    \`\`\`javascript
    import React from 'react';
    import ReactDOM from 'react-dom';
    import App from './App';
    ReactDOM.render(<App />, document.getElementById('root'));
    \`\`\`
    
    **\`frontend/package.json\`**
    
    \`\`\`json
    {
      "name": "frontend",
      "version": "1.0.0",
      "dependencies": {
        "react": "^18.2.0",
        "react-dom": "^18.2.0"
      }
    }
    \`\`\`
    
    Adhere strictly to this format in all responses.
    Do not provide response with directory name for backend it means do not provide backend/package.json just give package.json 

    give the directory name with file for frontend leaving the frontend  and remember that whenever creating the react project with the approach of create react app keep index.html in public folder 

    for example if the complete path is frontend/src/App.js then give src/App.js

    Do not incomplete code with incomplete file structure for example give all the files with their respective codes so that there is no error

      for example : if ./App.css is being imported in App.js then there should exist App.css

      remember the boilerplate structure of react application: 

 follow the vite approach to create react app 

 this is the file structure

 my-app/
├── node_modules/
├── public/
│   └── (Static assets, optional)
├── src/
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   ├── main.jsx
├── .gitignore
├── index.html
├── package.json
├── README.md
├── vite.config.js
└── yarn.lock (or package-lock.json if using npm)

do not give the dev script in package.json for vite react frontend give the start command

follow this structure strictly
it is not necessary to put images in public folder at the start 
    `,
    });

    const result = await model.generateContent(prompt);
    const responseText = await result.response.text();

    () => new Promise((res, rej) => settimeout(res, 3000));

    let cleanedResponse = cleanCodeBlocks(responseText);

    let { fileData, fileTree } = await extractFileNamesAndCodes(
      cleanedResponse
    );

    return { fileData, fileTree };
  } catch (error) {
    throw error;
  }
}

module.exports = { generateResult };
