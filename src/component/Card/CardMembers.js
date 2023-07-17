import { Row, Spinner } from "react-bootstrap";
import "./cardMembers.css";
import useAllMembers from "../../hooks/AllMembers/useAllMembers";
import useAllTasks from "../../hooks/AllTasks/useAllTasks";
import { useState, useEffect } from "react";
import useSearchMember from "../../hooks/SearchMember/useSearchMember";
import { FaUserCircle, FaStar } from "react-icons/fa";

function CardMembers() {
  const searchName = useSearchMember().SearchName;
  const AllTasks = useAllTasks().AllTasks;
  const allMembers = useAllMembers().AllMembers;
  const [AllMembersForDisplay, setAllMembersForDisplay] = useState([
    ...allMembers,
  ]);

  useEffect(() => {
    if (searchName !== "") {
      setAllMembersForDisplay([
        ...allMembers.filter((mem) =>
          mem.name.toLowerCase().includes(searchName.toLowerCase())
        ),
      ]);
    } else {
      setAllMembersForDisplay([...allMembers]);
    }
  }, [searchName, allMembers]);
  console.log(AllMembersForDisplay);
  return (
    <section className="container">
      <Row className="rowOfCards mt-4 ">
        {AllMembersForDisplay.length > 0 ? (
          AllMembersForDisplay?.map((member, index) => {
            return (
              <div
                className="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-3 py-2 colOfCard"
                key={member.name + "colMember"}
              >
                <div className="BoxMember">
                  <div className="row img-box">
                    <div className="col-4"></div>
                    <div className="col-4 d-flex justify-content-center ">
                      <div className="imgCard ">
                        {member.imageFile ? (
                          <img
                            className="img-member"
                            src={member.imageFile}
                            alt="personal"
                          />
                        ) : (
                          <FaUserCircle />
                        )}
                      </div>
                    </div>
                    <div className="col-4 star-box">
                      <span
                        className={
                          // ------- if member has task =>red star or  green star ,else withe star
                          member.tasks.length > 0
                            ? AllTasks.filter((task) =>
                                member.tasks?.includes(task.title)
                              )?.every((tas) => tas.complete)
                              ? "green-star"
                              : "red-star"
                            : ""
                        }
                      >
                        <FaStar />
                      </span>
                    </div>
                  </div>
                  <div className="details">
                    <div className="name-box">
                      <p className="item-sub">
                        <span>{member.name}</span>
                      </p>
                    </div>
                    <div className="admin-box ">
                      <p className="item-sub">
                        <span className="roll-span">
                          {member.admin ? "Admin" : "User"}
                        </span>
                      </p>
                      <p className="item-sub">
                        Age : <span>{member.age}</span>
                      </p>
                    </div>

                    <div className="">
                      <p className="item-sub">
                        Languages :
                        <div className="BoxSkills">
                          {member?.language?.map((lang, indexLang) => {
                            return (
                              <span
                                key={index + "lang" + indexLang + member.name}
                                className="spanItem me-2 mb-2 bg-dark-blue"
                              >
                                {lang}
                              </span>
                            );
                          })}
                        </div>
                      </p>
                    </div>
                    <div className="">
                      <p className="item-sub">
                        Github :
                        <div>
                          <span>{member.github}</span>
                        </div>
                      </p>
                    </div>
                    <div className="">
                      <p className="item-sub">
                        Email :{" "}
                        <div>
                          <span>{member.email}</span>
                        </div>
                      </p>
                    </div>
                    <div>
                      <div className="">
                        <p className="item-sub ">
                          {" "}
                          Skils :
                          <div className="BoxSkills ">
                            {member?.skills?.map((skill, index) => {
                              return (
                                <span
                                  key={skill + member.name}
                                  className={" spanItem me-2 mb-2 bg-dark-blue"}
                                >
                                  {skill}
                                </span>
                              );
                            })}
                          </div>
                        </p>
                      </div>
                      <div className="">
                        <span className="item-sub "> Tasks : </span>
                        <div className="BoxSkills">
                          {member?.tasks?.map((titleOfTask) => {
                            return AllTasks.filter(
                              (task) => task.title === titleOfTask
                            ).map((taskFilter) => {
                              if (taskFilter.complete) {
                                return (
                                  <span
                                    key={titleOfTask}
                                    className={"green spanItem me-2 mb-2 "}
                                  >
                                    {titleOfTask}
                                  </span>
                                );
                              } else {
                                return (
                                  <span
                                    key={titleOfTask}
                                    className={"red spanItem me-2 mb-2 "}
                                  >
                                    {titleOfTask}
                                  </span>
                                );
                              }
                            });
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <Spinner animation="border" variant="secondary" />
        )}
      </Row>
    </section>
  );
}
export default CardMembers;
