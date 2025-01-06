import i18n from "../locales/i18n";
import { DateTime } from "luxon";

/* eslint-disable prettier/prettier */
/**
 * Convert nhiệt độ Celsius sang Fahrenheit
 * @param {*} celsius
 * @returns
 */
export function celsiusToFahrenheit(celsius) {
  return Math.round((celsius * 9) / 5 + 32);
}

/**
 * Convert nhiệt độ Fahrenheit sang Celsius
 * @param {*} fahrenheit
 * @returns
 */
export function fahrenheitToCelsius(fahrenheit) {
  return Math.round(((fahrenheit - 32) * 5) / 9);
}

export function fahrenheitToCelsiusNot(fahrenheit) {
  return Math.round(((fahrenheit - 32) * 5) / 9);
}

export function celsiusToFahrenheitNot(celsius) {
  return Math.round((celsius * 9) / 5 + 32);
}
/**
 * Convert mm sang inch
 * @param {*} mm
 * @returns
 */
export function mmToInch(value) {
  return Math.round(value * 0.0393701) + "in";
}

/**
 * Convert inch sang mm
 * @param {*} inch
 * @returns
 */
export function inchToMm(inch) {
  if (inch === 0) {
    return "0.00" + " " + "mm";
  }
  return Math.round(inch * 25.4) + " " + "mm";
}

/**
 * Convert mi/h sang m/s
 * @param {*} ms
 * @returns
 */
export function mphToMs(mph) {
  const result = mph * 0.44704;
  return result.toFixed(2) + " " + "m/s";
}

export function mphToMsInt(mph) {
  const result = mph * 0.44704;
  return result;
}

/**
 * Convert mi/h sang km/h
 * @param {*} ms
 * @returns
 */
export function mphToKmh(mph) {
  return mph * 1.60934;
}

/**
 * Convert mi/h sang knot
 * @param {*} ms
 * @returns
 */
export function mphToKnot(mph) {
  return mph * 0.868976;
}

/**
 * Convert sang Beaufort scale
 * @param {*} ms
 * @returns
 */
export function mphToBeaufort(mph) {
  const ms = mphToMs(mph); // Chuyển đổi mi/h sang m/s trước
  if (ms < 0.3) return 0;
  if (ms < 1.6) return 1;
  if (ms < 3.4) return 2;
  if (ms < 5.5) return 3;
  if (ms < 8.0) return 4;
  if (ms < 10.8) return 5;
  if (ms < 13.9) return 6;
  if (ms < 17.2) return 7;
  if (ms < 20.8) return 8;
  if (ms < 24.5) return 9;
  if (ms < 28.5) return 10;
  if (ms < 32.7) return 11;
  return 12;
}

/**
 * Convert sang String UV Index
 * @param {*} value
 * @returns
 */
export function getUvSummaryName(value) {
  // Kiểm tra nếu `value` không phải là số
  if (typeof value !== "number" && typeof value !== "string") {
    console.error("Giá trị không hợp lệ (không phải số hoặc chuỗi):", value);
    return "Unknown";
  }

  value = parseInt(value);

  if (isNaN(value)) {
    console.error("Giá trị không hợp lệ sau parseInt:", value);
    return "Unknown";
  }

  if (value <= 2) {
    return i18n.global.t("low");
  } else if ((2 <= value) & (value <= 5)) {
    return i18n.global.t("Moderate");
  } else if ((5 <= value) & (value <= 7)) {
    return i18n.global.t("High");
  } else if ((7 <= value) & (value <= 10)) {
    return i18n.global.t("Very_High");
  } else {
    return i18n.global.t("Extremely_high");
  }
}

export function getInformationUVIndex(value) {
  if (value <= 2) {
    return i18n.global.t("Low_UV_levels");
  } else if ((2 <= value) & (value <= 5)) {
    return i18n.global.t("There_is_a_moderate");
  } else if ((5 <= value) & (value <= 7)) {
    return i18n.global.t("UV_rays_are_highly");
  } else if ((7 <= value) & (value <= 10)) {
    return i18n.global.t("The_risk_from_UV_is_very_high");
  } else {
    return i18n.global.t("UV_rays_are_extremely_dangerous");
  }
}

export function getUvSummaryImage(value) {
  const sun_svgrepo_com_1 = require("../assets/images/svg/sun_svgrepo_com_1.svg");
  const sun_svgrepo_com_2 = require("../assets/images/svg/sun_svgrepo_com_2.svg");
  const sun_svgrepo_com_3 = require("../assets/images/svg/sun_svgrepo_com_4.svg");
  const sun_svgrepo_com_4 = require("../assets/images/svg/sun_svgrepo_com_5.svg");
  const sun_svgrepo_com_5 = require("../assets/images/svg/sun_svgrepo_com_6.svg");
  value = parseInt(value);

  if (value <= 2) {
    return sun_svgrepo_com_1;
  } else if (value <= 5) {
    return sun_svgrepo_com_2;
  } else if (value <= 7) {
    return sun_svgrepo_com_3;
  } else if (value <= 10) {
    return sun_svgrepo_com_4;
  } else {
    return sun_svgrepo_com_5;
  }
}

export function getIconHourlyForecastTheme(value) {
  const ic_clear_day_hourly = require("../assets/images/svg_v2/icon-thoitiet/sun.svg");
  const ic_cloudy_hourly = require("../assets/images/svg_v2/icon-thoitiet/cloud.svg");
  const ic_fog = require("../assets/images/svg_v2/icon-thoitiet/cloud-fog.svg");
  const ic_partly_cloudy_day_hourly = require("../assets/images/svg/theme_icon_1/ic_partly_cloudy_day_hourly.svg");
  const ic_partly_cloudy_night_hourly = require("../assets/images/svg/theme_icon_1/ic_partly_cloudy_night_hourly.svg");
  const ic_rain_hourly = require("../assets/images/svg_v2/icon-thoitiet/cloud-rain-wind.svg");
  const ic_sleet_hourly = require("../assets/images/svg/theme_icon_1/ic_sleet_hourly.svg");
  const ic_tornado_hourly = require("../assets/images/svg_v2/icon-thoitiet/tornado.svg");
  const ic_thunderstorm_hourly = require("../assets/images/svg/theme_icon_1/ic_thunderstorm_hourly.svg");
  const ic_wind_hourly = require("../assets/images/svg/theme_icon_1/ic_wind_hourly.svg");
  const ic_snow_hourly = require("../assets/images/svg_v2/icon-thoitiet/cloud-snow.svg");
  const ic_clear_night_hourly = require("../assets/images/svg/theme_icon_1/ic_clear_night_hourly.svg");
  value = value.toString();
  switch (value) {
    case "cloudy":
      return ic_cloudy_hourly;
    case "rain":
      return ic_rain_hourly;
    case "partly_cloudy_day":
      return ic_partly_cloudy_day_hourly;
    case "partly_cloudy_night":
      return ic_partly_cloudy_night_hourly;
    case "clear_day":
      return ic_clear_day_hourly;
    case "clear_night":
      return ic_clear_night_hourly;
    case "sleet":
      return ic_sleet_hourly;
    case "fog":
      return ic_fog;
    case "wind":
      return ic_wind_hourly;
    case "thunderstorm":
      return ic_thunderstorm_hourly;
    case "tornado":
      return ic_tornado_hourly;
    case "snow":
      return ic_snow_hourly;
    default:
      return ic_cloudy_hourly;
  }
}

export function convertTimestampToMonthYear(timestamp) {
  const date = new Date(timestamp * 1000); // Chuyển timestamp sang milliseconds
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const month = months[date.getMonth()]; // Lấy tháng
  const year = date.getFullYear(); // Lấy năm

  return `${month} ${year}`;
}

export function convertTimestampToDayMonth(timestamp) {
  const date = new Date(timestamp * 1000); // Chuyển timestamp từ giây sang milliseconds
  const day = date.getDate(); // Lấy ngày
  const month = date.getMonth() + 1; // Lấy tháng (0-indexed, cần +1)

  // Đảm bảo ngày và tháng có định dạng 2 chữ số (01, 02, ...)
  const formattedDay = day < 10 ? `0${day}` : day;
  const formattedMonth = month < 10 ? `0${month}` : month;

  return `${formattedDay}/${formattedMonth}`; // Kết quả dạng "23/11"
}

export function convertDayOfWeek(timestamp) {
  const date = new Date(timestamp * 1000);
  const now = new Date();
  if (
    date.getDate() === now.getDate() &&
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear()
  ) {
    return i18n.global.t("Today");
  } else {
    // Nếu không trùng, hiển thị ngày trong tuần
    const days = [
      i18n.global.t("Sunday"),
      i18n.global.t("Monday"),
      i18n.global.t("Tuesday"),
      i18n.global.t("Wednesday"),
      i18n.global.t("Thursday"),
      i18n.global.t("Friday"),
      i18n.global.t("Saturday"),
    ];
    const dayOfWeek = days[date.getDay()];
    return dayOfWeek;
  }
}
/**
 * Convert timestamp sang AM/PM
 * @param {*} timestamp
 * @param {*} numberTime
 * @returns
 */
export function convertTimestampToHoursMinutes(
  timestamp,
  numberTime,
  offsetValue,
  timezone
) {
  const dateTime = DateTime.fromMillis(timestamp * 1000, { zone: timezone });

  let hours = dateTime.hour; // Giờ
  let minutes = dateTime.minute; // Phút

  // Chuyển đổi giờ sang định dạng 12 giờ
  hours = hours % 24;
  hours = hours ? hours : 0; // Nếu giờ là 0 thì chuyển thành 12
  minutes = minutes < 10 ? "0" + minutes : minutes;
  const now = DateTime.now().setZone(timezone);
  let hoursNow = now.hour;
  // Trả về thời gian định dạng 12 giờ
  if (numberTime === 0) {
    return (hours < 10 ? "0" + hours : hours) + ":" + minutes;
  } else if (numberTime === 1) {
    if (hours < 10) {
      return "0" + hours + ":" + minutes;
    }
    if (hours === hoursNow) {
      return i18n.global.t("Now");
    }
    return (hours < 10 ? "0" + hours : hours) + ":" + minutes;
  }
}

export function convertTimestampToHoursMinutes12(
  timestamp,
  numberTime,
  offsetValue,
  timezone
) {
  const dateTime = DateTime.fromMillis(timestamp * 1000, { zone: timezone });
  // Lấy giờ và phút
  let hours = dateTime.hour; // Giờ
  let minutes = dateTime.minute; // Phút

  // Chuyển đổi giờ sang định dạng 12 giờ
  let period = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12; // Nếu giờ là 0, chuyển thành 12
  minutes = minutes < 10 ? "0" + minutes : minutes; // Đảm bảo phút có 2 chữ số

  const now = DateTime.now().setZone(timezone);
  let hoursNow = now.hour % 12 || 12;
  let periodNow = now.hour >= 12 ? "PM" : "AM"; // AM/PM hiện tại

  // Trả về thời gian định dạng 12 giờ
  if (numberTime === 0) {
    // return hours + ":" + minutes + " " + period;
    return hours + " " + period;
  } else if (numberTime === 1) {
    if (hours === hoursNow && period === periodNow) {
      return i18n.global.t("Now");
    }
    return hours + " " + period;
  }
}

export function convertTimestampUnit12(
  timestamp,
  numberTime,
  offsetValue,
  timezone
) {
  const dateTime = DateTime.fromMillis(timestamp * 1000, { zone: timezone });
  // Lấy giờ
  let hours = dateTime.hour; // Giờ

  // Chuyển đổi giờ sang định dạng 12 giờ
  let period = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12; // Nếu giờ là 0, chuyển thành 12

  // Trả về AM hoặc PM
  if (numberTime === 0) {
    return period; // Trả về AM/PM
  } else if (numberTime === 1) {
    return period; // Trả về AM/PM
  }
}

export function convertTime12hTimeZoneNotNowUnit(
  timestamp,
  numberTime,
  offsetValue,
  timezone
) {
  const dateTime = DateTime.fromMillis(timestamp * 1000, { zone: timezone });
  // Lấy giờ và phút
  let hours = dateTime.hour; // Giờ
  let minutes = dateTime.minute; // Phút

  // Chuyển đổi giờ sang định dạng 12 giờ
  let period = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12; // Nếu giờ là 0, chuyển thành 12
  minutes = minutes < 10 ? "0" + minutes : minutes; // Đảm bảo phút có 2 chữ số

  const now = DateTime.now().setZone(timezone);
  let hoursNow = now.hour % 12 || 12;
  let periodNow = now.hour >= 12 ? "PM" : "AM"; // AM/PM hiện tại

  // Trả về thời gian định dạng 12 giờ
  if (numberTime === 0) {
    return `${hours}:${minutes} ${period}`; // Trả về giờ, phút và AM/PM
  } else if (numberTime === 1) {
    return `${hours}:${minutes} ${period}`; // Trả về giờ, phút và AM/PM
  }
}

export function convertTime12hTimeZoneNotNow(
  timestamp,
  numberTime,
  offsetValue,
  timezone
) {
  const dateTime = DateTime.fromMillis(timestamp * 1000, { zone: timezone });
  // Lấy giờ và phút
  let hours = dateTime.hour; // Giờ
  let minutes = dateTime.minute; // Phút

  // Chuyển đổi giờ sang định dạng 12 giờ
  let period = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12; // Nếu giờ là 0, chuyển thành 12
  minutes = minutes < 10 ? "0" + minutes : minutes; // Đảm bảo phút có 2 chữ số

  const now = DateTime.now().setZone(timezone);
  let hoursNow = now.hour % 12 || 12;
  let periodNow = now.hour >= 12 ? "PM" : "AM"; // AM/PM hiện tại

  // Trả về thời gian định dạng 12 giờ
  if (numberTime === 0) {
    return hours + ":" + minutes + " " + period;
  } else if (numberTime === 1) {
    return hours + ":" + minutes + " " + period;
  }
}

export function convertTime24hTimeZoneNotNow(
  timestamp,
  numberTime,
  offsetValue,
  timezone
) {
  const dateTime = DateTime.fromMillis(timestamp * 1000, { zone: timezone });

  let hours = dateTime.hour; // Giờ
  let minutes = dateTime.minute; // Phút

  // Chuyển đổi giờ sang định dạng 12 giờ
  hours = hours % 24;
  hours = hours ? hours : 0; // Nếu giờ là 0 thì chuyển thành 12
  minutes = minutes < 10 ? "0" + minutes : minutes;
  const now = DateTime.now().setZone(timezone);
  let hoursNow = now.hour;
  // Trả về thời gian định dạng 12 giờ
  if (numberTime === 0) {
    return (hours < 10 ? "0" + hours : hours) + ":" + minutes;
  } else if (numberTime === 1) {
    if (hours < 10) {
      return "0" + hours + ":" + minutes;
    }

    return (hours < 10 ? "0" + hours : hours) + ":" + minutes;
  }
}

export function convertTimestampNow12(timestamp, numberTime, offsetValue) {
  const date = new Date(timestamp * 1000);
  const utcTime = date.getTime();
  const localTime = new Date(utcTime + offsetValue * 3600 * 1000);

  let hours = localTime.getUTCHours();
  let minutes = localTime.getUTCMinutes();

  // Chuyển đổi giờ sang định dạng 12 giờ
  let period = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours < 10 ? "0" + hours : 12; // Nếu giờ là 0 thì chuyển thành 12
  minutes = minutes < 10 ? "0" + minutes : minutes;

  let now = new Date();
  let hoursNow = now.getHours() % 12 || 12; // Lấy giờ hiện tại theo định dạng 12 giờ

  // Trả về thời gian định dạng 12 giờ
  if (numberTime === 0) {
    return hours + ":" + minutes + " " + period;
  } else if (numberTime === 1) {
    if (hours === hoursNow) {
      return i18n.global.t("Now");
    }
    return hours + ":" + minutes + " " + period;
  }
}

//
export function convertTimestamp24hSun(
  timestamp,
  numberTime,
  offsetValue,
  timezone
) {
  const dateTime = DateTime.fromMillis(timestamp * 1000, { zone: timezone });

  let hours = dateTime.hour; // Giờ
  let minutes = dateTime.minute; // Phút

  // Chuyển đổi giờ sang định dạng 12 giờ
  hours = hours % 24;
  hours = hours ? hours : 0; // Nếu giờ là 0 thì chuyển thành 12
  minutes = minutes < 10 ? "0" + minutes : minutes;
  const now = DateTime.now().setZone(timezone);
  // Trả về thời gian định dạng 12 giờ
  if (numberTime === 0) {
    return (hours < 10 ? "0" + hours : hours) + ":" + minutes;
  } else if (numberTime === 1) {
    if (hours < 10) {
      return "0" + hours + ":" + minutes;
    }
    return (hours < 10 ? "0" + hours : hours) + ":" + minutes;
  }
}

export function convertTimestamp12hSun(
  timestamp,
  numberTime,
  offsetValue,
  timezone
) {
  const dateTime = DateTime.fromMillis(timestamp * 1000, { zone: timezone });
  // Lấy giờ và phút
  let hours = dateTime.hour; // Giờ
  let minutes = dateTime.minute; // Phút

  // Chuyển đổi giờ sang định dạng 12 giờ
  let period = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12; // Nếu giờ là 0, chuyển thành 12
  minutes = minutes < 10 ? "0" + minutes : minutes; // Đảm bảo phút có 2 chữ số

  const now = DateTime.now().setZone(timezone);

  // Trả về thời gian định dạng 12 giờ
  if (numberTime === 0) {
    return hours + ":" + minutes + " " + period;
  } else if (numberTime === 1) {
    return hours + ":" + minutes + " " + period;
  }
}

//

export function convertTimestampNow24(timestamp, numberTime, offsetValue) {
  const date = new Date(timestamp);
  const utcTime = date.getTime();
  const localTime = new Date(utcTime + offsetValue * 3600 * 1000);

  let hours = localTime.getUTCHours();
  let minutes = localTime.getUTCMinutes();

  // Chuyển đổi giờ sang định dạng 12 giờ
  hours = hours % 24;
  hours = hours ? hours : 0; // Nếu giờ là 0 thì chuyển thành 12
  minutes = minutes < 10 ? "0" + minutes : minutes;
  let now = new Date();
  let hoursNow = now.getHours();
  // Trả về thời gian định dạng 12 giờ
  if (numberTime === 0) {
    return hours + ":" + minutes;
  } else if (numberTime === 1) {
    if (hours < 10) {
      return "0" + hours + ":" + minutes;
    }
    if (hours === hoursNow) {
      return i18n.global.t("Now");
    }
    return hours + ":" + minutes;
  }
}

export function convertTimeSun(timestamp, numberTime) {
  let date = new Date(timestamp * 1000);

  let hours = date.getHours();

  let minutes = date.getMinutes();

  // Chuyển đổi giờ sang định dạng 12 giờ
  hours = hours % 24;
  hours = hours ? hours : 0; // Nếu giờ là 0 thì chuyển thành 12
  minutes = minutes < 10 ? "0" + minutes : minutes;
  let now = new Date();
  let hoursNow = now.getHours();
  // Trả về thời gian định dạng 12 giờ
  if (numberTime === 0) {
    return hours;
  } else if (numberTime === 1) {
    if (hours < 10) {
      return "0" + hours + ":" + minutes;
    }
    if (hours === hoursNow) {
      return i18n.global.t("Now");
    }
    return hours + ":" + minutes;
  }
}

export function convertTimestampToAmPm(timestamp) {
  let date = new Date(timestamp * 1000);

  let hours = date.getHours();

  let amPm = hours >= 12 ? "PM" : "AM";

  // Trả về thời gian định dạng 12 giờ
  return amPm;
}

export function convertTimestampToFormattedDate(timestamp, language = "vi") {
  const daysOfWeek = {
    vi: ["Chủ nhật", "Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7"],
    en: [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ],
  };

  const date = new Date(timestamp); // Chuyển đổi từ timestamp
  const dayOfWeek = daysOfWeek[language][date.getDay()]; // Lấy ngày trong tuần theo ngôn ngữ
  const day = date.getDate(); // Lấy ngày
  const month = date.getMonth() + 1; // Lấy tháng (bắt đầu từ 0 nên cần +1)
  const year = date.getFullYear(); // Lấy năm

  if (language === "vi") {
    return `${dayOfWeek}, Ngày ${day}/${month}/${year}`;
  } else if (language === "en") {
    return `${dayOfWeek}, ${month}/${day}/${year}`;
  } else {
    throw new Error("Unsupported language");
  }
}

export function getFormattedCurrentDate() {
  const now = new Date(); // Lấy thời gian hiện tại

  // Lấy tên ngày trong tuần và định dạng ngày tháng
  const dayOfWeek = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
  }).format(now);
  const month = new Intl.DateTimeFormat("en-US", { month: "long" }).format(now);
  const day = now.getDate();
  const year = now.getFullYear();

  // Lấy giờ và định dạng AM/PM
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const isAM = hours < 12;
  const formattedHours = hours % 12 || 12; // Chuyển sang định dạng 12 giờ
  const formattedMinutes = minutes.toString().padStart(2, "0");
  const period = isAM ? "AM" : "PM";

  // return `${dayOfWeek}, ${month} ${day}, ${year} at ${formattedHours}:${formattedMinutes} ${period}`;
  return `${dayOfWeek}, ${month} ${day}, ${year}`;
}

/**
 * Convert mbar sang mmHg
 * @param {*} mbar
 * @returns
 */
export function mbarToMmHg(mbar) {
  return mbar * 0.750062;
}

/**
 * Convert mbar sang hPa
 * @param {*} mbar
 * @returns
 */
export function mbarToHpa(mbar) {
  return mbar; // 1 mbar = 1 hPa
}

/**
 * Convert mbar sang atm
 * @param {*} mbar
 * @returns
 */
export function mbarToAtm(mbar) {
  const result = mbar * 0.000986923;
  return result.toFixed(3) + " " + "amt";
}

/**
 * Convert mbar sang inHg
 * @param {*} mbar
 * @returns
 */
export function mbarToInHg(mbar) {
  return mbar * 0.029529983;
}

/**
 * Convert mbar sang kPa
 * @param {*} mbar
 * @returns
 */
export function mbarToKpa(mbar) {
  return mbar * 0.1;
}

export function formatTimestamp(timestamp) {
  const date = new Date(timestamp * 1000);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return `${day} tháng ${month}, ${year}`;
}

export function getWindDirectionFromDegrees(windBearing) {
  // Normalize windBearing to be within [0, 360) range
  windBearing = windBearing % 360;

  if (windBearing < 0) {
    windBearing += 360;
  }

  if (windBearing >= 11.5 && windBearing < 33.5) return "NNE";
  if (windBearing >= 33.5 && windBearing < 56.5) return "NE";
  if (windBearing >= 56.5 && windBearing < 78.5) return "ENE";
  if (windBearing >= 78.5 && windBearing < 101.5) return "E";
  if (windBearing >= 101.5 && windBearing < 123.5) return "ESE";
  if (windBearing >= 123.5 && windBearing < 146.5) return "SE";
  if (windBearing >= 146.5 && windBearing < 168.5) return "SSE";
  if (windBearing >= 168.5 && windBearing < 191.5) return "S";
  if (windBearing >= 191.5 && windBearing < 213.5) return "SSW";
  if (windBearing >= 213.5 && windBearing < 236.5) return "SW";
  if (windBearing >= 236.5 && windBearing < 258.5) return "WSW";
  if (windBearing >= 258.5 && windBearing < 281.5) return "W";
  if (windBearing >= 281.5 && windBearing < 303.5) return "WNW";
  if (windBearing >= 303.5 && windBearing < 326.5) return "NW";
  if (windBearing >= 326.5 && windBearing < 348.5) return "NNW";

  // Default case for windBearing < 11.5 or >= 348.5
  return "N";
}
export function getWindDirectionEmojiFromDegrees(windBearing) {
  const angle = windBearing % 360;

  if (angle >= 22.5 && angle < 67.5) {
    return "⬈";
  } else if (angle >= 67.5 && angle < 112.5) {
    return "➡";
  } else if (angle >= 112.5 && angle < 157.5) {
    return "⬊";
  } else if (angle >= 157.5 && angle < 202.5) {
    return "⬇";
  } else if (angle >= 202.5 && angle < 247.5) {
    return "⬋";
  } else if (angle >= 247.5 && angle < 292.5) {
    return "⬅";
  } else if (angle >= 292.5 && angle < 337.5) {
    return "⬉";
  } else {
    return "⬆";
  }
}

export function convertMonth(timestamp) {
  const date = new Date(timestamp * 1000);
  const dayMapping = {
    Sunday: i18n.global.t("Sun"),
    Monday: i18n.global.t("Mon"),
    Tuesday: i18n.global.t("Tue"),
    Wednesday: i18n.global.t("Wed"),
    Friday: i18n.global.t("Fri"),
    Thursday: i18n.global.t("Thu"),
    Saturday: i18n.global.t("Sat"),
  };

  const month = date.getMonth() + 1;
  return month;
}

export function convertToShortDay(dateFull) {
  const dayMapping = {
    Sunday: i18n.global.t("Sun"),
    Monday: i18n.global.t("Mon"),
    Tuesday: i18n.global.t("Tue"),
    Wednesday: i18n.global.t("Wed"),
    Friday: i18n.global.t("Fri"),
    Thursday: i18n.global.t("Thu"),
    Saturday: i18n.global.t("Sat"),
  };
  const dayOfWeek = dateFull.split(",")[0].trim();

  const currentDate = new Date();
  const dayOfWeekNow = currentDate.toLocaleDateString("en-US", {
    weekday: "long",
  });

  if (dayMapping[dayOfWeekNow] === dayMapping[dayOfWeek]) {
    return i18n.global.t("Today");
  }

  // Chuyển đổi ngày sang dạng ngắn
  return dayMapping[dayOfWeek] || "Invalid date";
}

export function convertHaversine(
  latCurrently,
  lonCurrently,
  latNearest,
  lonNearest
) {
  const R = 6371; // Bán kính của Trái Đất tính bằng km
  const toRad = (x) => (x * Math.PI) / 180;

  const dLat = toRad(latNearest - latCurrently);
  const dLon = toRad(lonNearest - lonCurrently);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(latCurrently)) *
      Math.cos(toRad(latNearest)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Khoảng cách tính bằng km

  return distance;
}

export function dataDecodeFirstPair(input, dt, ft, st) {
  let v = 0;
  try {
    const m = [];
    let t = -dt;
    let av = 0;
    let scale = 1;
    const p = new DecodeParser(input);

    if (p.getChar() === "#") {
      p.readChar();
      scale = p.readInt();
      p.readChar();
    }

    while (!p.eos()) {
      const c = p.readChar();
      switch (true) {
        case c >= "a":
          v = c.charCodeAt(0) - "a".charCodeAt(0);
          break;
        case c >= "A":
          v = -(c.charCodeAt(0) - "A".charCodeAt(0)) - 1;
          break;
        case c === "!":
          v = p.readInt();
          break;
        case c === "$":
          v = -p.readInt();
          break;
        case c === "#":
          t = p.readInt() + t - dt;
          break;
        case c < "0" || c > "9":
          return null;
        default:
          p.back();
          t = p.readInt() + t - dt;
          break;
      }
      t += dt;
      av += v;
      m.push([t * st + ft, av / scale]);
      return m;
    }
    return m;
  } catch (e) {
    console.error(e);
    return null;
  }
}

class DecodeParser {
  constructor(input) {
    this.input = input;
    this.i = 0;
    this.l = input.length;
  }

  readInt() {
    let c = "0";
    let v = 0;
    while (this.i < this.l && (c = this.input[this.i]) >= "0" && c <= "9") {
      v = v * 10 + (c.charCodeAt(0) - "0".charCodeAt(0));
      this.i++;
    }
    return v;
  }

  getChar() {
    return this.input[this.i];
  }

  readChar() {
    return this.input[this.i++];
  }

  eos() {
    return this.i >= this.l;
  }

  back() {
    this.i--;
  }
}

//
export function convertFtoC(value) {
  return Math.round((value - 32) / 1.8);
}
export function convertCtoF(value) {
  return Math.round(value);
}
/**
 * Convert MM sang IN
 * @param {*} value
 * @returns Precipitation
 */
export function convertMillimetToInch(value) {
  return Math.round(value * 0.03937).toFixed(2);
}

export function convertMillimet(value) {
  return Math.round(value).toFixed(2);
}

/**
 * Convert hPa
 * @param {*} value
 * @returns
 */
export function formatHpa(value) {
  if (value === undefined || value === null || isNaN(value)) {
    console.error("Invalid input value:", value);
    return "Invalid value"; // Hoặc một giá trị mặc định hợp lý khác
  }

  function removeMultipleZero(formattedValue) {
    return formattedValue.replace(/(\.0+|(?<=\.[0-9]*[1-9])0+)$/, "");
  }

  const precision = value.toFixed(3);
  return removeMultipleZero(precision, false);
}

/**
 * Convert hPa sang mmHg
 * @param {*} value
 */
export function convertHpaToMmHg(value) {
  return (value * 0.750061683).toFixed(2);
}

/**
 * Convert hPa sang mbar
 * @param {*} value
 * @returns
 */
export function convertHpaToMbar(value) {
  function removeMultipleZero(formattedValue, keepLastZero) {
    if (keepLastZero) {
      return formattedValue;
    }
    return formattedValue.replace(/(\.0+|(?<=\.[0-9]*[1-9])0+)$/, "");
  }

  const precision = value.toFixed(3);
  return removeMultipleZero(precision, false);
}

/**
 * convert hPa sang atm
 * @param {*} value
 * @returns
 */
export function convertHpaToAtm(value) {
  return (value * 0.000986923267).toFixed(3);
}

/**
 * Convert hPa sang InHg
 * @param {*} value
 * @returns
 */
export function convertHpaToInHg(value) {
  return (value * 0.029529983071).toFixed(3);
}

/**
 * Convert hPa sang kPa
 * @param {*} value
 * @returns
 */
export function convertHpaToKpa(value) {
  function removeMultipleZero(formattedValue, keepLastZero) {
    if (keepLastZero) {
      return formattedValue;
    }
    return formattedValue.replace(/(\.0+|(?<=\.[0-9]*[1-9])0+)$/, "");
  }

  const kpaValue = value * 0.1;
  const precision = kpaValue.toFixed(3);
  return removeMultipleZero(precision, false);
}

/**
 * Convert mi/h sang m/s
 * @param {*} value
 * @returns
 */
export function convertMPHtoMetPS(value) {
  return Math.round((value * 1000) / (60 * 60 * 0.62137)).toFixed(2);
}

/**
 * Convert mi/h sang km/h
 * @param {*} value
 * @returns
 */
export function convertMiToKm(value) {
  return Math.round(value / 0.62137).toFixed(2);
}

/**
 * Convert mi/h sang Knot
 * @param {*} value
 * @returns
 */
export function convertMiToKnot(value) {
  return Math.round(value / 1.150779);
}

/**
 * Convert Beaufort scale
 * @param {*} windSpeedMph
 * @returns
 */
export function convertMiToBeaufortScale(windSpeedMph) {
  if (windSpeedMph < 1) return 0; // Calm
  if (windSpeedMph < 4) return 1; // Light Air
  if (windSpeedMph < 8) return 2; // Light Breeze
  if (windSpeedMph < 13) return 3; // Gentle Breeze
  if (windSpeedMph < 19) return 4; // Moderate Breeze
  if (windSpeedMph < 25) return 5; // Fresh Breeze
  if (windSpeedMph < 32) return 6; // Strong Breeze
  if (windSpeedMph < 39) return 7; // Moderate Gale
  if (windSpeedMph < 47) return 8; // Fresh Gale
  if (windSpeedMph < 55) return 9; // Strong Gale
  if (windSpeedMph < 64) return 10; // Whole Gale
  if (windSpeedMph < 73) return 11; // Storm
  return 12; // Hurricane Force
}

export function formatDate(date) {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return new Intl.DateTimeFormat("en-US", options).format(date); // dạng "staturday, August 10, 2024 "
}
export function formatMonthYear(date) {
  const options = { month: "long", year: "numeric" };
  return new Intl.DateTimeFormat("en-US", options).format(date); //dạng "August, 2024"
}

/**
 * làm tròn 2 chữ số thập phân
 * @param {*} number
 * @returns
 */
export function roundedNumber(number) {
  return (Math.round(number * 100) / 100).toFixed(2);
}

export function codeToFind(value) {
  const unitData = [
    {
      code: "c",
      label: "°C",
    },
    {
      code: "f",
      label: "°F",
    },
    {
      code: "12h",
      label: "12h",
    },
    {
      code: "24h",
      label: "24h",
    },
    {
      code: "mm",
      label: "mm",
    },
    {
      code: "in",
      label: "in",
    },
    {
      code: "km",
      label: "km",
    },
    {
      code: "mi",
      label: "mi",
    },
    {
      code: "m/s",
      label: "m/s",
    },
    {
      code: "km/h",
      label: "km/h",
    },
    {
      code: "mi/h",
      label: "mi/h",
    },
    {
      code: "knot",
      label: "Knot",
    },
    {
      code: "bft",
      label: "BFT",
    },
    {
      code: "mmHg",
      label: "mmHg",
    },
    {
      code: "hPa",
      label: "hPa",
    },
    {
      code: "atm",
      label: "atm",
    },
    {
      code: "inHg",
      label: "kPa",
    },
    {
      code: "mBar",
      label: "mBar",
    },
    {
      code: "kPa",
      label: "kPa",
    },
  ];
  const foundObject = unitData.find((item) => item.code === value);

  return foundObject.label;
}
export function convertTimeNew(seconds) {
  const totalMinutes = Math.floor(seconds / 60);
  const hours = Math.floor(totalMinutes / 60) % 12 || 12;
  const minutes = totalMinutes % 60;

  return `${hours} ${i18n.global.t("hours")} ${minutes} ${i18n.global.t(
    "minute"
  )}`;
}

// convert AQI
export function getAQIColor(aqi) {
  if (aqi <= 50) return "#41E11F";
  if ((50 <= aqi) & (aqi <= 100)) return "#FCFF2F";
  if ((100 <= aqi) & (aqi <= 150)) return "#F68421";
  if ((150 <= aqi) & (aqi <= 200)) return "#F42E1C";
  if ((200 <= aqi) & (aqi <= 300)) return "#8C4396";
  return "#781125"; // Giá trị phần trăm từ 90 đến 100
}
export function getAirSummaryName(value) {
  value = parseInt(value);

  if (value <= 50) {
    return i18n.global.t("Good");
  } else if ((50 <= value) & (value <= 100)) {
    return i18n.global.t("Moderate");
  } else if ((100 <= value) & (value <= 150)) {
    return i18n.global.t("Unhealthy_for_Sensitive_Groups");
  } else if ((150 <= value) & (value <= 200)) {
    return i18n.global.t("Unhealthy");
  } else if ((200 <= value) & (value <= 300)) {
    return i18n.global.t("Very_Unhealthy");
  } else {
    return i18n.global.t("Hazardous");
  }
}

export function getAqiHealthyInformationInfo(aqi) {
  if (aqi <= 50) return i18n.global.t("Air_quality_is_satisfactory");
  if ((50 <= aqi) & (aqi <= 100))
    return i18n.global.t("Sensitive_individuals_should_avoid");
  if ((100 <= aqi) & (aqi <= 150))
    return i18n.global.t("General_public_and_sensitive");
  if ((150 <= aqi) & (aqi <= 200))
    return i18n.global.t("Increased_likelihood_of_adverse");
  if ((200 <= aqi) & (aqi <= 300)) return i18n.global.t("General_public_will");
  return i18n.global.t("General_public_at_high_risk");
}

export function getAqiRecommendedPrecautionsInfo(aqi) {
  if (aqi <= 50) return i18n.global.t("None.");
  if ((50 <= aqi) & (aqi <= 100))
    return i18n.global.t(
      "Unusually_sensitive_people_should_consider_reducing_prolonged_or_heavy_exertion."
    );
  if ((100 <= aqi) & (aqi <= 150))
    return i18n.global.t(
      "People_with_respiratory_or_heart_disease,_the_elderly_and_children_should_limit_prolonged_exertion."
    );
  if ((150 <= aqi) & (aqi <= 200))
    return i18n.global.t(
      "People_with_respiratory_or_heart_disease,_the_elderly_and_children_should_avoid_prolonged_exertion;_everyone_else_should_limit_prolonged_exertion."
    );
  if ((200 <= aqi) & (aqi <= 300))
    return i18n.global.t(
      "People_with_respiratory_or_heart_disease,_the_elderly_and_children_should_avoid_any_outdoor_activity;_everyone_else_should_avoid_prolonged_exertion."
    );
  return i18n.global.t(
    "Everyone_should_avoid_any_outdoor_exertion_people_with_respiratory_or_heart_disease,_the_elderly_and_children_should_remain_indoors."
  );
}

export function getAqiAriStationList(aqi) {
  if (aqi <= 50) return i18n.global.t("Air_quality_is_satisfactory");
  if (aqi <= 100) return i18n.global.t("Air_quality_is_acceptable");
  if (aqi <= 150)
    return i18n.global.t(
      "Members_of_sensitive_groups_may_experience_health_effects._The_general_public_is_less_likely_to_be_affected."
    );
  if (aqi <= 200)
    return i18n.global.t(
      "Some_members_of_the_general_public_may_experience_health_effects;_members_of_sensitive_groups_may_experience_more_serious_health_effects."
    );
  if (aqi <= 300)
    return i18n.global.t(
      "Health_alert:_The_risk_of_health_effects_is_increased_for_everyone."
    );
  return i18n.global.t(
    "Health_warning_of_emergency_conditions:_everyone_is_more_likely_to_be_affected."
  );
}

export function getStringPrimaryPollutantName(aqi) {
  switch (aqi) {
    case "o3":
      return i18n.global.t("O3 (Ozone)");
    case "so2":
      return i18n.global.t("SO2_(Sulphur_dioxide)");
    case "no2":
      return i18n.global.t("NO2_(Nitrogen_dioxide)");
    case "co":
      return i18n.global.t("CO_(Carbon_monoxide)");
    case "pb":
      return i18n.global.t("Pb_(Lead)");
    case "nh3":
      return i18n.global.t("NH3_(Ammonia)");
    case "pm10":
      return i18n.global.t("PM10_(Particles_matter_under_10μm)");
    default:
      return i18n.global.t("PM2.5_(Particles_matter_under_2.5μm)");
  }
}

export function getStringPrimaryPollutantInfo(aqi) {
  switch (aqi) {
    case "o3":
      return i18n.global.t(
        "Ozone_in_the_air_we_breathe_can_harm_our_health,_especially_on_hot_sunny_days_when_ozone_can_reach_unhealthy_levels._Even_relatively_low_levels_of_ozone_can_cause_health_effects."
      );
    case "so2":
      return i18n.global.t(
        "Sulfur_dioxide_irritates_the_skin_and_mucous_membranes_of_the_eyes,_nose,_throat,_and_lungs._High_concentrations_of_SO2_can_cause_inflammation_and_irritation_of_the_respiratory_system,_especially_during_heavy_physical_activity."
      );
    case "no2":
      return i18n.global.t(
        "The_main_health_effect_of_nitrogen_dioxide_is_on_the_respiratory_system._Inhalation_of_nitrogen_dioxide_by_children_increases_their_risk_of_respiratory_infection_and_may_lead_to_poorer_lung_function_in_later_life."
      );
    case "co":
      return i18n.global.t(
        "Breathing_air_with_a_high_concentration_of_CO_reduces_the_amount_of_oxygen_that_can_be_transported_in_the_blood_stream_to_critical_organs_like_the_heart_and_brain._At_very_high_levels,_which_are_possible_indoors_or_in_other_enclosed_environments,_CO_can_cause_dizziness,_confusion,_unconsciousness_and_death."
      );
    case "pb":
      return i18n.global.t(
        "Exposure_to_high_levels_of_lead_may_cause_anemia,_weakness,_and_kidney_and_brain_damage._Very_high_lead_exposure_can_cause_death."
      );
    case "nh3":
      return i18n.global.t(
        "High_levels_of_ammonia_can_irritate_and_burn_the_skin,_mouth,_throat,_lungs,_and_eyes._Very_high_levels_of_ammonia_can_damage_the_lungs_or_cause_death."
      );
    case "pm10":
      return i18n.global.t(
        "PM10_particles_are_small_enough_to_get_into_your_throat_and_lungs._High_levels_of_PM10_can_make_you_cough,_your_nose_run_and_eyes_sting."
      );
    default:
      return i18n.global.t(
        "PM2.5_particles_are_small_enough_to_enter_the_bloodstream_and_typically_result_from_wildfires,_smoke_ashes,_bacteria_or_small_dust_particles"
      );
  }
}

export function convertToWeekdayAndDate(unixTime, offsetValue) {
  const daysOfWeek = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];
  const date = new Date(unixTime * 1000); // Convert Unix Timestamp to Date object

  const utcTime = date.getTime();
  const localTime = new Date(utcTime + offsetValue * 3600 * 1000);

  const weekday = daysOfWeek[localTime.getDay()];
  const day = localTime.getDate().toString().padStart(2, "0"); // Day, formatted to 2 digits
  const month = (localTime.getMonth() + 1).toString().padStart(2, "0"); // Month, formatted to 2 digits

  return {
    weekday,
    date: `${day}/${month}`,
  };
}

export function convertTimestampToDate(timestamp) {
  const date = new Date(timestamp * 1000);

  const daysOfWeek = [
    "Chủ nhật",
    "Thứ 2",
    "Thứ 3",
    "Thứ 4",
    "Thứ 5",
    "Thứ 6",
    "Thứ 7",
  ];

  const dayOfWeek = daysOfWeek[date.getDay()];
  const day = date.getDate().toString().padStart(2, "0"); // Định dạng ngày thành 2 chữ số
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Tháng +1 và định dạng tháng thành 2 chữ số

  return `${dayOfWeek} ${day}/${month}`;
}

export function formatTimestampDay(timestamp) {
  const daysOfWeek = [
    "Chủ Nhật",
    "Thứ 2",
    "Thứ 3",
    "Thứ 4",
    "Thứ 5",
    "Thứ 6",
    "Thứ 7",
  ];

  const date = new Date(timestamp * 1000);

  const dayOfWeek = daysOfWeek[date.getDay()];

  return `${dayOfWeek}`;
}

// New
/**
 * Convert sang English
 * @param {*} str
 * @returns
 */
export function convertToEnglish(str) {
  const keyLanguageStorage = localStorage.getItem("language");

  if (keyLanguageStorage === "en") {
    if (typeof str !== "string") {
      return ""; // Hoặc một giá trị mặc định khác
    }
    return str
      .normalize("NFD") // Chuẩn hóa chuỗi để tách dấu
      .replace(/[\u0300-\u036f]/g, "") // Xóa các dấu thanh
      .replace(/đ/g, "d") // Thay thế chữ "đ" thành "d"
      .replace(/Đ/g, "D"); // Thay thế chữ "Đ" thành "D"
    // .replace(/\s+/g, ''); // Loại bỏ dấu cách
  }
  // Thay thế các ký tự tiếng Việt có dấu thành không dấu
  return str;
}

export function convertToEnglishReplace(str) {
  const keyLanguageStorage = localStorage.getItem("language");

  if (keyLanguageStorage === "en") {
    if (typeof str !== "string") {
      return ""; // Hoặc một giá trị mặc định khác
    }
    return str
      .normalize("NFD") // Chuẩn hóa chuỗi để tách dấu
      .replace(/[\u0300-\u036f]/g, "") // Xóa các dấu thanh
      .replace(/đ/g, "d") // Thay thế chữ "đ" thành "d"
      .replace(/Đ/g, "D") // Thay thế chữ "Đ" thành "D"
      .replace(/\s+/g, ""); // Loại bỏ dấu cách
  }
  // Thay thế các ký tự tiếng Việt có dấu thành không dấu
  return str;
}

export function capitalizeWords(str) {
  return str
    .toLowerCase() // Chuyển tất cả các chữ cái về chữ thường
    .split(" ") // Tách chuỗi thành mảng các từ
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Viết hoa chữ cái đầu
    .join(" "); // Gộp các từ lại thành chuỗi
}

// Convert time

export function timeConvertUTC(timestamp, offset, typeTime) {
  // Chuyển đổi timestamp sang UTC Date
  const utcDate = new Date(timestamp * 1000); // Tính bằng mili giây
  // Tính giờ địa phương bằng offset
  const localDate = new Date(utcDate.getTime() + offset * 60 * 60 * 1000);

  // Định dạng thời gian 12h
  const time12h = localDate.toLocaleString("en-US", {
    hour12: true,
    hour: "2-digit",
    minute: "2-digit",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  // Định dạng thời gian 24h
  const time24h = localDate.toLocaleString("en-GB", {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  if (typeTime === "12h") {
    return time12h;
  }
  return time24h;
}

// Convert Day
