import React from "react";

export default function PrivacyPolicy() {
    return (
        <>
            <h1>Pravila o privatnosti</h1>
            <h4>Izjava o zaštiti privatnosti</h4>
            <p>U ime internet online prodavnice <strong>Jeftinko</strong> obavezujemo se da ćemo čuvati privatnost svih naših kupaca.</p>
            <p>Prikupljamo samo neophodne, osnovne podatke o kupcima/korisnicima i podatke neophodne za poslovanje i informisanje korisnika u skladu sa dobrim poslovnim običajima i u cilju pružanja kvalitetne usluge.</p>
            <p>Sve informacije se čuvaju na sigurnom i u skladu sa internom polisom o bezbednosti mogu biti upotrebljeni za:</p>
            <ul>
                <li>Proveru i isporuku narudžbina</li>
                <li>Pružanje podrške kupcu</li>
                <li>Pomoći pri sprečavanju prevara (provera kreditne kartice)</li>
                <li>Administraciju nagradnih igara</li>
                <li>Vođenje vaše istorije kupovine</li>
            </ul>
            <p>Prilikom kreiranja naloga na <a href="https://www.jeftinko.rs">www.jeftinko.rs</a> ili kreiranja narudžbina saglasni ste sa gore navedenim stavkama o upotrebi podataka.</p>
            <p>Pored navedenih prikupljamo, analiziramo i obrađujemo podatke o proizvodima koje naši posetioci traže i kupuju, kao i o stranicama koje posećuju. Te podatke koristimo da bismo poboljšali ponudu i izgled naših stranica, i omogućili kupcima jednostavnije korišćenje, sigurniju i udobniju kupovinu.</p>
            <p><strong>Obavezujemo se da prikupljene podatke ne koristimo ni u koje druge svrhe.</strong></p>
        </>
    );
}

export const layout = {
    areaId: "content",
    sortOrder: 1,
};
