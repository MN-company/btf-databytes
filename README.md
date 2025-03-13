# BringTheFood Dashboard 

Questo repository contiene il codice sorgente di un sito web interattivo per BTF, che integra dashboard dinamiche, filtri personalizzabili e una chat bot. Il progetto è stato realizzato in HTML5, CSS3 e JavaScript, utilizzando Chart.js per la visualizzazione dei dati, jQuery e Select2 per una migliore gestione dei form, e una logica di backend (ad es. API OpenAI) per la chat bot.

## Caratteristiche
- Dashboard Interattiva:
- Grafico a Ciambella: Visualizza la ripartizione per categorie (Primi, Secondi, Contorni, Insalata, Salumi, Pane, Varie) basata sui dati mensili della mensa selezionata.
- Grafico a Linee: Mostra l’andamento mensile (kg raccolti) per la mensa scelta, aggregando i dati delle varie categorie.
- I grafici si aggiornano dinamicamente in base ai filtri selezionati (mensa e intervallo di date).
- Filtri Personalizzabili:
- Selezione di Regione, Zona e Nodo (attualmente visualizzati ma non attivi nella logica, per eventuali estensioni).
- Selezione della Mensa (con possibilità di scegliere tra più opzioni) e un intervallo di date unificato.
- Bottone “Applica filtri” che aggiorna i grafici e scorre la pagina alla sezione dei grafici in modo fluido.
- Chat Bot Integrata:
- Interfaccia chat per interagire con un bot (collegato a un backend API, es. OpenAI).
- Funzionalità di invio messaggi e risposta dinamica.
- Mappa Interattiva e Statistiche:
- Una sezione con una mappa cliccabile e riquadri informativi (es. CO2 non sprecata, Distanza percorsa, Prodotti alimentari, Acqua).
- Design Responsive:
- Layout che si adatta a dispositivi desktop e mobili.

## Tecnologie Utilizzate
- HTML5, CSS3, JavaScript
- Chart.js per la visualizzazione dei grafici.
- jQuery e Select2 per il miglioramento dei form (multi-select).
- API OpenAI per la chat bot.

### Struttura del Progetto
- index.html
- confronto.html
- attivita.html
- style.css
- main.js

# Installazione e Utilizzo

1. Clona il repository:

```git clone https://github.com/MN-company/btf-databytes.git```

2. Aggiorna il file openai.php con la tua chiave API
3. Lanciare il file index.html
