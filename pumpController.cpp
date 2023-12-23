```cpp
#include <Wire.h>

// Define the pin for the water pump
#define WATER_PUMP_PIN 5

// Define the threshold for soil moisture level
#define SOIL_MOISTURE_THRESHOLD 300

// Variables to store the state of the pump
bool isPumpOn = false;

void setup() {
  // Initialize serial communication
  Serial.begin(9600);

  // Initialize the water pump
  pinMode(WATER_PUMP_PIN, OUTPUT);
  digitalWrite(WATER_PUMP_PIN, LOW);
}

void loop() {
  // Read the soil moisture level from the sensor controller
  int soilMoistureLevel = analogRead(SOIL_MOISTURE_SENSOR_PIN);

  // Check if the soil moisture level is below the threshold
  if (soilMoistureLevel < SOIL_MOISTURE_THRESHOLD) {
    // If the pump is not already on, turn it on
    if (!isPumpOn) {
      digitalWrite(WATER_PUMP_PIN, HIGH);
      isPumpOn = true;
      Serial.println("Water pump turned on");
    }
  } else {
    // If the pump is on, turn it off
    if (isPumpOn) {
      digitalWrite(WATER_PUMP_PIN, LOW);
      isPumpOn = false;
      Serial.println("Water pump turned off");
    }
  }

  // Wait for a second before the next check
  delay(1000);
}
```
