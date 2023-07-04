import React from "react";

export default function MemberIconComponent({ member }) {
  return (
    <div
      title={member.name}
      key={member._id + "memberr"}
      className={"displayImage memberImage "
        .concat(" bgColor")
        .concat(
          member.bgColor ? member.bgColor : Math.floor(Math.random() * 7) + 1
        )}
    >
      {/* ---------------------- get first char of first name and lastname ,and show those */}
      {member.name.includes(" ")
        ? member.name.slice(0, 1).toUpperCase() +
          member.name
            .slice(member.name.indexOf(" ") + 1, member.name.indexOf(" ") + 2)
            .toUpperCase()
        : member.name.slice(0, 2).toUpperCase()}
    </div>
  );
}
