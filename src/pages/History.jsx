import { Col, Row } from "react-bootstrap";
import NavbarProject from "../component/Navbar";
import useAllHistory from "../hooks/AllHistory/useAllHistory";
import CardHistory from "../component/CardHistory/CardHistory";

function History() {
  // const AllChangeData = useAllChanging().AllChanging;
  const AllHistory = useAllHistory().AllHistory;
  console.log(AllHistory);
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
