import React, { useEffect, useState } from "react";
import ChatBox from "./ChatBox";
import { useSelector, useDispatch } from "react-redux";
import {
  IoIosCheckmarkCircle,
  IoMdFolder,
  IoMdFolderOpen,
  IoMdCode,
} from "react-icons/io";
import {
  VscFile,
  VscChevronDown,
  VscChevronRight,
  VscRunAll,
} from "react-icons/vsc";
import {
  setAllResponses,
  setCurrentFileCode,
} from "../redux/reducers/AiReducer";
import { getWebContainer } from "../config/webContainer";

const Building = () => {
  const { allPrompts, allResponses, fileData } = useSelector(
    (state) => state.ai
  );
  const dispatch = useDispatch();
  const [activeFile, setActiveFile] = useState(null);
  const [expandedFolders, setExpandedFolders] = useState({});
  const [iFrameUrl, setiFrameUrl] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [mountFiles, setmountFiles] = useState({});
  const [start, setstart] = useState(false);

  const { currentFileCode } = useSelector((state) => state.ai);
  const [webContainer, setwebContainer] = useState(null);

  const handleResponse = (response, promptIndex) => {
    dispatch(setAllResponses({ response, promptIndex }));
  };

  useEffect(() => {
    if (!webContainer) {
      getWebContainer().then((container) => {
        setwebContainer(container);
        console.log("Container Started");
      });
    }
  }, []);

  const handleFileSelect = (filename) => {
    const selectedFile = fileData.find((file) => file.filename === filename);
    if (selectedFile) {
      setActiveFile(selectedFile);
      dispatch(setCurrentFileCode(selectedFile.code));
    }
  };

  const toggleFolder = (folder) => {
    setExpandedFolders((prev) => ({
      ...prev,
      [folder]: !prev[folder],
    }));
  };

  // Group files by folder
  const fileStructure = allResponses[0]?.reduce((acc, file) => {
    const parts = file.split("/");
    if (parts.length > 1) {
      const folder = parts[0];
      if (!acc[folder]) {
        acc[folder] = [];
      }
      acc[folder].push(file);
    } else {
      if (!acc.root) {
        acc.root = [];
      }
      acc.root.push(file);
    }
    return acc;
  }, {});

  async function handleRunCode() {
    setIsRunning(true);
    try {
      console.log("Mounting Files");
      await webContainer?.mount(mountFiles);
      console.log("mounted");

      let lsProcess = await webContainer?.spawn("ls");
      lsProcess.output.pipeTo(
        new WritableStream({
          write(chunk) {
            console.log(chunk);
          },
        })
      );

      let installProcess = await webContainer?.spawn("npm", ["install"]);
      installProcess.output.pipeTo(
        new WritableStream({
          write(chunk) {
            console.log(chunk);
          },
        })
      );

      let startProcess = await webContainer?.spawn("npm", ["start"]);
      startProcess.output.pipeTo(
        new WritableStream({
          write(chunk) {
            console.log(chunk);
          },
        })
      );

      webContainer?.on("server-ready", function (port, url) {
        setIsRunning(false);
        setstart(() => true);
        console.log(port, url);
        setiFrameUrl(url);
      });
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <div className="flex h-screen bg-[#0A0C10] text-gray-200 overflow-hidden">
      {/* Left Panel - Chat Interface */}
      <div className="flex flex-col w-1/3 border-r border-gray-800">
        <div className="p-4 border-b border-gray-800 flex items-center gap-2 bg-[#0E1117]">
          <IoMdCode className="text-blue-400 text-xl" />
          <h2 className="font-semibold">AI Builder</h2>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {allPrompts?.map((prompt, index) => (
            <div
              key={index}
              className="bg-[#161B22] rounded-lg border border-gray-800 overflow-hidden"
            >
              <div className="px-4 py-3 bg-[#1E222A] border-b border-gray-800">
                <span className="text-sm text-gray-400">Prompt</span>
              </div>
              <div className="p-4 text-gray-300">{prompt}</div>

              {allResponses[index] && (
                <div className="border-t border-gray-800">
                  <div className="px-4 py-3 bg-[#1E222A] border-b border-gray-800 flex items-center gap-2">
                    <IoIosCheckmarkCircle className="text-green-500" />
                    <span className="text-sm">Generated Files</span>
                  </div>
                  <div className="p-2">
                    {allResponses[index]?.map((res, i) => (
                      <div
                        key={i}
                        onClick={() => handleFileSelect(res)}
                        className={`flex items-center gap-2 p-2 rounded cursor-pointer transition-colors ${
                          activeFile?.filename === res
                            ? "bg-[#252B36] text-blue-300"
                            : "hover:bg-[#252B36]"
                        }`}
                      >
                        <VscFile className="text-blue-400" />
                        <span className="text-sm truncate">{res}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="p-4 border-t border-gray-800 bg-[#0E1117]">
          <ChatBox
            onResponse={handleResponse}
            mountFiles={mountFiles}
            setmountFiles={setmountFiles}
          />
        </div>
      </div>

      {/* Right Panel - VS Code Interface */}
      <div className="flex-1 flex flex-col">
        {/* Toolbar */}
        <div className="flex items-center justify-between px-4 py-2 bg-[#0E1117] border-b border-gray-800">
          <div className="flex items-center">
            <IoMdFolderOpen className="text-yellow-500 mr-2" />
            <span className="text-sm font-medium">EXPLORER: PROJECT</span>
          </div>
          <button
            onClick={handleRunCode}
            className="flex items-center gap-1 px-3 py-1 bg-blue-600 rounded text-sm hover:bg-blue-700 transition-colors"
          >
            <VscRunAll className="text-sm" />
            {isRunning ? "Running" : !isRunning && start ? "Start" : "Run"}
          </button>
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* File Explorer Sidebar */}
          <div className="w-64 bg-[#161B22] border-r border-gray-800 overflow-y-auto">
            <div className="py-2">
              <div
                className="flex items-center px-4 py-1 text-gray-400 hover:bg-[#1E222A] cursor-pointer"
                onClick={() => toggleFolder("project")}
              >
                {expandedFolders["project"] ? (
                  <VscChevronDown className="mr-1" />
                ) : (
                  <VscChevronRight className="mr-1" />
                )}
                <IoMdFolder className="mr-2 text-yellow-500" />
                <span>PROJECT</span>
              </div>

              {expandedFolders["project"] && (
                <div className="pl-8 pr-2 py-1">
                  {fileStructure &&
                    Object.entries(fileStructure).map(([folder, files]) => (
                      <div key={folder} className="mb-2">
                        {folder !== "root" && (
                          <div
                            className="flex items-center py-1 text-gray-400 hover:bg-[#1E222A] cursor-pointer"
                            onClick={() => toggleFolder(folder)}
                          >
                            {expandedFolders[folder] ? (
                              <VscChevronDown className="mr-1" />
                            ) : (
                              <VscChevronRight className="mr-1" />
                            )}
                            <IoMdFolder className="mr-2 text-yellow-500" />
                            <span className="text-sm">{folder}</span>
                          </div>
                        )}

                        {expandedFolders[folder] || folder === "root" ? (
                          <div className="pl-6">
                            {files.map((file, i) => (
                              <div
                                key={i}
                                onClick={() => handleFileSelect(file)}
                                className={`flex items-center gap-1 py-1 px-2 rounded cursor-pointer ${
                                  activeFile?.filename === file
                                    ? "bg-[#252B36] text-blue-300"
                                    : "text-gray-400 hover:bg-[#252B36]"
                                }`}
                              >
                                <VscFile className="flex-shrink-0" />
                                <span className="text-sm truncate">
                                  {file.split("/").pop()}
                                </span>
                              </div>
                            ))}
                          </div>
                        ) : null}
                      </div>
                    ))}
                </div>
              )}
            </div>
          </div>

          {/* Editor Area */}
          <div className="flex-1 flex flex-col bg-[#0E1117]">
            {/* Editor Tabs */}
            <div className="flex border-b border-gray-800 bg-[#161B22]">
              {activeFile && (
                <div className="px-4 py-2 border-r border-gray-800 flex items-center text-sm bg-[#0E1117]">
                  <VscFile className="mr-2 text-blue-400" />
                  {activeFile.filename}
                </div>
              )}
              {iFrameUrl && (
                <div
                  className={`px-4 py-2 border-r border-gray-800 flex items-center text-sm cursor-pointer ${
                    !activeFile ? "bg-[#0E1117]" : "hover:bg-[#1E222A]"
                  }`}
                  onClick={() => setActiveFile(null)}
                >
                  Preview
                </div>
              )}
            </div>

            {/* Code Display or Preview */}
            <div className="flex-1 overflow-auto">
              {activeFile ? (
                <div className="p-4 font-mono text-sm">
                  <div className="text-gray-500 mb-2">
                    // {activeFile.filename}
                  </div>
                  <pre className="text-gray-300 overflow-auto">
                    {activeFile.code || "// No code generated yet"}
                  </pre>
                </div>
              ) : iFrameUrl ? (
                <div className="h-full w-full">
                  <iframe
                    src={iFrameUrl}
                    className="w-full h-full bg-white"
                    title="Preview"
                  />
                </div>
              ) : (
                <div className="h-full flex items-center justify-center text-gray-500">
                  {isRunning
                    ? "Loading preview..."
                    : "Select a file or run the project to see preview"}
                </div>
              )}
            </div>

            {/* Status Bar */}
            <div className="px-4 py-1 bg-[#0A0C10] border-t border-gray-800 text-xs flex justify-between text-gray-500">
              <div>AI Code Generator</div>
              <div>React • JavaScript</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Building;
