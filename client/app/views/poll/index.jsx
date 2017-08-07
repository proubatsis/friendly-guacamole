import React from "react";
import PollOption from "components/poll/option";
import { formatVoteCount, FLAME_ICON, LINK_ICON } from "util/poll";
import { ContainerFluid, Row, Column } from "elements/bootstrap";
import { PollViewArea, Title, Description, PollTags, PollViewHeader, PollViewBody, FlameVotes, CopyLink, SideCard } from "./elements";
import { LeftNavButton, RightNavButton } from "elements/nav-button";
import R from "ramda";
import withNavbar from "util/with-navbar";

class PollView extends React.Component {
    componentDidMount() {
        this.props.fetchPoll(this.props.match.params.id);
    }

    render() {
        const renderedOptions = R.map(opt => (
            <PollOption
                {...opt}
                key={opt.id}
                totalVotes={this.props.totalVotes}
                onClick={() => this.props.vote(this.props.id, opt.id)}
            />
        ));

        return (
            <ContainerFluid>
                <Row>
                    <Column xs="2">
                        <SideCard pos="left" />
                    </Column>
                    <Column xs="8">
                        <PollViewArea>
                            <PollViewHeader>
                                <FlameVotes votes={this.props.totalVotes} />
                                <CopyLink onClick={this.props.copyUrlToClipboard} />
                            </PollViewHeader>
                            <PollViewBody>
                                <Title>{this.props.title}</Title>
                                <Description>{this.props.Description}</Description>
                                <Row>{renderedOptions(this.props.options || [])}</Row>
                                <PollTags tags={this.props.tags || []} />
                            </PollViewBody>
                        </PollViewArea>
                    </Column>
                    <Column xs="2">
                        <SideCard pos="right" />
                    </Column>
                </Row>
                <Row>
                    <Column xs="5" xsOffset="5">
                        <LeftNavButton url="#" />
                        <RightNavButton url="#" />
                    </Column>
                </Row>
            </ContainerFluid>
        )
    }
}

export default withNavbar(PollView);
