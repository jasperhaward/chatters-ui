import { useContext, useMemo, useState } from "preact/hooks";
import { useLocation } from "wouter";
import styles from "./index.module.scss";

import * as api from "@api";
import { SessionContext } from "@context";
import {
    Button,
    Heading,
    Input,
    InputGroup,
    Link,
    Spinner,
    SpinnerContainer,
} from "@components";
import { useForm } from "@hooks";

export default function Login() {
    const [session, setSession] = useContext(SessionContext);
    const [location, setLocation] = useLocation();

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isFailedLogin, setIsFailedLogin] = useState(false);
    const [inputs, onInput, setInputs] = useForm({
        username: "",
        password: "",
    });

    const isDisabled = useMemo(() => {
        return inputs.username === "" || inputs.password === "";
    }, [inputs]);

    function onSubmit(event: JSX.TargetedEvent<HTMLFormElement>) {
        event.preventDefault();

        try {
            setIsFailedLogin(false);
            setIsSubmitting(true);

            //api login
            //setSession({ })
            setLocation("/conversations");
        } catch {
            setIsFailedLogin(true);
        }

        setIsSubmitting(false);
    }

    return (
        <div className={styles.login}>
            <form onSubmit={onSubmit}>
                <Heading>Login</Heading>
                <InputGroup>
                    <Input
                        placeholder="Username"
                        name="username"
                        value={inputs.username}
                        onInput={onInput}
                    />
                </InputGroup>
                <InputGroup>
                    <Input
                        placeholder="Password"
                        name="password"
                        value={inputs.password}
                        onInput={onInput}
                    />
                </InputGroup>
                {isFailedLogin && <span>Invalid credentials.</span>}
                <Button type="submit" color="green" disabled={isDisabled}>
                    {isSubmitting ? (
                        <SpinnerContainer>
                            <Spinner color="white" />
                        </SpinnerContainer>
                    ) : (
                        "Login"
                    )}
                </Button>
                <div className={styles.links}>
                    <Link to="/register">Register</Link>
                    <Link to="/resetpassword" color="white">
                        Reset Password
                    </Link>
                </div>
            </form>
        </div>
    );
}
