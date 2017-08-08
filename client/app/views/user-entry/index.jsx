import React from "react";
import { Redirect } from "react-router";
import { Row } from "elements/bootstrap";
import Form from "elements/form";
import { PrimaryButton } from "elements/button";
import TextInput from "elements/text-input";
import { login, createUser } from "../../ApiClient";
import withNavbar from "util/with-navbar";

class UserEntryView extends React.Component {
    constructor(props) {
        super(props);
        this.performAction = this.performAction.bind(this);
    }

    performAction(email, password, apiFunc) {
        apiFunc(email, password, (err, res) => {
            if (!err && res.body) {
                global.accessToken = res.body.token;
                this.props.setSuccess(true);
            } else {
                this.props.setSuccess(false);
            }
        });
    }

    render() {
        const isSignup = this.props.entryType === "signup";

        return (
            <Form>
                <Row>
                    <label>Email</label>
                    <TextInput
                        value={this.props.email}
                        onChange={e => this.props.updateEmail(e)}
                    />
                </Row>
                <Row>
                    <label>Password</label>
                    <input
                        className="form-control"
                        value={this.props.password}
                        onChange={e => this.props.updatePassword(e.target.value)}
                        type="password"
                    />
                </Row>
                <Row>
                    <PrimaryButton
                        fill="true"
                        value={isSignup ? "Signup" : "Login"}
                        onClick={() => this.performAction(this.props.email, this.props.password, isSignup ? createUser : login)}
                    />
                </Row>
                {this.props.isSuccess ? (<Redirect to="/" />) : null}
            </Form>
        );
    }
}

export default withNavbar(UserEntryView);
