import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Header,
  Input,
  Segment,
  Comment,
  Button,
  Form,
} from "semantic-ui-react";
import { addItem, deleteItem, logout } from "../../action";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment/moment";

function Messages() {
  const navigate = useNavigate();
  const email = useSelector((state) => state?.user);
  const allMsg = useSelector((state) => state?.msg);

  const [msgData, setMsgData] = useState([]);

  const [id, setId] = useState(0);

  const [msg, setMsg] = useState("");

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const handleChange = (event) => {
    setMsg(event.target.value);
  };

  const handleMsg = () => {
    if (msg !== "") {
      const newItem = {
        id: id,
        name: email?.user.email,
        msg: msg,
        timestamp: moment(Date.now()).format("LT"),
      };
      dispatch(addItem(newItem));
      setId((id) => id + 1);
      setMsg("");
    }
  };

  useEffect(() => {
    // if (allMsg?.items.length > 0) {
    setMsgData(allMsg?.items);
    // }
  }, [allMsg]);

  const handleDelete = (msgID) => {
    dispatch(deleteItem(msgID));
  };

  return (
    <>
      <Segment clearing>
        {/* Channel Tittle */}
        <Header fluid="true" as="h2" floated="left" style={{ marginBottom: 0 }}>
          <a>Login User:</a>
          <Header.Subheader style={{ fontWeight: "bold" }}>
            {email?.user.email}
          </Header.Subheader>
        </Header>
        <Header floated="right">
          <i
            className="sign-out icon"
            style={{ cursor: "pointer" }}
            onClick={handleLogout}
          ></i>
        </Header>
      </Segment>

      <Segment className="messages">
        {msgData &&
          msgData.map((item) => {
            return (
              <Comment.Group key={item.id}>
                <Comment>
                  <Comment.Avatar />
                  <Comment.Content>
                    <Comment.Author as="a">{item?.name}</Comment.Author>
                    <Comment.Metadata>{item?.timestamp}</Comment.Metadata>

                    <i
                      className="delete icon red "
                      style={{ cursor: "pointer", marginLeft: "1rem" }}
                      onClick={() => handleDelete(item.id)}
                    ></i>
                    <Comment.Text>{item?.msg}</Comment.Text>
                  </Comment.Content>
                </Comment>
              </Comment.Group>
            );
          })}
      </Segment>

      <Segment className="message__form">
        <Form onSubmit={handleMsg} size="large">
          <Input
            fluid
            value={msg}
            onChange={handleChange}
            name="message"
            style={{ marginBottom: "0.7em" }}
            labelPosition="left"
            placeholder="write your message"
          />
          <Button.Group icon widths="2">
            <Button
              // onClick={handleMsg}
              color="orange"
              content="Add Reply"
              labelPosition="left"
              icon="edit"
            />
          </Button.Group>
        </Form>
      </Segment>
    </>
  );
}

export default Messages;
