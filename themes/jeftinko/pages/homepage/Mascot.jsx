import React, { useState, useEffect } from "react";
import Lottie from 'lottie-react';
import mascotAnimation from "./mascot.json";
import "./Mascot.scss";

export default function Mascot() {
    const [step, setStep] = useState(0);
    const [category, setCategory] = useState("");
    const [gender, setGender] = useState("");
    const [age, setAge] = useState("");
    const [isVisible, setIsVisible] = useState(false);

    const handleHelpResponse = (response) => {
        if (response === "no") {
            setIsVisible(false); // Hide mascot when the answer is "No"
        } else {
            setStep(1); // Continue to the next step if the answer is "Yes"
        }
    };

    const handleGenderSelect = (selectedGender) => {
        setGender(selectedGender);
        setStep(2); // Proceed to next step
    };

    const handleAgeSelect = (selectedAge) => {
        setAge(selectedAge);
        setStep(3); // Proceed to next step
    };

    const handleCategorySelect = (selectedCategory) => {
        setCategory(selectedCategory);
        setStep(5); // Proceed to price selection
    };

    const handlePriceSelect = (selectedPrice) => {
        window.location.replace(
            `https://jeftinko.rs/formal-wear?gender%5Boperation%5D=in&gender%5Bvalue%5D=${gender}&age-group%5Boperation%5D=in&age-group%5Bvalue%5D=${age}&max_price=${selectedPrice}`
        );
    };

    useEffect(() => {
        // Check if mascot has been seen in this session
        const mascotSeen = sessionStorage.getItem('mascotSeen');
        if (!mascotSeen) {
            setIsVisible(true);
            sessionStorage.setItem('mascotSeen', 'true');
        }
    }, []);

    if (!isVisible) return null;

    return (
        <div className="page-container">
            <div className="mascot-container">
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
                            <p>Tu sam!</p>
                            <p>Pol deteta?</p>
                            <button onClick={() => handleGenderSelect("male")}>Muško</button>
                            <button onClick={() => handleGenderSelect("8")}>Žensko</button>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="question">
                            <p>Koji je uzrast deteta?</p>
                            <button onClick={() => handleAgeSelect("46")}>Beba</button>
                            <button onClick={() => handleAgeSelect("child")}>Dete</button>
                            <button onClick={() => handleAgeSelect("teen")}>Tinejdžer</button>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="question">
                            <p>Kupuješ za poklon ili za svoje dete?</p>
                            <button onClick={() => setStep(4)}>Poklon</button>
                            <button onClick={() => setStep(4)}>Moje dete</button>
                        </div>
                    )}

                    {step === 4 && (
                        <div className="question">
                            <p>Da li želiš igračku ili garderobu?</p>
                            <button onClick={() => handleCategorySelect("toys")}>Igračka</button>
                            <button onClick={() => handleCategorySelect("formal-wear")}>Garderoba</button>
                        </div>
                    )}

                    {step === 5 && (
                        <div className="question">
                            <p>Do 3000 din ili 5000 din?</p>
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
