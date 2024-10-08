import { useState } from "react";
import axios from "axios";
import "./chat.css";

const ChatComponent = () => {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);
  const [generatingAnswer, setGeneratingAnswer] = useState(false);

  const brainTumorKeywords = [
    "brain tumor",
    "glioma",
    "meningioma",
    "astrocytoma",
    "tumor",
    "mass",
    "headache",
    "seizure",
    "vision",
    "balance",
    "cognition",
    "memory",
    "treatment",
    "surgery",
    "radiation",
    "chemotherapy",
    "brain",
    "who are you",
  ];

  async function generateAnswer(e) {
    setGeneratingAnswer(true);
    setQuestion("");
    e.preventDefault();

    const isBrainTumorRelated = brainTumorKeywords.some((keyword) =>
      question.toLowerCase().includes(keyword)
    );

    if (isBrainTumorRelated) {
      const newQuestion = { role: "user", content: question };
      setMessages((prevMessages) => [...prevMessages, newQuestion]);
      try {
        const response = await axios({
          url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyBVLZjVDMxzOG3LoD_xPt3ZzyaIXTZu89Y`,
          method: "post",
          data: {
            contents: [{ parts: [{ text: question }] }],
          },
        });

        const newAnswer = {
          role: "assistant",
          content: response.data.candidates[0].content.parts[0].text,
        };
        setMessages((prevMessages) => [...prevMessages, newAnswer]);
      } catch (error) {
        console.log(error);
        const errorMessage = {
          role: "assistant",
          content: "Sorry - Something went wrong. Please try again!",
        };
        setMessages((prevMessages) => [...prevMessages, errorMessage]);
      }
    } else {
      // Handle non-brain tumor related questions
      const offTopicMessage = {
        role: "assistant",
        content: "This chat is specifically for brain tumor-related questions.",
      };
      setMessages((prevMessages) => [...prevMessages, offTopicMessage]);
    }

    setGeneratingAnswer(false);
  }

  return (
    <div className="chat-container" style={{ marginTop: "100px" }}>
      <h1>Brain Tumor Help Bot</h1>
      <div className="messages-container">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message ${message.role}`}
            style={{
              backgroundColor: message.role === "user" ? "blue" : "",
              color: message.role === "user" ? "white" : "black",
            }}
          >
            {message.content}
          </div>
        ))}
      </div>
      <br />
      <br />
      <div className="input-container">
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask a brain tumor question"
          className="input-field"
        />
        <button
          style={{ padding: "20px" }}
          onClick={generateAnswer}
          className="send-button"
          disabled={generatingAnswer}
        >
          {generatingAnswer ? "Generating..." : "Ask"}
        </button>
      </div>
    </div>
  );
};

export default ChatComponent;
