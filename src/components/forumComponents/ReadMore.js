import React, { Component } from "react";
import PropTypes from "prop-types";
import trimText from "../forumComponents/trimText";
import { Link } from "react-router-dom";
class ReadMore extends Component {
  constructor(props) {
    super(props);

    let args = [this.props.text, this.props.min, this.props.max];

    const [primaryContent, secondaryContent] = trimText(...args);
    this.state = {
      showSecondary: false,
      primaryContent,
      secondaryContent,
      readMore: "Les mer",
      readLess: " Les mindre",
    };
  }

  setStatus() {
    let show = !this.state.showSecondary;
    this.setState({ showSecondary: show });
  }

  render() {
    let displayContent;
    if (!this.state.secondaryContent) {
      displayContent = (
        <div>
          {this.state.primaryContent} {this.state.secondaryContent}
        </div>
      );
    } else if (this.state.showSecondary) {
      displayContent = (
        <div>
          <span onClick={this.setStatus.bind(this)}>
            {this.state.primaryContent} {this.state.secondaryContent}
            <Link>{this.state.readLess}</Link>{" "}
          </span>
        </div>
      );
    } else {
      displayContent = (
        <div>
          <span>
            {this.state.primaryContent}
            <span style={{ display: "none" }}>
              {this.state.secondaryContent}
            </span>{" "}
            ...
            <Link onClick={this.setStatus.bind(this)}>
              {this.state.readMore}
            </Link>
          </span>
        </div>
      );
    }

    return displayContent;
  }
}

ReadMore.propTypes = {
  text: PropTypes.string.isRequired,
};

export default ReadMore;
