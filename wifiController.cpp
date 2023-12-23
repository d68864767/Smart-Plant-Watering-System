```cpp
#include <ESP8266WiFi.h>

// Define the Wi-Fi credentials
const char* ssid = "your_SSID";
const char* password = "your_PASSWORD";

// Define the server address and port
const char* server = "your_SERVER_ADDRESS";
const int port = your_SERVER_PORT;

// Create a WiFi client object
WiFiClient client;

void setup() {
  // Initialize serial communication
  Serial.begin(9600);

  // Connect to Wi-Fi
  Serial.print("Connecting to ");
  Serial.println(ssid);
  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println("");
  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());
}

void loop() {
  // Check if the client is connected to the server
  if (!client.connected()) {
    Serial.println("Disconnected from server. Attempting to reconnect...");
    if (!client.connect(server, port)) {
      Serial.println("Failed to reconnect to server");
      return;
    }
    Serial.println("Reconnected to server");
  }

  // Read the sensor data from the sensor controller
  int soilMoistureLevel = analogRead(SOIL_MOISTURE_SENSOR_PIN);
  float ambientTemperature = sht31.readTemperature();
  uint16_t lightLevel = event.light;

  // Send the sensor data to the server
  client.print("Soil Moisture Level: "); client.println(soilMoistureLevel);
  client.print("Ambient Temperature: "); client.println(ambientTemperature);
  client.print("Light Level: "); client.println(lightLevel);

  // Wait for a second before the next reading
  delay(1000);
}
```

