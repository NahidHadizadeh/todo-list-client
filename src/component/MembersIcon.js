import { Spinner } from "react-bootstrap";
import useAllMembers from "../hooks/AllMembers/useAllMembers";
import MemberIconComponent from "./MemberIconComponent";

function MembersIcon() {
  const AllMembers = useAllMembers().AllMembers;
  return (
    <div className="listOfMembers" key={Math.floor(Math.random() * 100000)}>
      {AllMembers?.length > 0 ? (
        AllMembers?.map((member) => {
          if (!member.admin) return <MemberIconComponent member={member} />;
        })
      ) : (
        <>
          <Spinner
            className="spinnerClass3"
            animation="grow"
            variant="secondary"
          />

          <Spinner
            className="spinnerClass2"
            animation="grow"
            variant="secondary"
          />

          <Spinner
            className="spinnerClass3"
            animation="grow"
            variant="secondary"
          />
        </>
      )}
    </div>
  );
}

export default MembersIcon;
