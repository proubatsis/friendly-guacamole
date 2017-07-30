import React from "react";
import { Row } from "elements/bootstrap";
import Form from "elements/form";
import { PrimaryButton } from "elements/button";
import TextInput from "elements/text-input";

class UserEntryView extends React.Component {
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
                {isSignup ? (
                    <Row>
                        <label>Email</label>
                        <TextInput
                            value={this.props.email}
                            onChange={e => this.props.updateEmail(e)}
                        />
                    </Row>
                    ) : ("")}
                <Row>
                    <label>Password</label>
                    <input
                        className="form-control"
                        value={this.props.password}
                        onChange={e => this.props.updatePassword(e.target.password)}
                        type="password"
                    />
                </Row>
                <Row>
                    <PrimaryButton
                        fill="true"
                        value={isSignup ? "Signup" : "Login"}
                    />
                </Row>
            </Form>
        );
    }
}

export default UserEntryView;
