import React, { Component } from "react";

export const ProviderContext = React.createContext({});

class Provider extends Component {
  constructor(props) {
    super(props);

    const { store } = props

    this.state = {
      store: store ? store : {}
    }
  }

  render() {
    return (
      <ProviderContext.Provider value={this.state.store}>
        {this.props.children}
      </ProviderContext.Provider>
    );
  }
};

export default Provider;