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
    DienBien: "Điện Biên",
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

  // Ánh xạ tên địa danh
  const converted = vietnameseMap[input] || input;

  // Thay khoảng trắng bằng dấu gạch dưới
  return converted;
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
  const wordsToRemove = ["Xã", "Thị Xã", "Phường", "Thị Trấn"];
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
