import removeAccents from "remove-accents";

/**
 * Convert từ "Hà Nội thủ đô" => "Ha_Noi_thu_do"
 * @param {*} str
 * @returns
 */
export function convertToSnakeCase(str) {
  const slug = removeAccents(str).replace(/\s+/g, "_");
  return slug;
}

export function convertToVietnamese(input) {
  // Map các từ gốc sang từ có dấu

  const data = removeWordAndAccents(input);

  // const dataNew = convertToCamelCase(data);

  const vietnameseMap = {
    Hanoi: "Hà Nội",
    Haiphong: "Hải Phòng",
    Danang: "Đà Nẵng",
    Hochiminh: "Hồ Chí Minh",
    Cantho: "Cần Thơ",
    AnGiang: "An Giang",
    BacGiang: "Bắc Giang",
    BacKan: "Bắc Kạn",
    BacLieu: "Bạc Liêu",
    BacNinh: "Bắc Ninh",
    BenTre: "Bến Tre",
    BinhDinh: "Bình Định",
    BinhDuong: "Bình Dương",
    BinhPhuoc: "Bình Phước",
    BinhThuan: "Bình Thuận",
    CaMau: "Cà Mau",
    CaoBang: "Cao Bằng",
    DakLak: "Đắk Lắk",
    DakNong: "Đắk Nông",
    DienBien: "Điện Biên Phủ",
    DongNai: "Đồng Nai",
    DongThap: "Đồng Tháp",
    GiaLai: "Gia Lai",
    HaGiang: "Hà Giang",
    HaNam: "Hà Nam",
    HaTinh: "Hà Tĩnh",
    HaiDuong: "Hải Dương",
    HauGiang: "Hậu Giang",
    HoaBinh: "Hòa Bình",
    HungYen: "Hưng Yên",
    KhanhHoa: "Khánh Hòa",
    KienGiang: "Kiên Giang",
    KonTum: "Kon Tum",
    LaiChau: "Lai Châu",
    LamDong: "Lâm Đồng",
    LangSon: "Lạng Sơn",
    LaoCai: "Lào Cai",
    LongAn: "Long An",
    NamDinh: "Nam Định",
    NgheAn: "Nghệ An",
    NinhBinh: "Ninh Bình",
    NinhThuan: "Ninh Thuận",
    PhuTho: "Phú Thọ",
    PhuYen: "Phú Yên",
    QuangBinh: "Quảng Bình",
    QuangNam: "Quảng Nam",
    QuangNgai: "Quảng Ngãi",
    QuangNinh: "Quảng Ninh",
    QuangTri: "Quảng Trị",
    SocTrang: "Sóc Trăng",
    SonLa: "Sơn La",
    TayNinh: "Tây Ninh",
    ThaiBinh: "Thái Bình",
    ThaiNguyen: "Thái Nguyên",
    ThanhHoa: "Thanh Hóa",
    ThuaThienHue: "Thừa Thiên Huế",
    TienGiang: "Tiền Giang",
    TraVinh: "Trà Vinh",
    TuyenQuang: "Tuyên Quang",
    VinhLong: "Vĩnh Long",
    VinhPhuc: "Vĩnh Phúc",
    YenBai: "Yên Bái",
  };

  // Kiểm tra nếu chuỗi tồn tại trong map
  const converted = vietnameseMap[data] || data;

  // Thay khoảng trắng bằng dấu gạch dưới
  return {
    city: converted,
    cityConvert: convertToConvertLowerCase(converted),
  };
}

export function convertToConvertLowerCase(str) {
  const slug = removeAccentsUnicode(str).replace(/\s+/g, "_");

  return slug;
}

export function removeAccentsUnicode(str) {
  return str
    .normalize("NFD") // Chuẩn hóa Unicode thành dạng tổ hợp ký tự và dấu
    .replace(/[\u0300-\u036f]/g, "") // Loại bỏ tổ hợp dấu
    .replace(/đ/g, "d") // Xử lý riêng cho chữ "đ"
    .replace(/Đ/g, "D");
}
/**
 * Xử lý chuỗi khu có ký tự ' VD: Dak R'Lay
 * @param {*} key
 * @returns
 */
export function replaceApostropheWithUnderscore(key) {
  // Kiểm tra nếu chuỗi chứa dấu ' thì thay thế bằng _
  if (key.includes("'")) {
    return key.replace(/'/g, "_");
  }
  // Nếu không chứa dấu ', trả về chuỗi gốc
  return key;
}

export function removeWordAndAccents(str) {
  const wordsToRemove = [
    "Xã",
    "Thị Xã",
    "Phường",
    "Thị Trấn",
    "Province",
    "City",
  ];
  const removeAccents = (s) =>
    s
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "") // Loại bỏ dấu
      .replace(/đ/g, "d")
      .replace(/Đ/g, "D");

  // Loại bỏ dấu và chuẩn hóa chuỗi
  let normalizedStr = removeAccents(str);

  // Loại bỏ từng từ trong danh sách wordsToRemove
  wordsToRemove.forEach((word) => {
    const normalizedWord = removeAccents(word);
    const regex = new RegExp(`\\b${normalizedWord}\\b`, "gi");
    normalizedStr = normalizedStr.replace(regex, "").trim();
  });

  return normalizedStr;
}

export function convertLowerCase(str) {
  const slug = removeAccents(str);
  return slug.replace(/\s+/g, "-").toLowerCase();
}

export function checkSubstring(str1, str2) {
  // Kiểm tra nếu str1 giống hoàn toàn str2
  if (str1 === str2) {
    return true;
  }

  // Tách các từ bằng cách loại bỏ ký tự không phải chữ và chia nhỏ theo dấu "_"
  const words1 = str1.replace(/[^\w\s]/g, "").split("_");
  const words2 = str2.replace(/[^\w\s]/g, "").split("_");

  // Chuyển đổi str2 thành mảng đã định dạng (giả sử convertToFormattedArray là cần thiết)
  // const convertArray = this.convertToFormattedArray(str2);

  // Lọc ra các từ chung giữa words1 và words2
  const commonWords = words1.filter((word) => words2.includes(word));

  // Kiểm tra có ít nhất 2 từ chung
  return commonWords.length >= 2;
}

export function convertToFormattedArray(input) {
  if (!input) return []; // Nếu chuỗi không có giá trị, trả về mảng rỗng

  return input
    .split(" ") // Tách chuỗi theo khoảng trắng
    .map((word, index) => {
      if (index === 0) {
        return word; // Từ đầu tiên chuyển thành chữ thường
      }
      return word.charAt(0) + word.slice(1); // Viết hoa chữ cái đầu cho từ còn lại
    });
}
