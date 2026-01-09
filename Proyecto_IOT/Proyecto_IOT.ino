#include <WiFi.h>            // Librería para ESP32 (No usar ESP8266WiFi)
#include <HTTPClient.h>      // Cliente HTTP para ESP32
#include <ArduinoJson.h>     // Asegúrate de tener instalada la versión 6 o 7

// --- 1. CONFIGURACIÓN DE RED ---
const char* ssid     = "Red_Prueba";     // TU NOMBRE DE WIFI
const char* password = "laboratorio";    // TU CONTRASEÑA

// --- 2. CONFIGURACIÓN DEL SERVIDOR ---
// IMPORTANTE: Cambia la IP por la de tu PC (usa 'ipconfig' en cmd para verla)
// No uses localhost aquí, el ESP32 no sabe qué es localhost.
const char* serverUrl = "http://10.221.72.194:8080/lecturas";

// --- 3. PINES DEL HARDWARE ---
const int PIN_PIR = 13;   // Sensor Movimiento (Digital)
const int PIN_LDR = 34;   // Sensor Luz (Analógico - Solo entrada)
const int PIN_RELE = 26;  // Actuador Foco (Salida)

// Umbral de luz: Ajusta este valor según tu LDR (0 a 4095)
// < 2000 suele ser oscuro, > 2000 luz, pero depende de tu resistencia.
const int UMBRAL_OSCURIDAD = 2000; 

void setup() {
  Serial.begin(115200);

  // Configurar Pines
  pinMode(PIN_PIR, INPUT);
  pinMode(PIN_RELE, OUTPUT);
  // El PIN_LDR no necesita pinMode en ESP32, es analógico puro.

  // Iniciar WiFi
  WiFi.begin(ssid, password);
  Serial.print("Conectando a WiFi");
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("\n>>> WiFi Conectado");
  Serial.print(">>> IP del ESP32: ");
  Serial.println(WiFi.localIP());
}

void loop() {
  // Verificar conexión WiFi antes de intentar enviar
  if (WiFi.status() == WL_CONNECTED) {
    
    // A. LEER SENSORES
    int lecturaLuz = analogRead(PIN_LDR);
    int lecturaPIR = digitalRead(PIN_PIR); // 1 = Movimiento, 0 = Quieto

    // B. LÓGICA DE CONTROL (PROYECTO)
    // Encender foco si hay movimiento Y hay poca luz
    bool estadoFoco = false;
    
    if (lecturaPIR == HIGH && lecturaLuz < UMBRAL_OSCURIDAD) {
       digitalWrite(PIN_RELE, HIGH); // Encender Relé
       estadoFoco = true;
    } else {
       digitalWrite(PIN_RELE, LOW);  // Apagar Relé
       estadoFoco = false;
    }

    // C. PREPARAR JSON
    // Usamos los mismos nombres que definimos en el Backend
    JsonDocument doc;
    doc["luz"]        = lecturaLuz;
    doc["movimiento"] = lecturaPIR;
    doc["foco"]       = estadoFoco;
    
    String payload;
    serializeJson(doc, payload);

    // D. ENVIAR AL SERVIDOR (HTTP POST)
    WiFiClient client;
    HTTPClient http;

    // Iniciar conexión
    http.begin(client, serverUrl);
    http.addHeader("Content-Type", "application/json");

    Serial.print("Enviando datos a: ");
    Serial.println(serverUrl);
    
    // Enviar el POST y guardar el código de respuesta
    int httpResponseCode = http.POST(payload);

    if (httpResponseCode > 0) {
      String response = http.getString();
      Serial.print("Código HTTP: ");
      Serial.println(httpResponseCode); // 201 significa "Creado/Guardado"
      Serial.println("Respuesta del Servidor: " + response);
    } else {
      Serial.print("Error enviando POST: ");
      Serial.println(httpResponseCode);
    }

    // Cerrar conexión
    http.end();

  } else {
    Serial.println("Error: WiFi desconectado");
  }

  // Esperar 5 segundos antes de la siguiente lectura
  delay(5000);
}
