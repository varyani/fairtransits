import { useRef, useState, useEffect } from "react";
import Card from "../ui/Card";
import classes from "./DriverDetails.module.css";
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";
import Script from "react-load-script";
import SearchBar from "material-ui-search-bar";
import { useNavigate } from "react-router-dom";
import { useUserAuth } from "../../context/UserAuthContext";
import { db } from "../../firebase";
import { query, ref, equalTo, orderByChild, get } from "firebase/database";

function DriverDetails() {
  const carTypeInputRef = useRef();
  const maxRadiusInputRef = useRef();
  const { user } = useUserAuth();
  const [driverAdd, setDriverAdd] = useState(0);

  function submitHandler(event) {
    event.preventDefault();

    const enteredcarType = carTypeInputRef.current.value;
    const enteredhomeCity = query1;
    const enteredmaxRadius = maxRadiusInputRef.current.value;

    const driveData = {
      user: user.email,
      carType: enteredcarType,
      homeCity: enteredhomeCity,
      maxRadius: enteredmaxRadius,
      date: new Date().toLocaleDateString("en-GB"),
    };
    fetch("https://fairtransits-default-rtdb.firebaseio.com/driver.json", {
      method: "POST",
      body: JSON.stringify(driveData),
      headers: {
        "Content-Type": "application/json",
      },
    }).then(() => {
      async function checkData() {
        const dbRef = ref(db, "/driver");
        const queryConstraints = [orderByChild("user"), equalTo(user.email)];
        const dataSnapshot = await get(query(dbRef, ...queryConstraints));
        const data = dataSnapshot.val();
        setLoadedMeetups(data);
      }
      checkData();
    });
  }

  const [query1, setQuery1] = useState("");
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
      setQuery1(addressObject.formatted_address);
    }
  };

  const [isLoading, setIsLoading] = useState(true);
  const [loadedMeetups, setLoadedMeetups] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    async function checkData() {
      const dbRef = ref(db, "/driver");
      const queryConstraints = [orderByChild("user"), equalTo(user.email)];
      const dataSnapshot = await get(query(dbRef, ...queryConstraints));
      const data = dataSnapshot.val();
      setLoadedMeetups(data);
    }
    checkData();
    setIsLoading(false);
  }, [user.email, driverAdd]);
  const result_data = loadedMeetups;
  const JsonData = [];
  for (const key in result_data) {
    JsonData.push(result_data[key]);
  }

  const DisplayData = JsonData.map((info) => {
    return (
      <tr>
        <td>{info.carType}</td>
        <td>{info.homeCity}</td>
        <td>{info.maxRadius}</td>
        <td>{info.date}</td>
      </tr>
    );
  });

  console.log(DisplayData);

  if (isLoading) {
    return (
      <section>
        <p>Loading...</p>
      </section>
    );
  }

  return (
    <Card>
      <form className={classes.form}>
        <select id="cars" name="cars" ref={carTypeInputRef}>
          <option value="hatchback">Choose car type</option>
          <option value="hatchback">HATCHBACK: Swift, Indica </option>
          <option value="sedan">SEDAN: Dzire, Etios</option>
          <option value="suv">SUV: Ertiga, Innova</option>
        </select>

        <br />
        <br />

        <Script
          url="https://maps.googleapis.com/maps/api/js?key=AIzaSyCMqs7ZWIH5S8wW_1LkzE_z4bqhNOIVidk&libraries=places"
          onLoad={handleScriptLoad}
        />

        <SearchBar
          id="autocomplete"
          placeholder="Choose home city"
          value={query1}
          hintText="Search City"
        />

        <br />

        <input
          className={classes.kmrange}
          type="number"
          placeholder="maximum service radius (in km)"
          ref={maxRadiusInputRef}
        ></input>
        <br />
        <br />
        <br />

        <div className="d-grid gap-2" onClick={submitHandler}>
          <Button variant="primary" type="Submit">
            Update car details
          </Button>
        </div>

        <table className={"table table-striped " + classes.tablestyle}>
          <thead>
            <tr>
              <th>Car Type</th>
              <th>Home City</th>
              <th>Maximum Service Radius</th>
              <th>Date Added</th>
            </tr>
          </thead>
          <tbody>{DisplayData}</tbody>
        </table>

        {/* <div className="d-grid gap-2">
          <Button
            variant="primary"
            type="Submit"
            onClick={(e) => {
              e.preventDefault();
              setDriverAdd((c) => c + 1);
            }}
          >
            Reload saved data
          </Button>
        </div> */}
        <br />
        <br />
        <br />
        <br />
      </form>
    </Card>
  );
}

export default DriverDetails;
