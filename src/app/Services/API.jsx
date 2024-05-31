import axios from 'axios';

export default axios.create({
  baseURL: `https://esg.venturestudiocms.com/api`
  //baseURL: `${process.env.REACT_APP_API_URL}`
});
