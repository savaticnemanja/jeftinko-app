import React, { useState } from "react";
import './Chatbot.scss'; // Import the SCSS file for styles

export default function Chatbot() {
  const [step, setStep] = useState(0); // Track the current step in the chat
  const [answers, setAnswers] = useState({}); // Store the user's answers
  const [catalogUrl, setCatalogUrl] = useState(""); // Store the generated catalog URL
  const [expanded, setExpanded] = useState(false); // Track if the chatbox is expanded

  // Handle when the user selects an answer
  const handleAnswer = (key, value) => {
    setAnswers((prev) => ({
      ...prev,
      [key]: value,
    }));

    // Move to the next step based on the current step
    setStep((prevStep) => prevStep + 1);
  };

  // Function to generate the Evershop catalog URL based on the user's answers
  const generateCatalogUrl = () => {
    const { gender, age, purchaseFor, type, price } = answers;

    // Construct the query string for the catalog URL
    let url = "https://evershop.com/catalog?";

    if (gender) url += `gender=${gender}&`;
    if (age) url += `age=${age}&`;
    if (purchaseFor) url += `purchaseFor=${purchaseFor}&`;
    if (type) url += `type=${type}&`;
    if (price) url += `price=${price}`;

    // Remove trailing '&' if it exists
    if (url.endsWith("&")) {
      url = url.slice(0, -1);
    }

    setCatalogUrl(url); // Set the generated URL to display
  };

  // Render the appropriate question based on the current step
  const renderQuestion = () => {
    switch (step) {
      case 0:
        return (
          <>
            <p>TREBA TI POMOĆ?</p>
            <button onClick={handleExpandChatbox}>DA</button>
            <button onClick={() => handleAnswer("help", "no")}>NE</button>
          </>
        );

      case 1:
        if (answers.help === "yes") {
          return (
            <>
              <p>TU SAM!</p>
              <button onClick={() => handleAnswer("gender", "male")}>Muško</button>
              <button onClick={() => handleAnswer("gender", "female")}>Žensko</button>
            </>
          );
        }

      case 2:
        return (
          <>
            <p>UZRAST DETETA</p>
            <button onClick={() => handleAnswer("age", "0-3")}>0-3 godine</button>
            <button onClick={() => handleAnswer("age", "4-7")}>4-7 godina</button>
            <button onClick={() => handleAnswer("age", "8+")}>8+ godina</button>
          </>
        );

      case 3:
        return (
          <>
            <p>KUPUJEŠ ZA POKLON ILI SVOJE DETE?</p>
            <button onClick={() => handleAnswer("purchaseFor", "gift")}>Poklon</button>
            <button onClick={() => handleAnswer("purchaseFor", "own")}>Svoje dete</button>
          </>
        );

      case 4:
        return (
          <>
            <p>DA LI ŽELIŠ IGRAČKU ILI GARDEROBU?</p>
            <button onClick={() => handleAnswer("type", "toy")}>Igračka</button>
            <button onClick={() => handleAnswer("type", "clothing")}>Garderoba</button>
          </>
        );

      case 5:
        return (
          <>
            <p>POKLON DO 2000 DIN ILI 5000 DIN?</p>
            <button onClick={() => handleAnswer("price", "2000")}>2000 DIN</button>
            <button onClick={() => handleAnswer("price", "5000")}>5000 DIN</button>
          </>
        );

      case 6:
        // After the user completes the answers, generate the catalog URL
        generateCatalogUrl();
        return <p>Thank you! Here is your customized catalog URL: <a href={catalogUrl} target="_blank" rel="noopener noreferrer">{catalogUrl}</a></p>;

      default:
        return <p>Thank you for answering!</p>;
    }
  };

  // Function to expand the chatbox with animation
  const handleExpandChatbox = () => {
    setExpanded(true);
    setStep(1); // Start the conversation when user clicks "DA"
  };

  return (
    <div className="chatbot-container">
      <div className={`chatbot-box ${expanded ? 'expanded' : ''}`}>
        {/* First prompt and buttons */}
        {step === 0 && (
          <>
            <p>TREBA TI POMOĆ?</p>
            <button onClick={handleExpandChatbox}>DA</button>
            <button onClick={() => handleAnswer("help", "no")}>NE</button>
          </>
        )}

        {/* Render the rest of the questions */}
        {renderQuestion()}
      </div>
    </div>
  );
}

export const layout = {
  areaId: "content",
  sortOrder: 11,
};
