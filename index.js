//modules needed
import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = process.env.PORT || 3000;
//api used to generate random cocktail recipe
const API_URL = "https://www.thecocktaildb.com/api/json/v1/1/random.php";

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/cocktail-gen", (req, res) => {
    res.render("index.ejs", { drink: "" });
  });

app.get("/generated", async (req,res) => {
    try{
        const result = await axios.get(API_URL);
        const drinkData = result.data.drinks[0];
        res.render("index.ejs", {
            drink: drinkData.strDrink,
            instructions: drinkData.strInstructions
        })
    } catch (error) {
        console.log("Failed to make request:", error.message);
        res.render("index.ejs", {
            error: error.message,
        });
      }
    });


//start app
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });