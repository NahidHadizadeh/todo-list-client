import useAllMembers from "../hooks/AllMembers/useAllMembers";
import MemberIconComponent from "./MemberIconComponent";

function MembersIcon() {
  const AllMembers = useAllMembers().AllMembers;
  return (
    <div className="listOfMembers">
      {AllMembers?.map((member) => {
        if (!member.admin) return <MemberIconComponent member={member} />;
      })}
    </div>
  );
}

export default MembersIcon;
