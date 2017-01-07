//model
var Model = [
{
  name: 'Vadakkumnathan Shiva Temple',
  address: 'Thekkinkadu Maidan,Thrissur',
  location: {lat: 10.524327, lng: 76.214459},
  pincode: 680001
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
      zoom : 13,


      });
       ko.applyBindings(new ViewModel());

     }

     var markers = [];

     //view model
     var ViewModel = function() {

        var self = this;
        self.filter = ko.observable('');
        self.locationitems = ko.observableArray(Model);
        self.search = ko.computed(function() {
      var filter = self.filter().toLowerCase();
        if (!filter) {
       return self.locationitems();
       } else {
       return ko.utils.arrayFilter(self.locationitems(), function(item) {
        //return stringStartsWith(id.name.toLowerCase(), filter);

        var place = item.name.toLowerCase().indexOf(filter)!==-1;

         if (place) {
                if (item.marker) {
                    item.marker.setVisible(place); // toggle visibility of the marker
                }

            }
                       // place.markers.setVisible(name);

                return place;
      });
    }

     },self);

        self.searchplaces = ko.observableArray();

        self.locationitems().forEach(function(place) {
    self.searchplaces.push(place);
  });

        self.clickonsearchplaces = function(place) {
       google.maps.event.trigger(place.marker, 'click');
  };




         var largeInfowindow = new google.maps.InfoWindow();
         var bounds = new google.maps.LatLngBounds();
         var defaultIcon = makeMarkerIcon('0091ff');
         var highlightedIcon = makeMarkerIcon('FFFF24');
         for (i = 0; i < Model.length; i++) {

            var position = Model[i].location;
            var title = Model[i].name;
            Model[i].marker = marker;
            var marker = new google.maps.Marker ({
                map: map,
                position: position,
                title: title,
                animation: google.maps.Animation.DROP,
                id: i

   });
            Model[i].marker = marker;
            markers.push(marker);
            marker.addListener('click', function() {

            populateInfoWindow(this, largeInfowindow);

        });
            marker.addListener('mouseover', function() {
            this.setIcon(highlightedIcon);
          });
          marker.addListener('mouseout', function() {
            this.setIcon(defaultIcon);
          });

            bounds.extend(markers[i].position);
        }
         map.fitBounds(bounds);

        function populateInfoWindow(marker, infowindow) {
          if (infowindow.marker != marker) {
          infowindow.marker = marker;
          infowindow.setContent('<div>' + marker.title + '</div>');
          infowindow.open(map, marker);
          // Make sure the marker property is cleared if the infowindow is closed.
          infowindow.addListener('closeclick',function(){
            infowindow.Marker(null);
          });

           var streetViewService = new google.maps.StreetViewService();
          var radius = 50;
          // In case the status is OK, which means the pano was found, compute the
          // position of the streetview image, then calculate the heading, then get a
          // panorama from that and set the options
          function getStreetView(data, status) {
            if (status == google.maps.StreetViewStatus.OK) {
              var nearStreetViewLocation = data.location.latLng;
              var heading = google.maps.geometry.spherical.computeHeading(
                nearStreetViewLocation, marker.position);
                infowindow.setContent('<div>' + marker.title + '</div><div id="pano"></div>');
                var panoramaOptions = {
                  position: nearStreetViewLocation,
                  pov: {
                    heading: heading,
                    pitch: 30
                  }
                };
              var panorama = new google.maps.StreetViewPanorama(
                document.getElementById('pano'), panoramaOptions);
            } else {
              infowindow.setContent('<div>' + marker.title + '</div>' +
                '<div>No Street View Found</div>');
            }
          }
          // Use streetview service to get the closest streetview image within
          // 50 meters of the markers position
          streetViewService.getPanoramaByLocation(marker.position, radius, getStreetView);
          // Open the infowindow on the correct marker.
          infowindow.open(map, marker);
        }
      }





          function makeMarkerIcon(markerColor) {
        var markerImage = new google.maps.MarkerImage(
          'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|'+ markerColor +
          '|40|_|%E2%80%A2',
          new google.maps.Size(21, 34),
          new google.maps.Point(0, 0),
          new google.maps.Point(10, 34),
          new google.maps.Size(21,34));
        return markerImage;
      };





     };

