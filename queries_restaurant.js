USE mongo_queries;

/*1-Escribe una consulta para mostrar todos los documentos en la colección Restaurantes*/

db.restaurants.find()


/*2-Escribe una consulta para mostrar restaurante_id, name, borough y cuisine para todos los documentos en la colección Restaurantes*/

db.restaurants.find({},{restaurant_id: 1, name: 1, borough: 1, cuisine: 1})


/*3-Escribe una consulta para mostrar el restaurante_id, name, borough y cuisine, pero excluir el campo _id por todos los documentos en la colección Restaurantes*/

db.restaurants.find({},{_id: 0, restaurant_id: 1, name: 1, borough: 1, cuisine: 1})


/*4-Escribe una consulta para mostrar restaurant_id, name, borough y zip code, pero excluir el campo _id por todos los documentos en la colección Restaurantes*/

db.restaurants.find({}, {_id: 0, restaurant_id: 1, name: 1, borough: 1, address: {zipcode: 1}})


/*5-Escribe una consulta para mostrar todos los restaurantes que están en el Bronx*/

db.restaurants.find({borough: "Bronx"})


/*6-Escribe una consulta para mostrar los primeros 5 restaurantes que están en el Bronx*/

db.restaurants.find({borough: "Bronx"}).limit(5)


/*7-Escribe una consulta para mostrar el próximo 5 restaurantes después de saltar los primeros 5 del Bronx*/

db.restaurants.find({borough: "Bronx"}).skip(5).limit(5)


/*8-Escribe una consulta para encontrar los restaurantes que tienen un resultado de más de 90*/

db.restaurants.find({"grades.score": {$gt: 90}})


/*9-Escribe una consulta para encontrar los restaurantes que tienen un resultado de más de 80 pero menos que 100*/

db.restaurants.find({ $or : [{ "grades.score" : { $gt : 80 }}, { "grades.score" : { $lt : 100 }}]})


/*10-Escribe una consulta para encontrar los restaurantes que localizan en valor de latitud menos que -95.754168*/

db.restaurants.find({ "address.coord.0" : { $lt : -95.754168 }})


/*11-Escribe una consulta de MongoDB para encontrar los restaurantes que no preparan ninguna cuisine de 'American' y su puntaje de calificación superior a 70 y latitud inferior a -65.754168*/

db.restaurants.find({ $and : [ { cuisine : { $ne : "American " }}, { "grades.score" : { $gt: 70 }}, { "address.coord" : { $lt: -65.754168} }]})


/*12-Escribe una consulta para encontrar a los restaurantes cuáles no preparan ninguna cuisine de 'American' y consiguió un marcador más que 70 y localizado en la longitud menos que -65.754168. Nota : Haz esta consulta sin utilizar $and operador*/

db.restaurants.find({ cuisine: {$ne: "American "}, "grades.score": {$gt: 70}, "address.coord.0": {$lt: -65.754168} })


/*13-Escribe una consulta para encontrar los restaurantes cuáles no preparan ninguna cuisine de 'American' y logró un punto de grado 'A' no pertenece a Brooklyn. Se debe mostrar el documento según la cuisine en orden descendente*/

db.restaurants.find({ cuisine : {$ne: "American "}, "grades.grade" : "A", "borough" : {$ne : "Brooklyn"} }).sort({cuisine: -1})


/*14-Escribe una consulta para encontrar el restaurante_id, name, borough y cuisine para aquellos restaurantes cuál contener 'Wil' como las tres primeras letras en su nombre*/

db.restaurants.find( { name: {$regex: "^Wil"}}, { restaurant_id:1, name:1, borough:1, cuisine: 1, _id:0 })


/*15-Escribe una consulta para encontrar el restaurante_id, name, borough y cuisine para aquellos restaurantes cuál contener 'ces' como las últimas tres letras en su nombre*/

db.restaurants.find({ name: {$regex: "ces$"}}, { restaurant_id:1, name:1, borough:1, cuisine: 1, _id:0 } )


/*16-Escribe una consulta para encontrar el restaurante_id, name, borough y cuisine para aquellos restaurantes cuál contener 'Reg' como tres letras en algún lugar en su nombre*/

db.restaurants.find( { name : {$regex: "Reg"}}, { restaurant_id:1, name:1, borough:1, cuisine: 1, _id:0 } )


/*17-Escribe una consulta para encontrar los restaurantes cuáles pertenecen al Bronx y preparó cualquier plato Americano o chino*/

db.restaurants.find( {borough: { $eq: "Bronx" }, cuisine: { $in: ["American ", "Chinese"]}})


/*18-Escribe una consulta para encontrar el restaurante_id, name, borough y cuisine para aquellos restaurantes que pertenecen a Staten Island o Queens o Bronxor Brooklyn*/

db.restaurants.find({ $or: [{borough:"Staten Island"},{borough:"Queens"},{borough:"Bronx"}, {borough:"Brooklyn"}]},{_id:0, restaurant_id:1,name:1,borough:1,cuisine:1}) 


/*19-Escribe una consulta para encontrar el restaurante_id, name, borough y cuisine para aquellos restaurantes que no pertenecen a Staten Island o Queens o Bronxor Brooklyn*/

db.restaurants.find({ $nor: [{borough:"Staten Island"},{borough:"Queens"},{borough:"Bronx"}, {borough:"Brooklyn"}]},{_id:0, restaurant_id:1,name:1,borough:1,cuisine:1}) 


/*20-Escribe una consulta para encontrar el restaurante_id, name, borough y cuisine para aquellos restaurantes que consigan un marcador cuál no es más que 10*/

db.restaurants.find({ "grades.score": {$lte:10}},{_id:0, restaurant_id:1,name:1,borough:1,cuisine:1}) 


/*21-Escribe una consulta para encontrar el restaurante_id, name, borough y cuisine para aquellos restaurantes que preparan pescado excepto 'American' y 'Chinees' o el name del restaurante comienza con letras 'Wil'*/

db.restaurants.find({"$and":[{cuisine:{$eq:"Seafood"},},{cuisine:{$nin:["American ","Chinese"]}},{name:{$not:{$regex:"^Wil"}}}]},{restaurant_id:1,name:1,borough:1,cuisine:1,_id:0})


/*22-Escribe una consulta para encontrar el restaurant_id, name, y gradas para aquellos restaurantes que consigan un grado "A" y un score 11 en datos de estudio ISODate "2014-08-11T00:00:00Z"*/

db.restaurants.find({$and:[{"grades.date": ISODate("2014-08-11T00:00:00Z")},{"grades.grade": "A"},{"grades.score": 10}]},{restaurant_id:1, name:1, grades:1});
	

/*23-Escribe una consulta para encontrar el restaurante_id, name y gradas para aquellos restaurantes donde el 2º elemento de variedad de grados contiene un grado de "A" y marcador 9 sobre un ISODate "2014-08-11T00:00:00Z"*/

db.restaurants.find({$and:[{"grades.1.grade": "A"},{"grades.score": 9},{"grades.date": ISODate("2014-08-11T00:00:00Z")}]},{restaurant_id:1, name:1, grades:1});


/*24-Escribe una consulta para encontrar el restaurante_id, name, dirección y ubicación geográfica para aquellos restaurantes en los que el segundo elemento del array coord contiene un valor cuál es más que 42 y hasta 52*/

db.restaurants.find({"address.coord.1": {$gt: 42, $lt: 52 }}, {_id: 0, restaurant_id: "$restaurant_id", name: "$name", address: "$address", coord: "$coord"})


/*25-Escribe una consulta para organizar el nombre de los restaurantes en orden ascendente junto con todas las columnas*/

db.restaurants.find({}).sort({name:1})


/*26-Escribe una consulta para organizar el nombre de los restaurantes al descender junto con todas las columnas*/

db.restaurants.find({}).sort({name:-1})


/*27-Escribe una consulta a organizar el nombre de la cuisine en orden ascendente y por el mismo barrio de cuisine. Orden descendiendo*/

db.restaurants.find({}).sort({cuisine: 1, borough: -1})


/*28-Escribe una consulta para saber tanto si todas las direcciones contienen la calle o no*/

db.restaurants.find({"address.street": "" })


/*29-Escribe una consulta cuál seleccionará todos los documentos en la colección de restaurantes donde el valor del campo coord es Double*/

db.restaurants.find({"address.coord": { $type: "double" } })


/*30-Escribe una consulta cuál seleccionará el restaurant_id, name y grade para aquellos restaurantes qué retornos 0 como resto después de dividir el marcador por 7*/

db.restaurants.find({"grades.score": {$mod: [7, 0]}}, {_id: 0, restaurant_id: 1, name: 1, grades: 1})


/*31-Escribe una consulta para encontrar el name de restaurante, borough, longitud y altitud y cuisine para aquellos restaurantes que contienen 'mon' como tres letras en algún lugar de su name*/

db.restaurants.find({name:{"$regex":"mon"}}, {restaurant_id:1,name:1,borough:1,cuisine:1,_id:0})


/*32-Escribe una consulta para encontrar el name de restaurante, borough, longitud y latitud y cuisine para aquellos restaurantes que contienen 'Mad' como primeras tres letras de su name*/

db.restaurants.find({name:{"$regex":"^Mad"}},{restaurant_id:1,name:1,borough:1,cuisine:1,_id:0})

