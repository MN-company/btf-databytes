<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");

// Inserisci la tua chiave API qui (senza spazi o caratteri extra)
$api_key = "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";

// Recupera il messaggio inviato dal frontend (JSON nel body della richiesta)
$request = json_decode(file_get_contents('php://input'), true);
$message = isset($request['message']) && !empty(trim($request['message'])) 
    ? trim($request['message']) 
    : "Ciao, dimmi qualcosa!";

// Prepara i dati da inviare all'API di OpenAI
$data = array(
    "model" => "gpt-4o-mini", // oppure "gpt-3.5-turbo" se preferisci
    "messages" => array(
         array("role" => "system", "content" => "Rispondi in modo chiaro e preciso."),
         array("role" => "user", "content" => $message)
    ),
    "temperature" => 0.7
);
$payload = json_encode($data);

// Imposta l'URL per la chiamata all'API
$url = "https://api.openai.com/v1/chat/completions";

// Inizializza cURL
$ch = curl_init($url);

// Configura le opzioni di cURL
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, array(
    "Content-Type: application/json",
    "Authorization: Bearer " . $api_key
));
curl_setopt($ch, CURLOPT_POSTFIELDS, $payload);

// Esegui la richiesta
$response = curl_exec($ch);

// Verifica eventuali errori cURL
if (curl_errno($ch)) {
    $error_msg = curl_error($ch);
    curl_close($ch);
    echo json_encode(array("error" => "cURL Error: " . $error_msg));
    exit;
}

// Recupera lo status HTTP
$http_status = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

// Se lo status HTTP non è 200, restituisci l'errore
if ($http_status !== 200) {
    echo json_encode(array(
        "error" => "HTTP Error: " . $http_status,
        "response" => json_decode($response, true)
    ));
    exit;
}

// Restituisce la risposta ottenuta dall'API di OpenAI
echo $response;
?>