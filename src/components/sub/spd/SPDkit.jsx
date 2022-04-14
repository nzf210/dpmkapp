import React, { Component } from "react";

export default class SPDKit extends Component {
    containerRef = React.createRef();

    componentDidMount() {
        const url = URL.createObjectURL(this.props.blob);
        window.SPDKit.load({
            document: url,
            container: this.containerRef.current
        });
    }

    componentWillUnmount() {
        window.SPDKit.unload(this.containerRef.current);
    }

    render() {
        return (
            <div
                ref={this.containerRef}
                style={{ width: "100%", height: "100%", position: "absolute" }}
            />
        );
    }
}
