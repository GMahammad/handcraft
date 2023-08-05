import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Button, Table } from "semantic-ui-react";
import UserModel from "../../../../Models/UserModel";
import ModalExampleModal from "../../../../Utils/ModalExampleModal";
import RoleModel from "../../../../Models/RoleModel";

const UserManagement = () => {
  const { isAdmin, tokenType, accessToken } = useSelector(
    (store: any) => store.auth
  );

  const [users, setUsers] = useState<UserModel[]>([]);

  const [errorMessage, setErrorMessage] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState<number>(0);
  const [modConfirm, setModConfirm] = useState<boolean>(false);
  const [currentUserId, setCurretUserId] = useState(0);

  useEffect(() => {
    const fetchUsers = async () => {
      const url = `http://localhost:8080/api/roleses/3/users`;
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
  }, [deleteConfirm]);

  const handleConfirmDelete = (value: number) => {
    const fetchDeleteUser = async () => {
      try {
        const url = `http://localhost:8080/api/v1/auth/admin/deleteuser?userId=${value}`;
        const requestBody = {
          method: "DELETE",
          headers: {
            Authorization: `${tokenType} ${accessToken}`,
            "Content-Type": "application/json",
          },
        };
        if (isAdmin) {
          const request = await fetch(url, requestBody);
          if (!request.ok) {
            throw new Error("Something went wrong during deleting product!");
          }
          const response = await request.json();
          alert(response.message);
          setDeleteConfirm(1);
        }
      } catch (e: any) {
        setErrorMessage(e.message);
      }
    };
    fetchDeleteUser().catch((e: any) => setErrorMessage(e.message));
    setDeleteConfirm(0);
  };
  
  const handleModUpdate = async (value:number) => {
    const url = `http://localhost:8080/api/v1/auth/admin/updaterole?userId=${value}`;
    const requestBody = {
      method: "PUT",
      headers: {
        Authorization: `${tokenType} ${accessToken}`,
        "Content-Type": "application/json",
      },
    };

    if (isAdmin && !modConfirm) {
      const request = await fetch(url, requestBody);
      if (!request.ok) {
        throw new Error("Something went wrong!");
      }
      const requestJson = await request.json();
        alert(requestJson.message);
    }
  };

  return (
    <>
      <div className="content-page">
        <h2 className="create-product-header text-center">
          User Management List
        </h2>
        <hr />
        <Table celled fixed singleLine>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>ID</Table.HeaderCell>
              <Table.HeaderCell>First Name</Table.HeaderCell>
              <Table.HeaderCell>Last Name</Table.HeaderCell>
              <Table.HeaderCell>Email</Table.HeaderCell>
              <Table.HeaderCell>Hashed Password</Table.HeaderCell>
              <Table.HeaderCell>Management</Table.HeaderCell>
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
                <Table.Cell className="text-center">
                  <ModalExampleModal
                    confirmDelete={handleConfirmDelete}
                    buttonName="Delete"
                    modalHeader="Delete Product"
                    modalContent="You clicked to delete the selected product. Are you sure deleting
                    product ? If you clicked Yes your product will be deleted!"
                    productId={user.userId || 0}
                  />
                  <br />
                  <Button
                    onClick={() => {
                      handleModUpdate(user.userId);
                    }}
                    color="green"
                    className="my-2"
                  >
                    Make Moderator
                  </Button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    </>
  );
};
export default UserManagement;
