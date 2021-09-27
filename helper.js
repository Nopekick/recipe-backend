const axios = require("axios")
const cheerio = require("cheerio")

exports.computeSeasonalityScore = function(arr){
      if(arr.length == 0) return null
    let counter = 0;
    arr.forEach((seas)=>{
        if(seas) counter++
    })
    return ((counter/(arr.length))*100) + 6

}


const fetchData = async (url) => {
  const result = await axios.get(url);
  return cheerio.load(result.data);
};


exports.getResults = async function(url){
  let arr = []
  let jsonbuilder = {}
  const $ = await fetchData(url);
  $('label > .recipe-ingred_txt').attr('itemprop', 'recipeIngredient').each((index, element) => {
      let el = $(element).text()
      if(el.length > 0) arr.push(el)
   });;

  return arr.slice(0, arr.length-2)
};
