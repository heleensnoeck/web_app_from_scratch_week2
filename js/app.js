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
			// Wanneer er zich geen hash bevind in de url, laat routie de hash naar home zetten
			if (!window.location.hash) {
				routie('home')
			};
		}
	};

	var weatherApp = {
		weatherObject: [],
		init: function() {

			// variable 
			// var placeMorning = document.getElementById('weather_time'); 
			// var placeDiscription = document.getElementById('weather_discription');
			// var placeWind = document.getElementById('weather_wind');

			nanoajax.ajax({url:'http://api.openweathermap.org/data/2.5/forecast/daily?id=524901&appid=d55e532e359ca4e0b28bc4cf0ae34bce&units=metric'
			}, function (status, data) { 
				
				var data = data;
				
				var jsonData = JSON.parse(data);

				// var render = {
				// 	    data_.filter(function(out) {
				// 		return out
				// 	}
				// }

				// var render = data.filter(function(out){
				// 	return out
				// })
				
				// console.log(render);

				// var goodImages = this.searchResults.Search.filter(function(out) { 
				//     return out.Poster != 'N/A'; 
				// })	

				var content = {        
				      morning: jsonData.list[0].temp.morn,
				      day: jsonData.list[0].temp.day,
				      evening: jsonData.list[0].temp.night,
				      night: jsonData.list[0].temp.eve,
				      
				      weatherDiscription: jsonData.list[0].weather[0].main,
				      
				      wind: jsonData.list[0].speed,
				      humidity: jsonData.list[0].humidity
				}
				// Make the data the weatherObject
				weatherApp.weatherObject = content;
				// Render your content
				weatherApp.render();

		      // placeMorning.innerHTML = content.morning + '° C';
		      // placeDiscription.innerHTML = content.weatherDiscription;
		      // placeWind.innerHTML = 'E' + '' + content.wind + '' + 'mph';

				
		})

		}, 
		render: function() {
			// Render the content from the weatherObject
			var placeMorning = {
			    weather_time:  this.weatherObject.morning + '° C',
			    weather_discription: this.weatherObject.weatherDiscription,
			    weather_wind: 'E' + '' + this.weatherObject.wind + '' + 'mph'
			  };

			  Transparency.render(document.getElementById('weather'), placeMorning);
		}
	}	      
	// start the main app
	app.init();

})();