import './App.css';
import UserContext from "./UserContext";
import RoutesList from './RoutesList';

function App() {
  return (
    <div className="App">
      {/* <LoginSignup /> */}
      <UserContext.Provider >
        <RoutesList />
      </UserContext.Provider>
    </div>
  );
}

export default App;
