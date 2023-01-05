import { Redirect, Route, Switch } from "wouter";

import { SessionContextProvider, AppContextProvider } from "@context";
import Chat from "@pages/Chat";

function App() {
    return (
        <SessionContextProvider>
            <AppContextProvider>
                <Switch>
                    <Route
                        path="/"
                        component={() => <Redirect to="/conversations" />}
                    />
                    <Route path="/conversations" component={Chat} />
                    <Route path="/conversations/:id" component={Chat} />
                </Switch>
            </AppContextProvider>
        </SessionContextProvider>
    );
}

export default App;
