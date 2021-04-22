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
      readMore: "Les Mer",
      readLess: " Les Mindre",
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
            <div>
              <Link>{this.state.readLess}</Link>{" "}
            </div>
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
            </span>
            <div onClick={this.setStatus.bind(this)}>
              <Link>{this.state.readMore}</Link>
            </div>
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
