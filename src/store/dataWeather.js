// Định nghĩa class cho đối tượng "Currently"
class Currently {
  constructor(data) {
    this.time = data.time;
    this.summary = data.summary;
    this.icon = data.icon;
    this.precipIntensity = data.precipIntensity;
    this.precipProbability = data.precipProbability;
    this.precipType = data.precipType;
    this.temperature = data.temperature;
    this.apparentTemperature = data.apparentTemperature;
    this.dewPoint = data.dewPoint;
    this.humidity = data.humidity;
    this.pressure = data.pressure;
    this.windSpeed = data.windSpeed;
    this.windGust = data.windGust;
    this.windBearing = data.windBearing;
    this.cloudCover = data.cloudCover;
    this.uvIndex = data.uvIndex;
    this.visibility = data.visibility;
    this.ozone = data.ozone;
  }
}

// Định nghĩa class cho đối tượng "Hourly"
class Hourly {
  constructor(data) {
    this.data = data.map((item) => new Currently(item));
  }
}

// Định nghĩa class cho đối tượng "Daily"
class Daily {
  constructor(data) {
    this.data = data.map((item) => new DailyData(item));
  }
}

// Định nghĩa class cho đối tượng "DailyData" trong "Daily"
class DailyData {
  constructor(data) {
    this.time = data.time;
    this.summary = data.summary;
    this.icon = data.icon;
    this.sunriseTime = data.sunriseTime;
    this.sunsetTime = data.sunsetTime;
    this.precipIntensity = data.precipIntensity;
    this.precipProbability = data.precipProbability;
    this.precipType = data.precipType;
    this.temperatureMin = data.temperatureMin;
    this.temperatureMax = data.temperatureMax;
    this.apparentTemperatureMin = data.apparentTemperatureMin;
    this.apparentTemperatureMax = data.apparentTemperatureMax;
    this.dewPoint = data.dewPoint;
    this.humidity = data.humidity;
    this.pressure = data.pressure;
    this.windSpeed = data.windSpeed;
    this.windGust = data.windGust;
    this.windBearing = data.windBearing;
    this.moonPhase = data.moonPhase;
    this.cloudCover = data.cloudCover;
    this.uvIndex = data.uvIndex;
    this.visibility = data.visibility;
    this.ozone = data.ozone;
  }
}

// Định nghĩa class chính để lưu giữ các giá trị của JSON
export class WeatherData {
  constructor(data) {
    this.latitude = data.latitude;
    this.longitude = data.longitude;
    this.timezone = data.timezone;
    this.offset = data.offset;
    this.currently = new Currently(data.currently);
    this.hourly = new Hourly(data.hourly.data);
    this.daily = new Daily(data.daily.data);
  }
}
