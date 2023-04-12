import { Col, Row } from "react-bootstrap";
import "./cardMembers.css";
// import { useEffect, useState } from "react";
// import { getAllMembersAPI } from "../../API/membersAPI";
import useAllMembers from "../../hooks/AllMembers/useAllMembers";
import useAllTasks from "../../hooks/AllTasks/useAllTasks";
import { useState, useEffect } from "react";
import useSearchMember from "../../hooks/SearchMember/useSearchMember";

function CardMembers() {
  const searchName = useSearchMember().SearchName;
  console.log(searchName);
  // const dataAllMembers = useAllMembers();
  const AllTasks = useAllTasks().AllTasks;
  const allMembers = useAllMembers().AllMembers;
  console.log(allMembers);
  const [AllMembers, setAllMembers] = useState([]);
  // set all members if enter search name
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
    console.log(titleOfTask);
    AllTasks.filter((task) => task.title === titleOfTask).map((taskFilter) => {
      if (taskFilter.complete) {
        setClassNameTasks("green");
        console.log("green");
      } else {
        setClassNameTasks("red");
        console.log("red");
      }
      console.log("filter map", taskFilter);
    });
  }
  // } else {
  // setAllMembers(AllMembersUseAllMember);
  // }
  // if (searchName !== "") {
  //   setAllMembers(allMembers.map((member) => member.name.includes(searchName)));
  // }

  return (
    <section className="container">
      <Row className="rowOfCards mt-4 ">
        {/* <h6 onClick={handle}>cards</h6> */}
        {AllMembers.length > 0 ? (
          AllMembers?.map((member, index) => {
            console.log("member.tasks");
            return (
              <Col
                key={member.name + "colMember"}
                xs="12"
                md="6"
                xl="4"
                // xl="4"
                className=" py-2 colOfCard "
              >
                <div className="BoxMember">
                  <Row xs="12" md="6" className=" pe-md-5 imgBox">
                    <img
                      className="imgCard"
                      src="/client/public/user.png"
                      alt="personal image"
                    />
                    {/* if(document.querySelectorAll(".red").length === member.tasks.length) {<span>red</span>} */}
                  </Row>
                  {/* <p className="title">{titleName}</p> */}
                  <Row className="details ">
                    <Col xs="12" sm="6" className="details-col">
                      <p className="item-sub">
                        Name: <span>{member.name}</span>
                      </p>

                      <p className="item-sub">
                        Github: <span>{member.github}</span>
                      </p>
                      <p className="item-sub">
                        Admin:{" "}
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
                        {member?.language?.map((lang) => {
                          return (
                            <span
                              key={index + "lang" + member.name}
                              className="spanItem mx-2 mb-2 bg-dark-blue"
                            >
                              {lang}
                            </span>
                          );
                        })}
                      </p>
                      <p>
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
                      </p>
                      <p>
                        <span className="item-sub "> Tasks: </span>
                        <div className="BoxSkills">
                          {member?.tasks?.map((titleOfTask) => {
                            console.log("titleOfTask");
                            // GetClassNameTasks(titleOfTask);

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
                                // setClassNameTasks("green");
                              } else {
                                return (
                                  <span
                                    key={titleOfTask}
                                    className={"red spanItem mx-2 mb-2 "}
                                  >
                                    {titleOfTask}
                                  </span>
                                );
                                // setClassNameTasks("red");
                              }
                            });
                            // return (
                            //   <span
                            //     key={titleOfTask}
                            //     className={" spanItem mx-2 mb-2"}
                            //   >
                            //     {titleOfTask}
                            //   </span>
                            // );
                            // {
                            //   AllTasks.filter(
                            //     (task) => task.title === titleOfTask
                            //   ).map((taskFiltering) => {
                            //     return taskFiltering.complete ? (
                            //       <span
                            //         key={index + titleOfTask}
                            //         className="red spanItem mx-2 mb-2"
                            //       >
                            //         {titleOfTask}
                            //       </span>
                            //     ) : (
                            //       <span
                            //         key={index + titleOfTask}
                            //         className="green spanItem mx-2 mb-2"
                            //       >
                            //         {titleOfTask}
                            //       </span>
                            //     );
                            //   });
                            // }

                            // );
                            // return AllTasks.map((taskOfalltask) => {
                            //   if (
                            //     taskOfalltask.title === titleOfTask &&
                            //     taskOfalltask.complete
                            //   ) {
                            //     return (
                            //       <span
                            //         key={index}
                            //         className="green spanItem mx-2 mb-2"
                            //       >
                            //         {task}
                            //       </span>
                            //     );
                            //   } else if (
                            //     taskOfalltask.title === task &&
                            //     !taskOfalltask.complete
                            //   ) {
                            //     // setRedTasks(redTasks + 1);
                            //     return (
                            //       <span
                            //         key={index}
                            //         className="red spanItem mx-2 mb-2"
                            //       >
                            //         {task}
                            //       </span>
                            //     );
                            //   }
                            // });
                          })}
                        </div>
                      </p>
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
