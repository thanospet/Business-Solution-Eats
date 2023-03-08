import React from "react";
import { useContext, useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./FormAddress.module.css";
import "bootstrap/dist/css/bootstrap.css";
import CartContext from "../../store/cart-context";
import axios from "axios";
import {
  Row,
  Col,
  Form,
  FormControl,
  Button,
  FormLabel,
} from "react-bootstrap";
import LoaderSpinner from "../spinners/Spinner";
import toast, { Toaster } from "react-hot-toast";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import AuthContext from "../../store/auth-context";

//MAZI ME GOOGLE MAPS

const FormAddress = (props, apiKey) => {
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);
  const [address, setAddress] = useState("");
  const mapRef = useRef(null);
  const authCtx = useContext(AuthContext);
  const cartCtx = useContext(CartContext);
  const [payment, setPayment] = useState();
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [paymentTitle, setPaymentTitle] = useState("Payment Method");
  const [floor, setFloor] = useState("");
  const [doorbell, setDoorbell] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [friendlyName, setFriendlyName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [show, setShow] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [isAddressValid, setIsAddressValid] = useState(false);
  const [isFloorValid, setIsFloorValid] = useState(false);
  const [isDoorbellValid, setIsDoorbellValid] = useState(false);
  const [apiLoaded, setApiLoaded] = useState(false);
  const navigate = useNavigate();
  const navigateHome = () => {
    console.log("KALESTIKA navigateHome");
    navigate("/");
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyB6JRXqRrT7Xa8d4UQIIMWIh5vvrRpNlk8`;
    script.onload = () => {
      const map = new window.google.maps.Map(mapRef.current, {
        center: { lat: 40.94166970175866, lng: 24.414645635986343 },
        zoom: 13,
      });
      const marker = new window.google.maps.Marker({
        position: { lat: 40.94166970175866, lng: 24.414645635986343 },
        map: map,
        draggable: true,
      });
      setMap(map);
      setMarker(marker);
    };
    document.body.appendChild(script);
  }, [apiKey]);

  // Update the marker's position when it's dragged
  useEffect(() => {
    if (marker) {
      const listener = marker.addListener("dragend", () => {
        const position = marker.getPosition();

        const geocoder = new window.google.maps.Geocoder();
        geocoder.geocode({ location: position }, (results, status) => {
          if (status === "OK") {
            setAddress(results[0].formatted_address);
            console.log(results[0].formatted_address);
          } else {
            console.error("Geocode failed due to: " + status);
          }
        });

        console.log(position.lat(), position.lng());
      });
      return () => {
        window.google.maps.event.removeListener(listener);
      };
    }
  }, [marker]);

  const parts = address.split(/(\d+\s*,?\s*\d{0,3})/); // split by one or more digits, optionally followed by whitespace and more digits
  const formattedParts = parts
    .map((part) => part.trim())
    .filter((part) => part !== ""); // remove leading/trailing whitespace and empty parts
  console.log("formattedParts", formattedParts); // output: ["Ptolemeou", "46", "Kavala", "653 02", "Greece"]

  //-----------------------------------------------------------------------------------------------------------------------------------------

  const pattern = /^[0-9a-zA-Z]*$/;
  const link = "http://localhost:7160";

  const allitems = cartCtx.items;
  // console.log("allitems", allitems);
  // console.log("address", address);

  useEffect(() => {
    axios
      .get(`${link}/api/Store/code-info/1`)
      .then(function (res) {
        const methodsArray = res.data.item.paymentMethods;
        setPaymentMethods(methodsArray);
        // console.log("res.data.item", res.data.item.paymentMethods);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const handleChangeFloor = (event) => {
    if (!isNaN(event.target.value) && event.target.value < 100) {
      setFloor(event.target.value);
      setIsFloorValid(event.target.value.length > 0);
    }
  };

  const handleGoogleAddress = (event) => {
    setAddress(event.target.value);
    if (map && apiLoaded && window.google.maps.places) {
      const autocomplete = new window.google.maps.places.Autocomplete(
        event.target,
        { types: ["address"] }
      );
      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();
        setAddress(place.formatted_address);
        map.setCenter(place.geometry.location);
        marker.setPosition(place.geometry.location);
      });
    }
  };

  const handleChangeDoorbell = (event) => {
    if (pattern.test(event.target.value) && event.target.value.length < 31) {
      setDoorbell(event.target.value);
      setIsDoorbellValid(event.target.value.length > 0);
    }
  };
  const handleChangeNotes = (event) => {
    if (event.target.value.length < 100) setFriendlyName(event.target.value);
  };

  useEffect(() => {
    if (
      // isAddressValid &&
      isFloorValid &&
      isDoorbellValid
    ) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [isFloorValid, isDoorbellValid, , phoneNumber]);

  const resetFields = () => {
    setFloor("");
    setDoorbell("");
    setPhoneNumber("");
    setFriendlyName("");
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    resetFields();
    setShow(true);
    setIsSubmitting(true);

    props.onCloseModal();

    try {
      const token = authCtx.authToken;

      const payload = {
        floor: floor,
        doorBellName: doorbell,
        streetName: formattedParts[0],
        friendlyName: friendlyName,
        city: formattedParts[2],
        postalCode: formattedParts[3].replace(" ", ""),
      };

      const res = await axios.post(
        "http://localhost:7160/api/Address/address",
        payload,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("RESPONSE FROM FORM ADDRESS POST", res.data.item);
    } catch (error) {
      console.error(error);
      setIsSubmitting(false);
    }
    props.onNavigateHome();
    setIsSubmitting(false);
    toast("Address Successfull!", {
      type: "success",
    });
  };

  return (
    <>
      {isSubmitting && <LoaderSpinner />}
      <div
        style={{
          width: "100%",
          height: "400px",
          border: "2px solid black",
          borderRadius: "5px",
        }}
        ref={mapRef}
      ></div>
      <Form onSubmit={submitHandler}>
        <Row>
          <Col className="col-12 p-2">
            <Form className={classes.text}>
              <FormLabel className=" px-1 fw-bold">Address Name</FormLabel>
              <FormControl
                id="address-input"
                onChange={handleGoogleAddress}
                value={address}
                type="text"
              />
            </Form>
          </Col>
          <Col className="col-12 p-2"></Col>
          <Col className="col-12 py-1">
            <Form className={classes.text}>
              <FormLabel className=" px-1 fw-bold">Floor</FormLabel>
              <FormControl
                onChange={handleChangeFloor}
                value={floor}
                type="text"
                placeholder="e.g: 2"
              />
            </Form>
            <Form className={classes.text}>
              <FormLabel className=" px-1 fw-bold">DoorBell</FormLabel>
              <FormControl
                onChange={handleChangeDoorbell}
                value={doorbell}
                type="text"
                placeholder="e.g: Papadopoulos"
              />
            </Form>
            <Form className={classes.textNotes}>
              <FormLabel className=" px-1 fw-bold">Friendly Name</FormLabel>
              <FormControl
                onChange={handleChangeNotes}
                value={friendlyName}
                type="text"
                placeholder="Gatospito"
              />
            </Form>
            <Button
              disabled={!isFormValid}
              type="submit"
              className="my-3"
              variant="warning"
            >
              Add address
            </Button>{" "}
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default FormAddress;
