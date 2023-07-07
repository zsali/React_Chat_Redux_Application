import "./App.css";
import { Grid } from "semantic-ui-react";
import Messages from "./components/Messages/Messages";

function App() {
  return (
    <Grid columns="equal" className="app" style={{ background: "#e3e3e3" }}>
      <Grid.Column>
        <Messages />
      </Grid.Column>
    </Grid>
  );
}

export default App;
