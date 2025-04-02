// import './App.css';
import {gql, useQuery} from '@apollo/client';

const query=gql`
    query GetTodosWithUser {
        getTodos {
            id
            title
            completed
            user{
              id
              name
            }
        }
    }
`;

function App() {
  const { loading, data } = useQuery(query);

  if (loading) return <h1>Loading...</h1>;
  return (
    <div className="App">
      <table>
        <tbody>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Completed</th>
            <th>User ID</th>
            <th>User Name</th>
          </tr>
          {data.getTodos.map((todo) => (
            <tr key={todo.id}>
              <td>{todo.id}</td>
              <td>{todo.title}</td>
              <td>{todo.completed.toString()}</td>
              <td>{todo.user.id}</td>
              <td>{todo.user.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;