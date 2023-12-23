```cpp
#include <Wire.h>
#include "Adafruit_Sensor.h"
#include "Adafruit_TSL2591.h"
#include "Adafruit_SHT31.h"

// Define the pins for the sensors
#define SOIL_MOISTURE_SENSOR_PIN A0
#define TSL2591_INT 4
#define SHT31_ADDR 0x44

// Create sensor objects
Adafruit_TSL2591 tsl = Adafruit_TSL2591(2591);
Adafruit_SHT31 sht31 = Adafruit_SHT31();

// Variables to store sensor readings
int soilMoistureLevel = 0;
float ambientTemperature = 0.0;
uint16_t lightLevel = 0;

void setup() {
  // Initialize serial communication
  Serial.begin(9600);

  // Initialize the soil moisture sensor
  pinMode(SOIL_MOISTURE_SENSOR_PIN, INPUT);

  // Initialize the light sensor
  if (tsl.begin()) {
    tsl.setGain(TSL2591_GAIN_MED);
    tsl.setTiming(TSL2591_INTEGRATIONTIME_300MS);
  } else {
    Serial.println("Could not start light sensor");
  }

  // Initialize the temperature sensor
  if (!sht31.begin(SHT31_ADDR)) {
    Serial.println("Could not start temperature sensor");
  }
}

void loop() {
  // Read the soil moisture level
  soilMoistureLevel = analogRead(SOIL_MOISTURE_SENSOR_PIN);

  // Read the ambient temperature
  ambientTemperature = sht31.readTemperature();

  // Read the light level
  sensors_event_t event;
  tsl.getEvent(&event);
  if (event.light)
    lightLevel = event.light;
  else
    lightLevel = 0;

  // Print the sensor readings
  Serial.print("Soil Moisture Level: "); Serial.println(soilMoistureLevel);
  Serial.print("Ambient Temperature: "); Serial.println(ambientTemperature);
  Serial.print("Light Level: "); Serial.println(lightLevel);

  // Wait for a second before the next reading
  delay(1000);
}
```
