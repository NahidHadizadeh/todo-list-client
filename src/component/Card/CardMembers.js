import { Col, Row, Spinner } from "react-bootstrap";
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
                  <Row xs="12" md="6" className=" imgBox">
                    <div className="imgCard d-flex align-items-center justify-content-center">
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
                  </Row>
                  {/* <Row className="details ">
                    <Col xs="12" sm="6" className="details-col">
                      <p className="item-sub">
                        Name: <span>{member.name}</span>
                      </p>

                      <p className="item-sub">
                        Github: <span>{member.github}</span>
                      </p>
                      <p className="item-sub">
                        Admin:
                        <span>{member.admin ? "admin" : "costomer"}</span>
                      </p>
                    </Col>
                    <Col xs="12" sm="6" className="details-col">
                      <p className="item-sub">
                        Age: <span>{member.age}</span>
                      </p>

                      <p className="item-sub">
                        LinkedIn: <span>{member.email}</span>
                      </p>
                    </Col>
                    <Row>
                      <p className="item-sub">
                        Languages:
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
                      </p>
                      <div>
                        <span className="item-sub "> Skils: </span>
                        <div className="BoxSkills">
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
                      </div>
                      <div>
                        <span className="item-sub "> Tasks: </span>
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
                    </Row>
                  </Row> */}
                  <div className="details">
                    <div className="name-box">
                      <p className="item-sub">
                        <span>{member.name}</span>
                        <span
                          className={
                            // ------- if member has task =>red star or  green star ,else withe star
                            member.tasks.length > 0
                              ? member?.tasks?.every((task) => task.complete)
                                ? "green-star"
                                : "red-star"
                              : ""
                          }
                        >
                          <FaStar />
                        </span>
                      </p>
                      {/* <div>
                        
                      </div> */}
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
