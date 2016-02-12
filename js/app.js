//NOTE: Got the templateing idea from Martijn Nieuwenhuizen en Dylan Vens

(function() {
	'use strict';

	var main = document.querySelector('main');

	var app = {
		init: function() {

			// call the routes.init
			routes.init();
			weatherApp.init();

		}
	};

	// gaat naar bepaalde routes. 
	var routes = {
		init: function() {
			routie({
			    'home': function() {
			    	// console.log('home');
			    	main.innerHTML = document.querySelector('#home').innerHTML;
			    },
			    'best-practices': function() {
			    	main.innerHTML = document.querySelector('#best-practices').innerHTML;
			    }
			});
		}
	};

	var weatherApp = {

		init: function() {

			nanoajax.ajax({url:'http://api.openweathermap.org/data/2.5/forecast/daily?id=524901&appid=d55e532e359ca4e0b28bc4cf0ae34bce&units=metric'
			}, function (status, data) { 				
				var jsonData = JSON.parse(data);

				console.log(jsonData);

				// geholpen door casper
				// map loopt over the data en haal met pick alleen de nieuwe content eruit en slaat dit op 
				var filteredData = _.map(jsonData, function(value){
					return _.pick(value, 'clouds', 'temp');
				});

				console.log(filteredData);

				// for.each

				var content = {        
				      morning: jsonData.list[0].temp.morn,
				      day: jsonData.list[0].temp.day,
				      evening: jsonData.list[0].temp.eve,
				      night: jsonData.list[0].temp.night,
				      
				      weatherDiscription: jsonData.list[0].weather[0].main,
				      
				      wind: jsonData.list[0].speed,
				      humidity: jsonData.list[0].humidity
				}

				// console.log(content.morning);

				// Transparentie pakt de divs uit de html en plaatst de content erin
				  var placeMorning = {
				    weather_time:  content.morning + '° C',
				    weather_discription: content.weatherDiscription,
				    weather_wind: 'Wind:' + ' ' + 'N' + ' ' + content.wind + ' ' + 'mph',
				    weather_humidity: 'Humidity:' + ' ' + content.humidity 
				  };

				  var placeDay = {
				    weather_time:  content.day + '° C',
				    weather_discription: content.weatherDiscription,
				    weather_wind: 'Wind:' + ' ' + 'N' + ' ' + content.wind + ' ' + 'mph',
				    weather_humidity: 'Humidity:' + ' ' + content.humidity
				  };

				  var placeEvening = {
				    weather_time:  content.evening + '° C',
				    weather_discription: content.weatherDiscription,
				    weather_wind: 'Wind:' + ' ' + 'E' + ' ' + content.wind + ' ' + 'mph',
				    weather_humidity: 'Humidity:' + ' ' + content.humidity
				  };

				  var placeNight = {
				    weather_time:  content.night + '° C',
				    weather_discription: content.weatherDiscription,
				    weather_wind: 'Wind:' + ' ' + 'E' + ' ' + content.wind + ' ' + 'mph',
				    weather_humidity: 'Humidity:' + ' ' + content.humidity
				  };

			  Transparency.render(document.getElementById('weather_morning'), placeMorning);
			  Transparency.render(document.getElementById('weather_day'), placeDay);
			  Transparency.render(document.getElementById('weather_evening'), placeEvening);
			  Transparency.render(document.getElementById('weather_night'), placeNight);			
		
		})

		}
	}	      
	// start the main app 
	app.init();

})();
