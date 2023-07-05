export default () => ({
    port: parseInt(process.env.PORT, 10) || 8080,
    jwt:{
        secret: process.env.JWT_SECRET,
        expireIn: process.env.JWT_EXPIRES_IN,
    }
  });