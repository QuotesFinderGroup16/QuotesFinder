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
            Authorization: `Bearer ${process.env.API_KEY}`
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
          next(err)
        })         
  }
  
  static addQuote(req,res,next){
    let { author, quote } = req.body;

    Quote.create({ author, quote, UserId: req.decoded.id })
    .then(quote => res.status(201).json({ quote }))
    .catch(err => next(err));   
  }
  static userQuotesList(req,res,next){
    Quote.findAll({
      where: {
        UserId: req.decoded.id
      }
    })
    .then(quotes => res.status(200).json({ quotes }))
    .catch(err => next(err));
  }
  static deleteQuote(req,res,next){
    console.log(req.params.id)
    let id = +req.params.id
    Quote.destroy({
      where: {
        id
      }
    })
      .then(data => {
        res.status(200).json(data)
      })
      .catch(err => {
        next(err)
      })
  }

}

module.exports = ControllerQuote