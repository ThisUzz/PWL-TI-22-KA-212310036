require("dotenv").config();

module.exports = {
    development: {
        username: process.env.EXPRESS_DB_USERNAME,
        password: process.env.EXPRESS_DB_PASSWORD,
        database: process.env.EXPRESS_DB_NAME,
        host: process.env.EXPRESS_DB_HOST,
        dialect: "mysql",
        port: process.env.EXPRESS_DB_PORT,
        pool: {
            max: 10, // Jumlah maksimum koneksi dalam pool
            min: 0, // Jumlah minimum koneksi dalam pool
            acquire: 30000, // Waktu maksimum dalam milidetik untuk mencoba mendapatkan koneksi sebelum melempar kesalahan
            idle: 10000 // Waktu maksimum dalam milidetik untuk koneksi tetap tidak aktif sebelum dihapus dari pool
        }
    },
    test: {
        username: process.env.EXPRESS_DB_USERNAME,
        password: process.env.EXPRESS_DB_PASSWORD,
        database: process.env.EXPRESS_DB_NAME,
        host: process.env.EXPRESS_DB_HOST,
        dialect: "mysql",
        port: process.env.EXPRESS_DB_PORT,
    },
    production: {
        username: process.env.EXPRESS_DB_USERNAME_PROD,
        password: process.env.EXPRESS_DB_PASSWORD_PROD,
        database: process.env.EXPRESS_DB_NAME_PROD,
        host: process.env.EXPRESS_DB_HOST_PROD,
        dialect: "mysql",
        port: process.env.EXPRESS_DB_PORT_PROD,
        pool: {
            max: 10, // Jumlah maksimum koneksi dalam pool
            min: 0, // Jumlah minimum koneksi dalam pool
            acquire: 30000, // Waktu maksimum dalam milidetik untuk mencoba mendapatkan koneksi sebelum melempar kesalahan
            idle: 10000 // Waktu maksimum dalam milidetik untuk koneksi tetap tidak aktif sebelum dihapus dari pool
        }
    },
};