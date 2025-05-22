import React, { useState, useEffect } from "react";
import Lottie from 'lottie-react';
import mascotAnimation from "./mascot.json";
import "./Mascot.scss";

export default function Mascot() {
    const [step, setStep] = useState(0);
    const [category, setCategory] = useState("");
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

    const handleCategorySelect = (selectedCategory) => {
        setCategory(selectedCategory);
        setStep(3); // Next step is price selection
    };

    const handlePriceSelect = (maxPrice) => {
        let url = `https://jeftinko.rs/${category}`;
        if (maxPrice !== null) {
            url += `?max_price=${maxPrice}`;
        }
        window.location.replace(url);
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
                            <button onClick={handlePresentType}>Poklon</button>
                            <button onClick={handlePresentType}>Za svoje dete</button>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="question">
                            <p>Da li želiš igračku ili odeću?</p>
                            <button onClick={() => handleCategorySelect("toys")}>Igračka</button>
                            <button onClick={() => handleCategorySelect("clothing")}>Odeća</button>
                        </div>
                    )}

                    {step === 3 && category === "toys" && (
                        <div className="question">
                            <p>Do kog iznosa?</p>
                            <button onClick={() => handlePriceSelect(2000)}>Do 2.000 din</button>
                            <button onClick={() => handlePriceSelect(5500)}>Do 5.500 din</button>
                            <button onClick={() => handlePriceSelect(null)}>Pokaži sve</button>
                        </div>
                    )}

                    {step === 3 && category === "clothing" && (
                        <div className="question">
                            <p>Do kog iznosa?</p>
                            <button onClick={() => handlePriceSelect(1500)}>Do 1.500 din</button>
                            <button onClick={() => handlePriceSelect(3500)}>Do 3.500 din</button>
                            <button onClick={() => handlePriceSelect(null)}>Pokaži sve</button>
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
};
