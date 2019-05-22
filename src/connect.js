import React, { Component } from "react";
import { BehaviorSubject } from "rxjs";
import { ProviderContext } from "./provider";

const selector = new BehaviorSubject({});

class Connect extends Component {
  constructor(props) {
    super(props);

    this.state = props.initialState;
  }

  componentWillMount() {
    this.subscription = selector.subscribe(newState => {
      if (!!this.props.keys.find(key => newState[key]) || !this.props.keys.length) {
        return this.setState({ ...newState });
      }
    });
  }

  componentWillUnmount() {
    this.subscription.unsubscribe();
  }

  updateState(data) {
    selector.next(data);
  }

  getProps() {
    return !this.props.keys.length ? this.state : Object.assign({}, ...this.props.keys.map(item => ({ [item]: this.state[item] })));
  }

  render() {
    return (
      React.cloneElement(this.props.children, {...this.getProps(), updateState: this.updateState})
    );
  }
};

export function connect(keys = []) {
  return function wrapWithConnect(WrappedComponent) {
    return () => (
      <ProviderContext.Consumer>
        {(initialState) => (
          <Connect keys={keys} initialState={initialState}>
            <WrappedComponent/>
          </Connect>
        )}
      </ProviderContext.Consumer>
    );
  }; 
}