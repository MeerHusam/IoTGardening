#define AOUT_PIN 39 // ESP32 pin GPIO36 (ADC0) that connects to AOUT pin of moisture sensor
#define THRESHOLD 3200 // CHANGE YOUR THRESHOLD HERE

#define POWER_PIN  14 // ESP32 pin GPIO17 connected to sensor's VCC pin
#define SIGNAL_PIN 36 // ESP32 pin GPIO36 (ADC0) connected to sensor's signal pin

#include <DHT.h>
#define DHT_SENSOR_PIN  27 // ESP32 pin GPIO21 connected to DHT11 sensor
#define DHT_SENSOR_TYPE DHT11

DHT dht_sensor(DHT_SENSOR_PIN, DHT_SENSOR_TYPE);

const int LDRPin = 25;  // Define the pin connected to the LDR

void setup() {
  Serial.begin(115200);
  pinMode(POWER_PIN, OUTPUT);   // configure pin as an OUTPUT
  digitalWrite(POWER_PIN, LOW); // turn the sensor OFF
  dht_sensor.begin(); // initialize the DHT sensor
}

void loop() {
  int value = analogRead(AOUT_PIN); // read the analog value from soil moisture sensor

  if (value < THRESHOLD)
    Serial.print("The soil is DRY (");
  else
    Serial.print("The soil is WET (");

  Serial.print(value);
  Serial.println(")");

  // Water sensor code
  digitalWrite(POWER_PIN, HIGH);  // turn the sensor ON
  delay(10);                      // wait 10 milliseconds
  value = analogRead(SIGNAL_PIN); // read the analog value from water sensor
  digitalWrite(POWER_PIN, LOW);   // turn the sensor OFF

  Serial.print("The water sensor value: ");
  Serial.println(value);

  // read humidity
  float humi  = dht_sensor.readHumidity();
  // read temperature in Celsius
  float tempC = dht_sensor.readTemperature();
  // read temperature in Fahrenheit
  float tempF = dht_sensor.readTemperature(true);

  // check whether the reading is successful or not
  if (isnan(tempC) || isnan(tempF) || isnan(humi)) {
    Serial.println("Failed to read from DHT sensor!");
  } else {
    Serial.print("Humidity: ");
    Serial.print(humi);
    Serial.print("%");

    Serial.print("  |  ");

    Serial.print("Temperature: ");
    Serial.print(tempC);
    Serial.print("°C  ~  ");
    Serial.print(tempF);
    Serial.println("°F");
  }

  // LDR sensor code
  int LDRValue = analogRead(LDRPin);  // Read the LDR value
  float voltage = LDRValue / 4095.0 * 3.3;  // Convert the reading to voltage

  Serial.print("LDR Value: ");
  Serial.print(LDRValue);  // Print the LDR value
  Serial.print(" - Voltage: ");
  Serial.print(voltage);  // Print the calculated voltage
  Serial.println("V");
  Serial.println("---------------------------------------------------------");

  delay(10000); // wait 2 seconds between readings
}
