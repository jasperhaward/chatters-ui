import { Redirect, Route, Switch } from "wouter";

import { SessionContextProvider, AppContextProvider } from "@context";
import Chat from "@pages/Chat";
import Login from "@pages/Login";

function App() {
    return (
        <SessionContextProvider>
            <AppContextProvider>
                <Switch>
                    <Route path="/">
                        <Redirect to="/login" />
                    </Route>
                    <Route path="/login" component={Login} />
                    <Route path="/conversations" component={Chat} />
                    <Route path="/conversations/:id" component={Chat} />
                </Switch>
            </AppContextProvider>
        </SessionContextProvider>
    );
}

export default App;
