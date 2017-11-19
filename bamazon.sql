/*Drops the bamazon_db if it exists currently*/
DROP DATABASE IF EXISTS Bamazon;
/*Create and declare initial table*/

CREATE DATABASE Bamazon;
USE Bamazon;
CREATE TABLE Products(
    ItemID INTEGER(10) AUTO_INCREMENT NOT NULL,
    ProductName VARCHAR(50) NOT NULL,
    DepartmentName VARCHAR(50) NOT NULL,
    Price DECIMAL(10) NOT NULL,
    StockQuantity INTEGER(10),
    primary key(ItemId)
);

/*This is the syntax for creating new product*/
INSERT INTO Products(ProductName, DepartmentName, Price, StockQuantity) VALUES('BasketBall', 'Sports', 19.99, 50);
INSERT INTO Products(ProductName, DepartmentName, Price, StockQuantity) VALUES('Bread', 'Food', 3.99, 100);
INSERT INTO Products(ProductName, DepartmentName, Price, StockQuantity) VALUES('Sugar Water', 'Drink', 9.99, 300);
INSERT INTO Products(ProductName, DepartmentName, Price, StockQuantity) VALUES('Coke', 'Drink', 1.99, 150);
INSERT INTO Products(ProductName, DepartmentName, Price, StockQuantity) VALUES('Golf Ball', 'Sports', 1.49, 50);

