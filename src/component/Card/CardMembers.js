import { Col, Row } from "react-bootstrap";
import "./cardMembers.css";
import useAllMembers from "../../hooks/AllMembers/useAllMembers";
import useAllTasks from "../../hooks/AllTasks/useAllTasks";
import { useState, useEffect } from "react";
import useSearchMember from "../../hooks/SearchMember/useSearchMember";
import { FaUserCircle } from "react-icons/fa";

function CardMembers() {
  const searchName = useSearchMember().SearchName;
  const AllTasks = useAllTasks().AllTasks;
  const allMembers = useAllMembers().AllMembers;
  const [AllMembers, setAllMembers] = useState([]);

  useEffect(() => {
    if (searchName !== "") {
      allMembers?.map((memberr) => {
        if (memberr.name === searchName) {
          setAllMembers([memberr]);
        }
      });
    } else {
      setAllMembers([...allMembers]);
    }
  }, [searchName, allMembers]);

  // set className green or red for tasks of members
  const [classNameTasks, setClassNameTasks] = useState("");

  function GetClassNameTasks(titleOfTask) {
    AllTasks.filter((task) => task.title === titleOfTask).map((taskFilter) => {
      if (taskFilter.complete) {
        setClassNameTasks("green");
      } else {
        setClassNameTasks("red");
      }
    });
  }

  return (
    <section className="container">
      <Row className="rowOfCards mt-4 ">
        {AllMembers.length > 0 ? (
          AllMembers?.map((member, index) => {
            return (
              <Col
                key={member.name + "colMember"}
                xs="12"
                md="6"
                xl="4"
                className=" py-2 colOfCard "
              >
                <div className="BoxMember">
                  <Row xs="12" md="6" className=" pe-md-5 imgBox">
                    {/* <img
                      className="imgCard"
                      src="./user.png"
                      alt="personal image"
                    /> */}
                    <div className="imgCard d-flex align-items-center justify-content-center">
                      <FaUserCircle />
                    </div>
                  </Row>
                  <Row className="details ">
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
                              className="spanItem mx-2 mb-2 bg-dark-blue"
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
                                className={" spanItem mx-2 mb-2 bg-dark-blue"}
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
                                    className={"green spanItem mx-2 mb-2 "}
                                  >
                                    {titleOfTask}
                                  </span>
                                );
                              } else {
                                return (
                                  <span
                                    key={titleOfTask}
                                    className={"red spanItem mx-2 mb-2 "}
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
                  </Row>
                </div>
              </Col>
            );
          })
        ) : (
          <h6>notting found...</h6>
        )}
      </Row>
    </section>
  );
}
export default CardMembers;
