const is_prod = process.env.NODE_ENV == 'production';

module.exports = {
  API_URL: is_prod ? 'http://vacucu.ci.zaje.me:3000/v1/api' : 'http://localhost:3000/v1/api'; 
}
