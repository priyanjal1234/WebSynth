module.exports.extractFileNamesAndCodes = function (mdContent) {
  let fileNameRegex = /\*\*`([^`]+)`\*\*/g;
  let codeBlockRegex = /```([\s\S]*?)```/g;

  let fileNames = [];
  let fileCodes = [];

  let fileNameMatch;
  let codeBlockMatch;

  while ((fileNameMatch = fileNameRegex.exec(mdContent)) !== null) {
    fileNames.push(fileNameMatch[1]);
  }

  while ((codeBlockMatch = codeBlockRegex.exec(mdContent)) !== null) {
    fileCodes.push(codeBlockMatch[1]);
  }

  let fileTree = {};

  fileNames.forEach(function (filename, index) {
    let code = fileCodes[index] || "";
    let parts = filename.split("/");
    let current = fileTree;

    for (let i = 0; i < parts.length; i++) {
      let part = parts[i];

      if (i === parts.length - 1) {
        current[part] = {
          file: {
            contents: code,
          },
        };
      } else {
        current[part] = current[part] || {
          directory: {},
        };
        current = current[part].directory;
      }
    }
  });

  let fileData = fileNames.map((filename, index) => ({
    filename,
    code: fileCodes[index] || "",
  }));

  return { fileData, fileTree };
};
