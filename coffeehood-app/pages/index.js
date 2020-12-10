import Head from "next/head";
import Display from "../components/Display.js";
import styles from "../styles/Home.module.css";
import { useState, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";

export default function Home() {
  const [lat, setLat] = useState(40.7228);
  const [long, setLong] = useState(-74.006);
  const [zoom, setZoom] = useState(12);

  const [allLocations, setAllLocations] = useState([]);

  useEffect(() => {
    mapboxgl.accessToken =
      "pk.eyJ1IjoicnktdGhvcm50b24iLCJhIjoiY2szN2hrMWU2MDNrajNjbnVlYzA1cGVoeSJ9.3quDBtJRLxfhmm_QXK8OHQ";
    const map = new mapboxgl.Map({
      container: "mapContainer",
      style: "mapbox://styles/mapbox/streets-v11",
      center: [long, lat],
      zoom: zoom,
    });
  });

  let searchCoffee = () => {
    fetch(`https://developers.zomato.com/api/v2.1/search?entity_id=280&entity_type=city&establishment_type=286&lat=${lat}&lon=${long}&sort=real_distance&apikey=d867fa503de492da9df396f5f2fbb9c6`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data)
      let searchResults = data.restaurants
      setAllLocations(searchResults)
    })
    .catch(error => console.log(error))
  }

  let search = (location) => {
    searchCoffee()
    fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?access_token=pk.eyJ1Ijoic2VhcmNoLW1hY2hpbmUtdXNlci0xIiwiYSI6ImNrN2Y1Nmp4YjB3aG4zZ253YnJoY21kbzkifQ.JM5ZeqwEEm-Tonrk5wOOMw&cachebuster=1607636381091&autocomplete=true&country=us&proximity=-74.0060%2C%2040.7128&limit=7`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        let searchResults = data.features
        let filteredResults = searchResults.filter(result => {
          return result.properties.category.includes('coffee')
        })
        setAllLocations(filteredResults)
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <Head>
        <title>CoffeeHood App</title>
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bulma@0.9.1/css/bulma.min.css"
        />
        <link
          href="https://api.mapbox.com/mapbox-gl-js/v2.0.0/mapbox-gl.css"
          rel="stylesheet"
        />
      </Head>
      <div className="content container">
        <Display search={search} />
        <br />
        <div id="mapContainer" />
      </div>
    </div>
  );
}
