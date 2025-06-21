import UsersTable from "./components/UsersTable/UsersTable";
import { users } from "./mocks/users";

function App() {
  return (
    <div>
      <UsersTable users={users} />
    </div>
  );
}

export default App;
