// src/components/UsersTable/UsersTable.tsx
import React from "react";
import type { User } from "../../types/User";
import { Table, Th, Td, Tr } from "./styles/TableStyles";

interface UsersTableProps {
  users: User[];
}

const UsersTable: React.FC<UsersTableProps> = ({ users }) => {
  return (
    <Table>
      <thead>
        <Tr>
          <Th>ID</Th>
          <Th>Imię</Th>
          <Th>Nazwisko</Th>
          <Th>Email</Th>
          <Th>Wiek</Th>
        </Tr>
      </thead>
      <tbody>
        {users.map((user: User) => (
          <Tr key={user.id}>
            <Td>{user.id}</Td>
            <Td>{user.firstName}</Td>
            <Td>{user.lastName}</Td>
            <Td>{user.email}</Td>
            <Td>{user.age}</Td>
          </Tr>
        ))}
      </tbody>
    </Table>
  );
};

export default UsersTable;
