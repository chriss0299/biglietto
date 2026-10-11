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
