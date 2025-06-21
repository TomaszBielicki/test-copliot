// src/components/UsersTable/styles/TableStyles.ts
import styled from "styled-components";

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin: 24px 0;
`;

export const Th = styled.th`
  background: #f0f0f0;
  padding: 12px;
  border: 1px solid #ddd;
  text-align: left;
`;

export const Td = styled.td`
  padding: 12px;
  border: 1px solid #ddd;
`;

export const Tr = styled.tr`
  &:nth-child(even) {
    background: #fafafa;
  }
`;
