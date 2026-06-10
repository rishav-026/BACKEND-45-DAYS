module.expoorts={
    PORT:process.env.PORT||3000,
    Node_ENV:process.env.NODE_ENV||'development',
    DB_URL:process.env.DB_URL||'mongodb://localhost:27017/myapp',
    JWT_SECRET:process.env.JWT_SECRET||'fallback-SecretKey'
}