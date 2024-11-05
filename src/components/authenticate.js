import React from "react";
import Login from "./Authenticate/Login";
import Registre from "./Authenticate/Registre";
import * as Components from "./Authenticate/Styles";
import "./auth.css";

export default  function Authenticate() {
    const [signIn, toggle] = React.useState(false);
    return(
        <div className="Main">
        <Components.Container>
            <Components.SignInContainer signinIn={signIn}>
                <Login/>
            </Components.SignInContainer>
            <Components.SignUpContainer signinIn={signIn}>
                <Registre/>
            </Components.SignUpContainer>

            

            <Components.OverlayContainer signinIn={signIn}>
                <Components.Overlay signinIn={signIn}>

                    <Components.LeftOverlayPanel signinIn={signIn}>
                        <Components.Title>Welcome Back!</Components.Title>
                        <Components.Paragraph>
                            To keep connected with us please login with your personal info
                        </Components.Paragraph>
                        <Components.GhostButton onClick={() => toggle(false)}>
                            Sign In
                        </Components.GhostButton>
                    </Components.LeftOverlayPanel>

                    <Components.RightOverlayPanel signinIn={signIn}>
                        <Components.Title>Hello, Friend!</Components.Title>
                        <Components.Paragraph>
                            Enter Your personal details and start journey with us
                        </Components.Paragraph>
                        <Components.GhostButton onClick={() => toggle(true)}>
                            Sigin Up
                        </Components.GhostButton> 
                    </Components.RightOverlayPanel>

                </Components.Overlay>
            </Components.OverlayContainer>

        </Components.Container>
        </div>
    )
}