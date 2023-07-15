// import { deleteHistoryAPI } from "../../API/historyAPI";
import useAllHistory from "../../hooks/AllHistory/useAllHistory";
import "./cardHistory.css";
import { Card } from "react-bootstrap";

// const handleDelete = async (history) => {
//   console.log(history);
//   deleteHistoryAPI(history._id);
// };
function CardHistory() {
  const AllHistory = useAllHistory().AllHistory;
  if (AllHistory) {
    return (
      <>
        {AllHistory?.map((history, index) => {
          return (
            <Card
              key={index + "history"}
              className="card-history"
              // onClick={(e) => {
              //   handleDelete(history);
              // }}
            >
              <p>
                the task<span> {history?.newTodo?.title} </span>has been
                <span> {history?.title} </span> at
                <span> {history?.newTodo?.updatedOn}</span>
              </p>
            </Card>
          );
        })}
      </>
    );
  } else {
    return "network error";
  }
}
export default CardHistory;
