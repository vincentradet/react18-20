import styles from "./ProfessionalTitle.module.scss";
import Accordion from "react-bootstrap/Accordion";
export function ProfessionalTitle() {
  return (
    <div className={`card ${styles.container}`}>
      <div className={`${styles.imgcontainer}`}>
        <img
          src="../../ProfessionalTitle/vrt.jpg"
          className="card-img-top"
          alt="..."
        ></img>
      </div>
      <div className="card-body">
        <div className={`${styles.imgcontainer}`}>
          <h5 className="card-title">Product Manager</h5>
          <h6 className="card-subtitle mb-2 text-body-secondary">
            Rayonnance technologie
          </h6>
        </div>
        <p className="card-text">
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </p>
        <Accordion defaultActiveKey="0" flush>
          <Accordion.Item eventKey="0">
            <Accordion.Header>Accordion Item #1</Accordion.Header>
            <Accordion.Body>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>Accordion Item #2</Accordion.Header>
            <Accordion.Body>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>
    </div>
  );
}
