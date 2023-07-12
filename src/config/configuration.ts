export default () => ({
    port: parseInt(process.env.PORT, 10) || 8000,
    jwt:{
        secret: process.env.JWT_SECRET,
        expireIn: process.env.JWT_EXPIRES_IN,
    }
  });