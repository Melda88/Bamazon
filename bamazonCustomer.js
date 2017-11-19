//Dependencies
var mysql = require('mysql');
var inquirer = require('inquirer');
var Table = require('cli-table');

//Connection
var connection = mysql.createConnection({
    host: "localhost",
    port: 8889,
//Your username
    user: "root", 
//Your password
    password: "root", 
    database: "Bamazon"
});

//Thorws error if not connected
connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    displayAll();
    purchaseFromDatabase();
  });

//Functions
function displayAll() {
    //show all ids, names, and products from database.
    connection.query('SELECT * FROM Products', function (error, response) {
        if (error) {
            console.log(error)
        };
        //New instance of our constructor
        var theDisplayTable = new Table({
            //declare the value categories
            head: ['Item ID', 'Product Name', 'Category', 'Price', 'Quantity'],
            //set widths to scale
            colWidths: [10, 30, 18, 10, 14]
        });
        //for each row of the loop
        for (i = 0; i < response.length; i++) {
            //push data to table
            theDisplayTable.push(
                [response[i].ItemID, response[i].ProductName, response[i].DepartmentName, response[i].Price, response[i].StockQuantity]
            );
        }
        //log the completed table to console
        console.log(theDisplayTable.toString());
        inquireForPurchase();
    });


}; //end displayAll
function inquireForPurchase() {
    //get item ID and desired quantity from user. Pass to purchase from Database
    inquirer.prompt([

        {
            name: "ID",
            type: "input",
            message: "What is the item number of the item you wish to purchase?"
        }, {
            name: 'Quantity',
            type: 'input',
            message: "How many would you like to buy?"
        },

    ]).then(function (answers) {
        //set captured input as variables, pass variables as parameters.
        var quantityDesired = answers.Quantity;
        var IDDesired = answers.ID;
        purchaseFromDatabase(IDDesired, quantityDesired);
    });

}; //end inquireForPurchase

function purchaseFromDatabase(ID, quantityNeeded) {
    //check quantity of desired purchase. Minus quantity of the itemID from database if possible. Else inform user "Quantity desired not in stock" 
    connection.query('SELECT * FROM Products WHERE ItemID = ' + ID, function (error, response) {
        if (error) {
            console.log(error)
        };

        //if in stock
        if (quantityNeeded <= response[0].StockQuantity) {
            //calculate cost
            var totalCost = response[0].Price * quantityNeeded;
            //inform user we have item with price 
            console.log("We have what you need!");
            console.log("Your total cost for " + quantityNeeded + " " + response[0].ProductName + " is " + totalCost + ". Thank you for your Business!");
            //update database, minus purchased quantity
            connection.query('UPDATE Products SET StockQuantity = StockQuantity - ' + quantityNeeded + ' WHERE ItemID = ' + ID);
            //if not in stock     
            } else {
            console.log("Our apologies. We don't have enough " + response[0].ProductName + " to fulfill your order.");
            };
        displayAll(); //recursive shopping is best shopping! Shop till you drop!
    });

}; //end purchaseFromDatabase

