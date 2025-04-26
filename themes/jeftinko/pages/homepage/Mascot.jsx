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
            setIsVisible(false);
        } else {
            setStep(1);
        }
    };

    const handlePresentType = () => {
        setStep(2);
    };

    const handleGenderSelect = (selectedGender) => {
        setGender(selectedGender);
        setStep(3);
    };

    const handleAgeSelect = (selectedAge) => {
        setAge(selectedAge);
        setStep(4);
    };

    const handleCategorySelect = (selectedCategory) => {
        // Directly navigate to the filtered page without price selection
        window.location.replace(
            `https://jeftinko.rs/${selectedCategory}?gender%5Boperation%5D=in&gender%5Bvalue%5D=${gender}&age-group%5Boperation%5D=in&age-group%5Bvalue%5D=${age}`
        );
    };

    useEffect(() => {
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
                            <p>Treba ti pomoć pri kupovini?</p>
                            <button onClick={() => handleHelpResponse("yes")}>Da</button>
                            <button onClick={() => handleHelpResponse("no")}>Ne</button>
                        </div>
                    )}

                    {step === 1 && (
                        <div className="question">
                            <p>Tu sam!</p>
                            <p>Kupuješ na poklon ili za svoje dete?</p>
                            <button onClick={() => handlePresentType()}>Poklon</button>
                            <button onClick={() => handlePresentType()}>Za svoje dete</button>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="question">
                            <p>Pol deteta?</p>
                            <button onClick={() => handleGenderSelect("7")}>Muško</button>
                            <button onClick={() => handleGenderSelect("8")}>Žensko</button>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="question">
                            <p>Koji je uzrast?</p>
                            <button onClick={() => handleAgeSelect("46")}>Beba</button>
                            <button onClick={() => handleAgeSelect("child")}>Dete</button>
                        </div>
                    )}

                    {step === 4 && (
                        <div className="question">
                            <p>Da li želiš igračku ili garderobu?</p>
                            <button onClick={() => handleCategorySelect("toys")}>Igračka</button>
                            <button onClick={() => handleCategorySelect("formal-wear")}>Garderoba</button>
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
