import React from "react";
import R from "ramda";
import { Row, Column, ContainerFluid } from "elements/bootstrap";
import { CreatePollViewArea, Title, Description } from "./elements";
import { DefaultButton } from "elements/button";
import withNavbar from "util/with-navbar";

const CHECK_MARK_SYMBOL = "	\u2714";

const createOptionInputs = (fupdate, fdelete) => R.addIndex(R.map)((opt, i, options) => (
    <div key={i} className="row poll-option">
        <input type="text" value={opt} onChange={e => fupdate(e.target.value, i)} />
        <button className="btn btn-default" onClick={e => fdelete(options, i)}>Delete</button>
    </div>
));

class CreatePollView extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.loadDefaultState();
    }

    render() {
        return (
            <ContainerFluid>
                <Row>
                    <CreatePollViewArea>
                        <Title value={this.props.title} onChange={this.props.updateTitle} />
                        <Description value={this.props.description} onChange={this.props.updateDescription} />
                        {createOptionInputs(this.props.updateOption, this.props.deleteOption)(this.props.options)}
                        <Row>
                            <DefaultButton
                                value="Add Option"
                                onClick={() => this.props.addOption(this.props.options)}
                            />
                        </Row>
                    </CreatePollViewArea>
                </Row>
                <Row>
                    <Column xs="2" xsOffset="5">
                        <button className="btn btn-default btn-poll-nav">{CHECK_MARK_SYMBOL}</button>
                    </Column>
                </Row>
            </ContainerFluid>
        );
    }
}

export default withNavbar(CreatePollView);
