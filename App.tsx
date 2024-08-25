import React, { Component } from 'react';
import DataStreamer, { ServerRespond } from './DataStreamer';
import Graph from './Graph';
import './App.css';

/**
 * State declaration for <App />
 */
interface IState {
  data: any[],
  showGraph: boolean // Add this line
}


/**
 * The parent element of the react app.
 * It renders title, button and Graph react element.
 */
class App extends Component<{}, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
        data: [],
        showGraph: false // Initialize to false
    };
}

  }

  /**
   * Render Graph react component with state.data parse as property data
   */
  renderGraph() {
    if (this.state.showGraph) { // Check showGraph state
        return (
            <Graph data={this.state.data} />
        );
    }
    return null;
  }


  /**
   * Get new data from server and update the state with the new data
   */
  getDataFromServer() {
    const fetchData = () => {
        fetch('http://localhost:8080/data')
            .then(response => response.json())
            .then(data => {
                // Filter out duplicate data
                const newData = data.filter(d => !this.state.data.find(existing => existing.timestamp === d.timestamp && existing.stock === d.stock));
                this.setState({ data: [...this.state.data, ...newData] });
            });
    };
    fetchData();
    this.interval = setInterval(fetchData, 1000); // Fetch data every 1 second
  }


  /**
   * Render the App react component
   */
  render() {
    return (
      <div className="App">
        <header className="App-header">
          Bank & Merge Co Task 2
        </header>
        <div className="App-content">
          <button className="btn btn-primary Stream-button"
            // when button is click, our react app tries to request
            // new data from the server.
            // As part of your task, update the getDataFromServer() function
            // to keep requesting the data every 100ms until the app is closed
            // or the server does not return anymore data.
            onClick={() => {this.getDataFromServer()}}>
            Start Streaming Data
          </button>
          <div className="Graph">
            {this.renderGraph()}
          </div>
        </div>
      </div>
    )
  }
}

export default App;
