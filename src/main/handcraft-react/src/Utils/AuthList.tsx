import React, { useEffect, useState } from "react";
import { Table } from "semantic-ui-react";
import { useSelector } from "react-redux";
import UserModel from "../Models/UserModel";

const AuthList:React.FC<{roleID:number,header:string}> = (props) => {
  const { tokenType, accessToken } = useSelector((store: any) => store.auth);

  const [users, setUsers] = useState<UserModel[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const url = `http://localhost:8080/api/roleses/${props.roleID}/users`;
      const requestBody = {
        method: "GET",
        headers: {
          Authorization: `${tokenType} ${accessToken}`,
          "Content-Type": "application/json",
        },
      };
      const request = await fetch(url, requestBody);
      if (!request.ok) {
        throw new Error("Something went wrong!");
      }
      const requestJson = await request.json();
      setUsers(requestJson._embedded.users);
    };
    fetchUsers().catch((e: any) => e.message);
  }, []);

  return (
    <>
      <div className="content-page">
        <h2 className="create-product-header text-center">{props.header} List</h2>
        <hr />
        <Table celled fixed singleLine>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>ID</Table.HeaderCell>
              <Table.HeaderCell>First Name</Table.HeaderCell>
              <Table.HeaderCell>Last Name</Table.HeaderCell>
              <Table.HeaderCell>Email</Table.HeaderCell>
              <Table.HeaderCell>Hashed Password</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {users.map((user: UserModel, index) => (
              <Table.Row key={index}>
                <Table.Cell>{user.userId}</Table.Cell>
                <Table.Cell>{user.firstName}</Table.Cell>
                <Table.Cell>{user.lastName}</Table.Cell>
                <Table.Cell>{user.email}</Table.Cell>
                <Table.Cell>{user.password}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    </>
  );
};

export default AuthList;