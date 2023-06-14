import useAllMembers from "../hooks/AllMembers/useAllMembers";

function MembersIcon() {
  const AllMembers = useAllMembers().AllMembers;
  return (
    <div className="listOfMembers">
      {AllMembers?.map((member, index) => {
        if (!member.admin)
          return (
            <div
              key={index}
              className={
                "displayImage memberImage " +
                "bgColor" +
                (Math.floor(Math.random() * 7) + 1)
              }
            >
              {/* ---------------------- get first char of first name and lastname ,and show those */}
              {member.name.includes(" ")
                ? member.name.slice(0, 1).toUpperCase() +
                  member.name
                    .slice(
                      member.name.indexOf(" ") + 1,
                      member.name.indexOf(" ") + 2
                    )
                    .toUpperCase()
                : member.name.slice(0, 2).toUpperCase()}
              {/* {member.name.slice(0, 2).toUpperCase()} */}

              {/* <img
        src="/client/public/user.png"
        alt={member.title}
        title={member.title}
      /> */}
              {/* <FaUserCircle /> */}
            </div>
          );
      })}
    </div>
  );
}

export default MembersIcon;
