document.addEventListener("DOMContentLoaded", function () {
    let trentinoArea = document.querySelector("area[alt='Trentino']");
  
    if (trentinoArea) {
      trentinoArea.addEventListener("click", function (event) {
        event.preventDefault(); // Previene problemi con alcuni browser
        window.location.href = "trentino.html"; // Cambia con la pagina di destinazione
      });
    } else {
      console.error("Area Trentino non trovata nella mappa!");
    }
});

document.addEventListener('DOMContentLoaded', () => {
  const sideRoundBtn = document.getElementById('sideRoundBtn');
  const chatSidebar = document.getElementById('chatSidebar');
  const closeChatBtn = document.getElementById('closeChatBtn');

  // Al click sul pulsante rotondo, apri la chat
  sideRoundBtn.addEventListener('click', () => {
    chatSidebar.classList.add('open');
  });

  // Al click sul tasto di chiusura, nascondi la chat
  closeChatBtn.addEventListener('click', () => {
    chatSidebar.classList.remove('open');
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const chatSendBtn = document.getElementById('chatSendBtn');
  const chatInput = document.getElementById('chatInput');
  const chatMessages = document.getElementById('chatMessages');

  chatSendBtn.addEventListener('click', () => {
    const message = chatInput.value.trim();
    if (message === "") return;

    // Aggiungi il messaggio dell'utente alla chat
    const userMessageDiv = document.createElement('div');
    userMessageDiv.classList.add('message', 'user-message');
    userMessageDiv.innerHTML = `<p>${message}</p>`;
    chatMessages.appendChild(userMessageDiv);

    // Pulisci l'input
    chatInput.value = '';
    chatMessages.scrollTop = chatMessages.scrollHeight;

    // Invia la richiesta al backend (assicurati che 'chatbot.php' sia il percorso corretto)
    fetch('openai.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: message })
    })
    .then(response => response.json())
    .then(data => {
      // Estrai la risposta del bot
      let botResponse = "";
      if (data && data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content) {
        botResponse = data.choices[0].message.content;
      } else if (data.error) {
        botResponse = "Errore: " + data.error;
      } else {
        botResponse = "Non ho ricevuto una risposta valida, riprova.";
      }

      // Aggiungi la risposta del bot alla chat
      const botMessageDiv = document.createElement('div');
      botMessageDiv.classList.add('message', 'bot-message');
      botMessageDiv.innerHTML = `<p>${botResponse}</p>`;
      chatMessages.appendChild(botMessageDiv);
      chatMessages.scrollTop = chatMessages.scrollHeight;
    })
    .catch(err => {
      console.error(err);
      const errorDiv = document.createElement('div');
      errorDiv.classList.add('message', 'bot-message');
      errorDiv.innerHTML = `<p>Si è verificato un errore: ${err.message}</p>`;
      chatMessages.appendChild(errorDiv);
      chatMessages.scrollTop = chatMessages.scrollHeight;
    });
  });
});

document.addEventListener('DOMContentLoaded', () => {
  let myChart = null; // Nessun grafico creato inizialmente

  // Funzione per generare le etichette dei mesi dal range di date
  function generateMonthLabels(fromDate, toDate) {
    const labels = [];
    let current = new Date(fromDate);
    const end = new Date(toDate);
    while (current <= end) {
      // Formatta in "Mese Anno" (es. "Marzo 2025")
      const options = { month: 'long', year: 'numeric' };
      labels.push(current.toLocaleDateString('it-IT', options));
      current.setMonth(current.getMonth() + 1);
    }
    return labels;
  }

  // Funzione per aggiornare o creare il grafico
  const updateChart = () => {
    // Recupera i valori dei filtri
    const region = document.getElementById('regionSelect').value;
    const zone = document.getElementById('zoneSelect').value;
    const node = document.getElementById('nodeSelect').value;
    const fromDate = document.getElementById('timeframeStart').value;
    const toDate = document.getElementById('timeframeEnd').value;
    const dato = document.getElementById('datiGrafico').value;

    // Genera etichette mensili in base al range, oppure usa etichette di default
    let monthLabels = [];
    if (fromDate && toDate) {
      monthLabels = generateMonthLabels(fromDate, toDate);
    } else {
      monthLabels = ['Gennaio', 'Febbraio', 'Marzo'];
    }

    // Genera dati fittizi in base al tipo di dato (numero di dati = numero di mesi)
    let newData = [];
    if (dato === 'kili') {
      newData = monthLabels.map(() => Math.floor(Math.random() * 50) + 10);
    } else if (dato === 'portate') {
      newData = monthLabels.map(() => Math.floor(Math.random() * 100) + 20);
    } else if (dato === 'punti') {
      newData = monthLabels.map(() => Math.floor(Math.random() * 30) + 5);
    } else {
      newData = monthLabels.map(() => Math.floor(Math.random() * 40) + 10);
    }

    // Crea il titolo dinamico in base ai filtri
    const titleText = `Dati ${dato} ${region ? "in " + region : ""}${zone ? ", Zona: " + zone : ""}${node ? ", Nodo: " + node : ""}`;
    document.getElementById('chartTitle').innerText = titleText;

    // Se il grafico esiste, aggiorna i dati, altrimenti crealo
    if (myChart) {
      myChart.data.labels = monthLabels;
      myChart.data.datasets[0].data = newData;
      myChart.data.datasets[0].label = titleText;
      myChart.update();
    } else {
      const ctx = document.getElementById('myChart').getContext('2d');
      myChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: monthLabels,
          datasets: [{
            label: titleText,
            data: newData,
            backgroundColor: '#f4a108'
          }]
        },
        options: {
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: titleText
            }
          },
          scales: {
            y: { beginAtZero: true }
          }
        }
      });
    }

    document.addEventListener('DOMContentLoaded', function() {
      const applyFiltersBtn = document.getElementById('applyFiltersBtn');
      applyFiltersBtn.addEventListener('click', function() {
        document.getElementById('ancora').scrollIntoView();
      });
    });
  };
});


$(document).ready(function() {
  $('#datiGrafico').select2({
    placeholder:"Seleziona uno o più opzioni",
    width:'resolve',
    closeOnSelect:false,
    templateSelection: function (data, container) {
      var selectedData = $('#datiGrafico').select2('data');
      if(selectedData.length > 1) {
        return selectedData.length + " opzioni selezionate";
      }
      return data.text;
    }
  });
});

document.addEventListener('DOMContentLoaded', () => {
  // Seleziona tutti gli elementi che aprono un modale
  const triggers = document.querySelectorAll('.info-trigger');
  
  triggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      const modalId = trigger.getAttribute('data-modal');
      const modal = document.getElementById(modalId);
      if (modal) {
        modal.style.display = 'flex';  // Mostra l'overlay
      }
    });
  });

  // Chiudi il modale se si clicca su X o sullo sfondo
  const overlays = document.querySelectorAll('.modal-overlay');
  overlays.forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target.classList.contains('modal-overlay') ||
          e.target.classList.contains('modal-close')) {
        overlay.style.display = 'none';
      }
    });
  });
});

