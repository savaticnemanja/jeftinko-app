import React, { useState } from "react";
import Lottie from 'lottie-react';
import mascotAnimation from "./mascot.json";
import "./Mascot.scss";

export default function Mascot() {
    const [step, setStep] = useState(0);
    const [category, setCategory] = useState("");
    const [price, setPrice] = useState("");
    const [isVisible, setIsVisible] = useState(true);

    const handleHelpResponse = (response) => {
        if (response === "no") {
            setIsVisible(false);
        } else {
            setStep(1);
        }
    };

    const handleCategorySelect = (selectedCategory) => {
        setCategory(selectedCategory);
        setStep(2);
    };

    const handlePriceSelect = (selectedPrice) => {
        setPrice(selectedPrice);
        window.location.replace(
            `https://jeftinko.rs/${category}?&max_price=${selectedPrice}`
        );
    };

    if (!isVisible) return null;

    return (
        <div className="page-container">
            <div className="mascot-container">
                {/* <img src="./mascot.svg" alt="Mascot" className="mascot" /> */}
                <Lottie
                    animationData={mascotAnimation}
                    loop={false}
                    autoplay={true}
                    className="mascot"
                />
                <div className="questionnaire">
                    {step === 0 && (
                        <div className="question">
                            <p>Treba ti pomoć?</p>
                            <button onClick={() => handleHelpResponse("yes")}>Da</button>
                            <button onClick={() => handleHelpResponse("no")}>Ne</button>
                        </div>
                    )}
                    {step === 1 && (
                        <div className="question">
                            <p>Tu sam! Da li ti je potrebna igračka ili garderoba?</p>
                            <button onClick={() => handleCategorySelect("toys")}>Igračka</button>
                            <button onClick={() => handleCategorySelect("formal-wear")}>Garderoba</button>
                        </div>
                    )}
                    {step === 2 && (
                        <div className="question">
                            <p>DO 3000 DIN ILI 5000 DIN?</p>
                            <button onClick={() => handlePriceSelect("3000")}>3000 din</button>
                            <button onClick={() => handlePriceSelect("5000")}>5000 din</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export const layout = {
    areaId: "content",
    sortOrder: 1,
}