import { Row } from "react-bootstrap";
import NavbarProject from "../component/Navbar";
import CardHistory from "../component/CardHistory/CardHistory";

function History() {
  return (
    <>
      <NavbarProject />
      <section className="container">
        <Row className="pt-5">
          <CardHistory />
        </Row>
      </section>
    </>
  );
}
export default History;
