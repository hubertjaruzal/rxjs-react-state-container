# State container for React.js applications

## Installation

npm:
```sh
npm i rxjs-react-state-container
```

yarn:
```sh
yarn add rxjs-react-state-container
```

## Usage

1. Import `Provider` and wrap your main React Component with it. You can pass initialState to the `store` prop.

```js
import { Provider } from "rxjs-react-state-container";

const initialState = {
  todo: [],
  about: {
    full_name: "Hubert Jaruzal",
    github: "https://github.com/hubertjaruzal",
  }
}

ReactDOM.render(
  <Provider store={initialState}>
    <App/>
  </Provider>,
  document.getElementById("root"),
);
```

2. Import `connect` if you want to use values from the global state. 

```js
import { connect } from "rxjs-react-state-container";

const About = (props) => (
  <section>
    <span>Created by: <a href={props.about.github} target="_blank" rel="noopener noreferrer">{props.about.full_name}</a></span>
  </section>
)

export default connect()(About);
```

3. If you want to get only specific values from your global state, pass array with key values you are interested in.

```js
export default connect(["about"])(About);
```

4. All Components, which are wrapped with `connect` function, have possibility to update state. For that, use `updateState` function.

```js
this.props.updateState({todo: ["clean my room", "be awesome"]});
```