const app = require("express")()
const db = require("./models")
const cors = require("cors")
const bodyParser = require('body-parser')
const {computeSeasonalityScore, getResults} = require("./helper")

app.use(bodyParser.json());
app.use(cors())

app.post("/api/food", async function(req, res){
    let ingred = req.body.ingredients, jsonbuilder = {}, seasonalities = []
    jsonbuilder['foods'] = []
    jsonbuilder['err'] = []
    
    for(let i = 0; i < ingred.length; i++){
        try {
            console.log(ingred[i])
            let food = await db.Food.findOne({name: ingred[i]})
            if(food){
              let seasonality = food.seasonality_california.includes(req.body.date)
              seasonalities.push(seasonality)
              jsonbuilder['foods'].push({
                  tips: food.tips,
                  seasonality,
                  name: food.name
              })
            } else {
              jsonbuilder['err'].push(`Error on finding ${ingred[i]}`)
            }

        } catch (err){
            console.log(err)
            jsonbuilder['err'].push(`Error on finding ${ingredient}`)
        }
    }
    let score = computeSeasonalityScore(seasonalities)
    jsonbuilder['rating'] = score
    res.json(jsonbuilder)
})


app.post("/api/link", async function(req, res){
  let result = await getResults(req.body.cur)
  res.json({result})
})


app.use(function(req, res, next){
    let err = new Error('Not Found')
    err.status = 404
    next(err)
  })

  app.use(function errorHandler(error, req, res, next){
    return res.status(error.status || 500).json({
      error: {
        message: error.message || "Something went wrong."
      }
    })
  })



app.listen(process.env.PORT || 8081, ()=>{
    console.log("Server running on port 8081")
})
