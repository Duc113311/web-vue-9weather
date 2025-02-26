import { createI18n } from "vue-i18n";

// Hàm để tự động nhập các tệp ngôn ngữ từ thư mục translations
function loadCommonMessages() {
  const commonLocales = require.context("./translations", false, /\.json$/);
  const commonMessages = {};

  commonLocales.keys().forEach((key) => {
    const lang = key.replace("./", "").replace(".json", ""); // Lấy tên ngôn ngữ từ tên tệp
    commonMessages[lang] = commonLocales(key); // Thêm tệp ngôn ngữ vào commonMessages
  });

  return commonMessages;
}

// Hàm để tự động nhập các tệp ngôn ngữ từ thư mục vietnam
function loadVietnamMessages() {
  const vietnamLocales = require.context("./vietnam", true, /\.json$/);
  const vietnamMessages = {};

  vietnamLocales.keys().forEach((key) => {
    const locale = key.match(/\/([^/]+)\/([^/]+)\.json$/);
    if (locale) {
      const lang = locale[1]; // Ngôn ngữ (en hoặc vi)
      const region = locale[2]; // Tỉnh thành
      if (!vietnamMessages[lang]) {
        vietnamMessages[lang] = {};
      }
      vietnamMessages[lang][region] = vietnamLocales(key); // Thêm tệp ngôn ngữ vào vietnamMessages
    }
  });

  return vietnamMessages;
}
// Kết hợp cả hai tệp ngôn ngữ
const messages = {
  en: {
    ...loadVietnamMessages(),
    ...loadCommonMessages().en,
  },
  vi: {
    ...loadVietnamMessages(),
    ...loadCommonMessages().vi,
  },
  ja: {
    ...loadCommonMessages().ja,
  },
};

// const messages = {
//   en: {
//     city: cityEn,
//     common: enValue,
//     angiang: angiangEn,
//     bacgiang: bacgiangEn,
//   },
//   vi: {
//     city: cityVi,
//     common: viValue,
//     angiang: angiangVi,
//     bacgiang: bacgiangVi,
//   },
// };

const storedLanguage = localStorage.getItem("language");
const defaultLanguage = "en"; // Ngôn ngữ mặc định
const i18n = createI18n({
  locale: storedLanguage || defaultLanguage, // Sử dụng ngôn ngữ từ localStorage nếu có, ngược lại sử dụng ngôn ngữ mặc định
  fallbackLocale: defaultLanguage,
  messages,
});

export default i18n;
