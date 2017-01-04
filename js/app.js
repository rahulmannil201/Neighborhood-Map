//model
var Model = [
{
  name: 'Vadakkumnathan Shiva Temple',
  address: 'Thekkinkadu Maidan,Thrissur',
  location: {lat: 10.524327, lng: 76.214459},
  pincode: 680001
},{
  name: 'Athirappilly Water Falls',
  address: 'Pariyaram, Thrissur',
  location: {lat: 10.285107,lng: 76.569764},
  pincode: 680724
},{
  name: 'Guruvayur Temple',
  address: 'East Nada, Guruvayur',
  location: {lat: 10.594552, lng: 76.039359},
  pincode: 680101
},{
  name: 'Sakthan Thampuran Palace',
  address: 'Stadium Rd, Chembukkav, Thrissur',
  location: {lat: 10.531252, lng: 76.21587},
  pincode: 680020
},{
  name: 'Bible Tower',
  address: 'Erinjeri Angadi, Latin Church Rd, Erinjeri, Thrissur',
  location: {lat: 10.521002, lng: 76.21855},
  pincode: 680001
},{
  name: ' Paramekkavu Temple',
  address: 'Round East, Keerankulangara, Thrissur ',
  location: {lat: 11.934935, lng: 79.8286153},
  pincode: 680001
},{
  name: 'Thrissur Railway Station',
  address: 'Thrisur, R.S Road, Veliyannur, Thrissur',
  location: {lat: 10.514077, lng: 76.207648},
  zipcode: 680021
},{
  name: 'Sakthan private bus stand',
  address: 'Kokkala,Thrissur',
  location: {lat: 10.514818, lng: 76.214957},
  zipcode: 680021
}];


var map;


     //  function to initialize the map
     function initMap() {
       //creating a new map JS object.
      map = new google.maps.Map(document.getElementById('map'),  {
      center: {lat: 10.527642 , lng: 76.214435},
      zoom : 13

      });

     }

     var markers = [];

     //view model
     var ViewModel = function() {
         var largeInfowindow = new google.maps.InfoWindow();
         for (i = 0; i < Model.length; i++) {

            var position = Model[i].location;
            var title = Model[i].name;
            var marker = new google.maps.Marker ({
                map: map,
                position: position,
                title: title,
                animation: google.maps.Animation.DROP,
                id: i
   });
            markers.push(marker);
            marker.addListener('click', function() {

            populateInfoWindow(this, largeInfowindow);

        });
        }

        function populateInfoWindow(marker, infowindow) {
          if (infowindow.marker != marker) {
          infowindow.marker = marker;
          infowindow.setContent('<div>' + marker.title + '</div>');
          infowindow.open(map, marker);
          // Make sure the marker property is cleared if the infowindow is closed.
          infowindow.addListener('closeclick',function(){
            infowindow.setMarker(null);
          });
        }
      }




     };
