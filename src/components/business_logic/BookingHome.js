import { useState, useRef } from "react";
import classes from "./BookingHome.module.css";
import Script from "react-load-script";
import SearchBar from "material-ui-search-bar";
import DatePicker from "react-datepicker";
import { Button } from "react-bootstrap";
import "react-datepicker/dist/react-datepicker.css";
import homePagePhoto from "../../assets/home-page-photo.png";
import Card from "../ui/Card";

function BookingHome(props) {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  function toggleViewCarOptions() {
    const request = {
      origins: [city],
      destinations: [city2],
      travelMode: google.maps.TravelMode.DRIVING,
      unitSystem: google.maps.UnitSystem.METRIC,
      avoidHighways: false,
      avoidTolls: false,
    };
    const service = new google.maps.DistanceMatrixService();
    service.getDistanceMatrix(request).then((response) => {
      const distanceKm = response.rows[0].elements[0].distance.text;
      console.log(distanceKm);
    });
  }

  const [query, setQuery] = useState("");
  const [city, setCity] = useState("");

  const autocompleteRef = useRef(null);

  const handleScriptLoad = () => {
    const options = {
      types: ["(cities)"],
    };

    /*global google*/

    autocompleteRef.current = new google.maps.places.Autocomplete(
      document.getElementById("autocomplete"),
      options
    );

    autocompleteRef.current.setFields([
      "address_components",
      "formatted_address",
      "geometry",
    ]);

    autocompleteRef.current.addListener("place_changed", handlePlaceSelect);
  };

  const handlePlaceSelect = () => {
    const addressObject = autocompleteRef.current.getPlace();
    const address = addressObject.address_components;

    if (address) {
      setCity(address[0].long_name);
      setQuery(addressObject.formatted_address);
    }
  };

  const [query2, setQuery2] = useState("");
  const [city2, setCity2] = useState("");

  const autocompleteRef2 = useRef(null);

  const handleScriptLoad2 = () => {
    const options = {
      types: ["(cities)"],
    };

    autocompleteRef2.current = new google.maps.places.Autocomplete(
      document.getElementById("autocomplete2"),
      options
    );

    autocompleteRef2.current.setFields([
      "address_components",
      "formatted_address",
    ]);

    autocompleteRef2.current.addListener("place_changed", handlePlaceSelect2);
  };

  const handlePlaceSelect2 = () => {
    const addressObject2 = autocompleteRef2.current.getPlace();
    const address2 = addressObject2.address_components;

    if (address2) {
      setCity2(address2[0].long_name);
      setQuery2(addressObject2.formatted_address);
    }
  };

  return (
    <ul className={classes.list}>
      <li className={classes.item}>
        <Card>
          <div className={classes.image}>
            <img src={homePagePhoto} alt="" />
          </div>
          <div className={classes.content}>
            <Script
              url="https://maps.googleapis.com/maps/api/js?key=AIzaSyCMqs7ZWIH5S8wW_1LkzE_z4bqhNOIVidk&libraries=places"
              onLoad={handleScriptLoad}
            />

            <SearchBar
              id="autocomplete"
              placeholder="Choose source city"
              value={query}
              hintText="Search City"
            />

            <br />
            <br />

            <Script
              url="https://maps.googleapis.com/maps/api/js?key=AIzaSyCMqs7ZWIH5S8wW_1LkzE_z4bqhNOIVidk&libraries=places"
              onLoad={handleScriptLoad2}
            />
            <SearchBar
              id="autocomplete2"
              placeholder="Choose destination city"
              value={query2}
              hintText="Search City"
            />
            <br />
            <br />

            <DatePicker
              placeholderText={
                startDate ? startDate.toDateString() : "Select start date"
              }
              wrapperClassName={classes.datepicker}
              onChange={(date) => setStartDate(date)}
            />
            <br />
            <br />
            <br />

            <DatePicker
              placeholderText={
                endDate ? endDate.toDateString() : "Select end date"
              }
              wrapperClassName={classes.datepicker}
              onChange={(date) => setEndDate(date)}
            />
          </div>

          <br />
          <br />

          <div className="d-grid gap-2">
            <Button variant="primary" type="Submit">
              Book Now
            </Button>
          </div>
        </Card>
      </li>
    </ul>
  );
}

export default BookingHome;
