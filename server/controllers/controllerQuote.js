const axios = require('axios');
const { Quote } = require('../models')


class ControllerQuote{
  static quotesList(req,res,next){
    let quotes = {}
    let container = []
axios({
    method: "get",
    url: `https://favqs.com/api/quotes`,
    headers: {
        Authorization: 'Bearer 30bf29a24a694b15ef04fd7ed7a70d95'
      }
  })
  .then(response => {
    quotes.favQs = response.data.quotes
    return axios({
        method: "get",
        url: `http://api.quotable.io/quotes`,
      })
    })
    .then(response => {
      quotes.quotable = response.data.results
      return  axios({
        method: "get",
        url: `https://quote-garden.herokuapp.com/api/v3/quotes`,
      })
    })
    .then(response => {
      quotes.garden = response.data.data
      quotes.garden.forEach((element,i) => {
        container.push({
          author: quotes.favQs[i].author,
          quote: quotes.favQs[i].body
        })
        container.push({
          author: quotes.quotable[i].author,
          quote: quotes.quotable[i].content
        })
        container.push({
          author: element.quoteAuthor,
          quote: element.quoteText
        })
      });
      res.status(200).json(container)
    })
    .catch(err => {
      console.log(err)
    })     
  }
  static addQuote(req,res,next){
    
  }
  static userQuotesList(req,res,next){
    
  }
  static deleteQuote(req,res,next){
    
  }

}
ControllerQuote.quotesList()
module.exports = ControllerQuote