import { Fragment } from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.css";
import {
  Container,
  Row,
  Col,
  Image,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";

import classes from "./Modal.module.css";

const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onClose} />;
};

const ModalOverlay = (props) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};

const portalElement = document.getElementById("overlays");

const Modal = (props) => {
  console.log(props.modalProduct);

  return (
    <Fragment>
      {ReactDOM.createPortal(
        <Backdrop onClick={props.onClose} />,
        portalElement
      )}
      {ReactDOM.createPortal(
        <ModalOverlay>
          <Row>
            <Col className="col-12 d-flex justify-content-center">
              <Image
                className={`d-block m-auto ${classes.icon}`}
                src={props.modalProduct.iconUrl}
              ></Image>
            </Col>
          </Row>

          <Row key={props.modalProduct.id} className="py-3">
            <Col className="col-8 d-flex flex-column justify-content-space">
              <Row>{props.modalProduct.title}</Row>
              <Row>${props.modalProduct.description}</Row>
              <Row>${props.modalProduct.price}</Row>
            </Col>
          </Row>
        </ModalOverlay>,
        portalElement
      )}
    </Fragment>
  );
};

export default Modal;

// <Row key={props.modalProduct.id} className="py-3">
// <Col className="col-8 d-flex flex-column justify-content-space">
//   <Row>{props.modalProduct.title}</Row>

//   <Row>${props.modalProduct.price}</Row>
// </Col>
// <Col className="col-4 ">
//   <Image
//     className={`d-block m-auto ${classes.icon}`}
//     src={props.modalProduct.iconUrl}
//   ></Image>
// </Col>
// </Row>
