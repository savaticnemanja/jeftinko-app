import React from 'react';

export default function ShippingAndReturns() {
  return (
<>
    <h1>Isporuka i povraćaj</h1>
    <p>Nakon potvrđene porudžbine stići će Vam mejl potvrde da je Vaša porudžbina spremna za isporuku. Od tog trenutka rok isporuke je 3 radna dana.</p>
    <p>U slučaju reklamacije ili bilo kakve primedbe obratite nam se na mejl adresu: <a href="mailto:reklamacije@jefitnko.rs">reklamacije@jefitnko.rs</a> i žalba ili reklamacija će u najkraćem roku biti obrađena.</p>
    <p>U slučaju zamene artikala troškove vraćanja robe u oba pravca snosi kupac, osim u slučajevima kada kupac dobije neispravan ili pogrešan artikal.</p>
    <p>Kuriri Express službi (eksterna firma koja vrši dostavu robe za nas), pošiljke donose na adresu za isporuku u periodu od 8-19h.</p>
    <p>Molimo Vas da u tom periodu obezbedite da na adresi bude osoba koja može preuzeti pošiljku. Prilikom preuzimanja pošiljke potrebno je da vizuelno pregledate paket da slučajno ne postoje neka vidna oštećenja.</p>
    <p>Ukoliko primetite da je transportna kutija značajno oštećena i posumnjate da je proizvod možda oštećen, odbijte prijem pošiljke i odmah nas obavestite putem mejla <a href="mailto:reklamacije@minibambini.rs">reklamacije@minibambini.rs</a>. Ukoliko je pošiljka naizgled bez oštećenja slobodno preuzmite pošiljku i potpišite kuriru adresnicu.</p>
    <p>Kurir pokušava svaku pošiljku da uruči u dva navrata. Uobičajena praksa je da ukoliko Vas kurir ne pronađe na adresi, da Vas pozove na telefon koji ste ostavili prilikom kreiranja narudžbenice i ugovori novi termin isporuke. Ukoliko Vas i tada ne pronađe na adresi, pošiljka će se vratiti nama. Po prijemu pošiljke, kontaktiraćemo Vas kako bi ustanovili razlog neuručenja i dogovorili se o ponovnom slanju.</p>
    <p>Poštarina je informativnog karaktera i važi po cenovniku kurirske službe.</p>
</>

  );
}

export const layout = {
  areaId: 'content',
  sortOrder: 10
};