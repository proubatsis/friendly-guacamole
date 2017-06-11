import React from "react";

class UserEntryView extends React.Component {
    render() {
        const isSignup = this.props.entryType === "signup";

        return (
            <div className="container form-group">
                <div className="row">
                    <label>Email</label>
                    <input className="form-control" value={this.props.email} onChange={e => this.props.updateEmail(e.target.value)} type="text" />
                </div>
                {isSignup ? (<div className="row">
                    <label>Email</label>
                    <input className="form-control" value={this.props.email} onChange={e => this.props.updateEmail(e.target.value)} type="text" />
                </div>) : ("")}
                <div className="row">
                    <label>Password</label>
                    <input className="form-control" value={this.props.password} onChange={e => this.props.updatePassword(e.target.password)} type="password" />
                </div>
                <div className="row">
                    <button className="btn btn-primary btn-block">{isSignup ? "Signup" : "Login"}</button>
                </div>
            </div>
        );
    }
}

export default UserEntryView;
