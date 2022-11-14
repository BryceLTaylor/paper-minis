import { Component } from "react";
import { link } from "react-dom";

class ErrorBoundary extends Component {
  state = { hasError: false };
  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error(error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <h2> An error! </h2>
          <p> Check the console for details </p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
