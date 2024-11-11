/**
 * Save giá trị recent lên LocalStorage
 * @param {*} key
 * @param {*} value
 */
export function saveRecentLocalStorage(key, value) {
  let storedData = JSON.parse(localStorage.getItem(key)) || [];
  // Nếu mảng đã đủ 3 phần tử, xóa phần tử đầu tiên
  if (storedData.length === 3) {
    storedData.pop();
  }

  // Thêm phần tử mới vào mảng
  if (storedData.length !== 0) {
    const findData = storedData.find(
      (x) => x.latitude === value.latitude && x.longitude === value.longitude
    );
    if (!findData) {
      storedData.unshift(value);
    }
  } else {
    storedData.unshift(value);
  }

  // Lưu lại mảng mới vào localStorage
  localStorage.setItem(key, JSON.stringify(storedData));
}

export function getFromLocalStorage(key) {
  // Trả về mảng các object từ localStorage
  return JSON.parse(localStorage.getItem(key)) || [];
}
