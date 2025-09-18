import dotenv from 'dotenv'

dotenv.config()

export const config = {
    port :Number(process.env.PORT),
    databaseurl : process.env.DATABASE_URL,
    jwt:{
        accessSecret:process.env.JWT_ACCESS_SECRET,
        refreshSecret:process.env.JWT_REFRESH_SECRET,
        accessExpiry:process.env.ACCESS_TOKEN_EXPIRES_IN,
        refreshExpiry:process.env.REFRESH_TOKEN_EXPIRES_IN,
    },
    redisUrl:process.env.REDIS_URL

}