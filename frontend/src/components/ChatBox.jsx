import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setAllPrompts,
  setCurrentPrompt,
  setAllResponses,
  setFileData,
} from "../redux/reducers/AiReducer";
import { IoMdSend } from "react-icons/io";

const ChatBox = ({onResponse,mountFiles,setmountFiles}) => {
  const [prompt, setprompt] = useState("");
  let dispatch = useDispatch();
  
  const [iFrameUrl, setiFrameUrl] = useState("");

  const { currentFileCode } = useSelector((state) => state.ai);

  async function handleGetAIResponse(e) {
    e.preventDefault();
    dispatch(setCurrentPrompt(prompt));
    dispatch(setAllPrompts(prompt));

    try {
      let res = await axios.post(
        "http://localhost:3000/api/ai/get-result",
        { prompt },
        { withCredentials: true }
      );

      

      setmountFiles(res?.data?.fileTree);
      dispatch(setFileData(res?.data?.currentProject?.response));
      dispatch(
        setAllResponses(res?.data?.fileData?.map((item) => item.filename))
      );
      setprompt("");
    } catch (error) {
      console.log(error.message);
    }
  }

  

  return (
    <div className=" inset-0 flex items-end  pointer-events-none ">
      {/* Prompt Input Bar */}
      <div className="w-full max-w-2xl mb-6 pointer-events-auto">
        <form
          onSubmit={handleGetAIResponse}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={prompt}
            onChange={(e) => setprompt(e.target.value)}
            placeholder="Ask me to build something..."
            className="flex-1 bg-[#1E222A] border border-gray-700 rounded-md px-3 py-2 text-sm 
                  focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500
                  transition-all duration-200"
          />
          <button
            type="submit"
            className="p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 
                  transition-colors duration-200 flex items-center justify-center"
          >
            <IoMdSend />
          </button>
        </form>
      </div>

      {/* Start/Run Button */}
      {/* {currentFileCode && (
        <div className="absolute top-1/2 right-10 transform -translate-y-1/2 pointer-events-auto">
          <button
            onClick={handleRunCode}
            className="bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 transition px-7 py-3 rounded-2xl text-white font-bold text-lg shadow-xl border-2 border-green-400"
          >
            {start ? "Run" : "Start"}
          </button>
        </div>
      )} */}

      {/* WebContainer Output Iframe */}
      {iFrameUrl && webContainer && (
        <div className="fixed bottom-32 right-10 pointer-events-auto shadow-2xl rounded-2xl border-2 border-gray-700 overflow-hidden bg-gray-900">
          <div className="bg-gray-800 px-4 py-2 text-white font-semibold border-b border-gray-700 flex items-center justify-between">
            <span>Web Output</span>
            <span className="text-xs text-gray-400">{iFrameUrl}</span>
          </div>
          <iframe
            className="w-[500px] h-[300px] bg-black"
            src={iFrameUrl}
            title="Web Output"
            allow="cross-origin-isolated"
          ></iframe>
        </div>
      )}
    </div>
  );
};

export default ChatBox;
