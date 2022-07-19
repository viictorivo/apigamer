const express = require ("express");
const app = express();
const bodyParser = require("body-parser");


app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

let DB = {
   games:[{
        id:23,
        title:"Call of duty MW",
        year: 2019,
        price:60
   },
   {
    id:29,
    title:"Pokemon",
    year: 2000,
    price:100
   },
   {
    id:33,
    title:"Digimon",
    year: 2003,
    price:120
}]}

app.get("/gamer", (req,res) =>{
    res.statusCode = 200;
    res.json(DB.games);
})

app.get("/gamer/:id",(req,res) =>{

        if(isNaN (req.params.id)){
            res.sendStatus(400);
        }else{
            let id = parseInt(req.params.id);

            let game = DB.games.find(g => g.id == id);

            if (game != undefined){
                res.statusCode = 200;
                res.json(game);
            } else {
                res.sendStatus(204);
            }
        }
});

app.post("/game", (req, res) => {
    
    let {title, price, year} = req.body;

    DB.games.push({
        id:39,
        title,
        year,
        price
    })

    res.sendStatus(200);

})

app.delete("/game/:id", (req, res) => {

    if(isNaN (req.params.id)){
        res.sendStatus(400);
    }else{
        let id = parseInt(req.params.id);

        let index = DB.games.findIndex(g => g.id == id);

        if(index == -1){
            res.sendStatus(204);
        } else {
            DB.games.splice(index,1);
            res.sendStatus(200);
        }
}})

app.listen(45678, () => {
    console.log("api rodando");
})