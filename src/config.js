module.exports = {
    PORT: process.env.PORT || 4000,
    NODE_ENV: process.env.NODE_ENV || 'development', 
    DATABASE_URL: process.env.DB_URL, 
    TEST_DATABASE_URL: process.env.TEST_DB_URL
}