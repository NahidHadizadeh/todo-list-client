import useAllHistory from "../../hooks/AllHistory/useAllHistory";
import "./cardHistory.css";
import { Card } from "react-bootstrap";

function CardHistory() {
  const AllHistory = useAllHistory().AllHistory;
  if (AllHistory) {
    return (
      <>
        {AllHistory?.map((history, index) => {
          return (
            <Card key={index + "history"} className="card-history">
              <p>
                the task<span> {history?.newTodo?.title} </span>has been
                <span> {history?.title} </span> by the
                <span> {history?.newTodo?.manager} </span> at
                <span> {history?.newTodo?.updatedOn}</span>
              </p>
            </Card>
          );
        })}
      </>
    );
  } else {
    console.log("first");
    return "network error";
  }
}
export default CardHistory;
