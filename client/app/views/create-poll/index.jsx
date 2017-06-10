import React from "react";
import R from "ramda";

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
            <div className="container-fluid">
                <div className="row">
                    <div className="col-xs-offset-2 col-xs-8 poll-view create-poll-view">
                        <div className="row">
                            <input type="text" className="title" value={this.props.title} onChange={e => this.props.updateTitle(e.target.value)} />
                        </div>
                        <div className="row">
                            <input type="text" className="description" value={this.props.description} onChange={e => this.props.updateDescription(e.target.value)} />
                        </div>
                        {createOptionInputs(this.props.updateOption, this.props.deleteOption)(this.props.options)}
                        <div className="row">
                            <button className="btn btn-default" onClick={() => this.props.addOption(this.props.options)}>Add Option</button>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xs-2 col-xs-offset-5">
                        <button className="btn btn-default btn-poll-nav">{CHECK_MARK_SYMBOL}</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default CreatePollView;
