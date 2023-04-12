import useAllHistory from "../../hooks/AllHistory/useAllHistory";
import "./cardHistory.css";
import { Card } from "react-bootstrap";

function CardHistory() {
  const AllHistory = useAllHistory().AllHistory;
  return (
    <>
      {AllHistory?.map((history) => {
        // const { title, newTodo } = history;
        console.log(history.newTodo);
        return (
          <Card
            key={history?.title + history?.newTodo?._id + "history"}
            className="card-history"
          >
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
}
export default CardHistory;
