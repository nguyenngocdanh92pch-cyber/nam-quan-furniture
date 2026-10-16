/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./sections/**/*.html", // Quét toàn bộ các file HTML section đã tách
    "./js/**/*.js", // Quét logic JS nếu có gán class động
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          green: "#175214", // Xanh đậm Header/Footer
          lightGreen: "#2E9F3B", // Xanh sáng nút Language
          orange: "#E87A00", // Cam Flash Sale/Active
          lightOrange: "#FFF7F0", // Nền nhạt Flash Sale
          grayText: "#333333", // Xám chữ nội dung
          darkGray: "#181D27", // Xám đen Footer
          functional25: "#FDFDFD", // Trắng ngà Header Nav
          greenTitle: "#219653", // Xanh lá tiêu đề
        },
      },
      fontFamily: {
        manrope: ["Manrope", "sans-serif"],
        montserrat: ["Montserrat", "sans-serif"],
        pinyon: ["'Pinyon Script'", "cursive"],
        opensans: ["'Open Sans'", "sans-serif"],
        bevietnam: ["'Be Vietnam Pro'", "sans-serif"],
      },
      boxShadow: {
        fs: "0px 3px 0px rgba(0, 0, 0, 0.15)",
        card: "0px 4px 15px rgba(0, 0, 0, 0.05)",
      },
    },
  },
  plugins: [],
};
