import React from "react"
import Form from "./Form";

class App extends React.Component {
    state = {
        error: undefined,
        isLoaded: false,
        items: []
    };

  componentDidMount() {
    fetch("http://localhost:3000/sms/history")
        .then(res => res.json())
        .then((result) => {
            this.setState({
                isLoaded: true,
                items: result
            })
        });
  }

  render() {
      const { error, isLoaded, items } = this.state;
      if (error) {
          return <div>Error: {error.message}</div>;
      } else if (!isLoaded) {
          return <div>Loading...</div>;
      }
      return (
        <div>
            <Form></Form>
        </div>
    );
  }
}

export default App