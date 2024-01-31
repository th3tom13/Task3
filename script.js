require([
  "esri/Map",
  "esri/layers/CSVLayer",
  "esri/views/MapView",
  "esri/config",
  "esri/core/urlUtils",
  "dojo/domReady!"
], function (
  Map,
  CSVLayer,
  MapView,
  esriConfig,
  urlUtils
) {
  // If CSV files are not on the same domain as your website, a CORS enabled server
  // or a proxy is required.
  var url = "https://raw.githubusercontent.com/orhuna/WebGIS_SLU_M1/main/Module%202/stl_crime_wgs_84.csv";
  esriConfig.request.corsEnabledServers.push('https://rawgit.com');

  const template = {
    title: "Crime committed at {ILEADSStreet}"
  };

  const renderer = {
    type: "heatmap",
    colorStops: [
      { color: "rgba(255, 255, 255, 0)", ratio: 0 },
      { color: "#fee08b", ratio: 0.1 },
      { color: "#d73027", ratio: 0.5 },
      { color: "#4575b4", ratio: 0.9 }
    ],
    maxDensity: 100,
    minDensity: 10
  };

  const layer = new CSVLayer({
    url: url,
    title: "St. Louis Crime Heatmap",
    copyright: "St. Louis Police Department",
    latitudeField: "Latitude",
    longitudeField: "Longitude",
    popupTemplate: template,
    renderer: renderer
  });

  var map = new Map({
    basemap: "gray",
    layers: [layer]
  });

  var view = new MapView({
    container: "viewDiv",
    center: [-90.2269929, 38.6213622],
    zoom: 11,
    map: map,
  });
});