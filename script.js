// Cerca nella pagina il pulsante con classe "condividi" e lo salva in una costante
const pulsanteCondividi = document.querySelector(".condividi");
// Cerca il paragrafo dove scrivere i messaggi di conferma o di errore
const messaggioStato = document.querySelector(".stato");

// Oggetto con i dati da passare al pannello di condivisione del telefono
const datiCondivisione = {
  // Titolo: riusa quello della pagina, così resta scritto in un solo punto
  title: document.title,
  // Testo breve che accompagna il link
  text: "Biglietto da visita di Christian Colonna",
  // Indirizzo della pagina corrente: funziona su qualsiasi dominio senza modifiche
  url: window.location.href,
};

// Resta in ascolto del clic sul pulsante; async permette di usare await all'interno
pulsanteCondividi.addEventListener("click", async () => {
  // try racchiude le operazioni che possono fallire
  try {
    // Controlla se il browser supporta la Web Share API prima di usarla
    if (navigator.share) {
      // Apre il pannello di condivisione nativo e attende la scelta della persona
      await navigator.share(datiCondivisione);
    // Ramo alternativo per i browser senza Web Share API, tipico dei computer
    } else {
      // Copia l'indirizzo negli appunti e attende che l'operazione finisca
      await navigator.clipboard.writeText(datiCondivisione.url);
      // Conferma a schermo: senza messaggio il pulsante sembrerebbe non fare nulla
      messaggioStato.textContent = "Link copiato negli appunti";
    }
  // catch riceve l'errore se una delle operazioni sopra non riesce
  } catch (errore) {
    // AbortError significa che la persona ha chiuso il pannello: non è un vero errore
    if (errore.name !== "AbortError") {
      // Per tutti gli altri errori avvisa che la condivisione non è riuscita
      messaggioStato.textContent = "Condivisione non riuscita";
    }
  }
});

// Cerca il pulsante che apre il QR code
const pulsanteQr = document.querySelector(".qr");
// Cerca la finestra modale che lo contiene
const finestraQr = document.querySelector(".finestra-qr");
// Cerca il riquadro dove disegnare il codice
const contenitoreQr = document.querySelector(".codice-qr");
// Cerca il paragrafo dove scrivere l'indirizzo in chiaro
const indirizzoQr = document.querySelector(".indirizzo-qr");
// Cerca il pulsante che chiude la finestra
const pulsanteChiudi = document.querySelector(".chiudi-qr");

// Resta in ascolto del clic sul pulsante QR code
pulsanteQr.addEventListener("click", () => {
  // Disegna il codice solo la prima volta: se il riquadro è già pieno salta questo blocco
  if (contenitoreQr.childElementCount === 0) {
    // Crea un QR code: 0 sceglie da solo la grandezza, "M" è il livello medio di correzione errori
    const codice = qrcode(0, "M");
    // Inserisce nel codice l'indirizzo della pagina corrente
    codice.addData(window.location.href);
    // Calcola la griglia di quadratini
    codice.make();
    // Trasforma la griglia in un'immagine SVG e la inserisce nel riquadro
    contenitoreQr.innerHTML = codice.createSvgTag({ scalable: true, margin: 4 });
    // Scrive lo stesso indirizzo come testo sotto il codice
    indirizzoQr.textContent = window.location.href;
  }
  // Apre la finestra come modale: blocca il resto della pagina e sposta il focus al suo interno
  finestraQr.showModal();
});

// Resta in ascolto del clic sul pulsante Chiudi
pulsanteChiudi.addEventListener("click", () => {
  // Chiude la finestra e riporta il focus al pulsante che l'aveva aperta
  finestraQr.close();
});
