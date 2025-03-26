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

export function groupTidesByDate(data) {
  const grouped = {};

  data.forEach((item) => {
    // Cắt phần ngày (YYYY-MM-DD) từ datetime
    const date = item.datetime.split("T")[0];

    if (!grouped[date]) {
      grouped[date] = [];
    }

    grouped[date].push({
      time: item.datetime.split("T")[1].slice(0), // Giờ phút: "HH:MM"
      state: item.state,
      height: item.height,
    });
  });

  return grouped;
}

export function groupTidesFromToday(data, daysAhead = 3) {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // reset giờ phút giây

  const grouped = {};

  data.forEach((item) => {
    const dateStr = item.datetime.split("T")[0]; // lấy phần yyyy-mm-dd
    const dateObj = new Date(dateStr);
    const diff = (dateObj - today) / (1000 * 60 * 60 * 24); // số ngày cách hôm nay

    if (diff >= 0 && diff < daysAhead) {
      if (!grouped[dateStr]) {
        grouped[dateStr] = [];
      }

      grouped[dateStr].push({
        time: item.datetime.split("T")[1].slice(0, 5), // HH:mm
        state: item.state,
        height: Number(item.height.toFixed(2)),
      });
    }
  });

  return grouped;
}

export function takeFirstNFromObject(grouped, limitDays = 3) {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // reset giờ

  const filtered = {};

  const sortedKeys = Object.keys(grouped)
    .filter((dateStr) => {
      const date = new Date(dateStr);
      return date >= today;
    })
    .sort(); // đảm bảo ngày theo thứ tự tăng dần

  // Lấy tối đa limitDays ngày
  const limitedKeys = sortedKeys.slice(0, limitDays);

  limitedKeys.forEach((key) => {
    filtered[key] = grouped[key];
  });

  return filtered;
}

export function convertGroupedForLineChart(grouped) {
  const datasets = [];

  Object.entries(grouped).forEach(([dateStr, items]) => {
    const data = items.map((item) => {
      // Ghép date + time → datetime ISO
      const utcDate = new Date(`${dateStr}T${item.time}`);
      const vnDate = new Date(utcDate.getTime() + 7 * 60 * 60 * 1000);

      const label = `${String(vnDate.getHours()).padStart(2, "0")}:${String(
        vnDate.getMinutes()
      ).padStart(2, "0")}`;
      return {
        x: label,
        y: Number(item.height.toFixed(2)),
      };
    });

    datasets.push({
      label: `Ngày ${dateStr.split("-").reverse().join("/")}`, // "26/03/2025"
      data,
      tension: 0.4,
      borderWidth: 2,
      pointRadius: 3,
    });
  });

  return datasets;
}
