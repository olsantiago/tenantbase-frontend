import React, { Component } from 'react';
import './App.css';




class App extends Component {
  constructor(){
    super();
    this.state = {
      items:[]
    }
  }
  componentDidMount() {
    this.getItems()
  }


  //getting items through fetch with set proxy
  getItems(){
    fetch('/api/palettes/new?format=json')
      .then(results => results.json())
      .then(results => this.setState({items: results }));
  }

  //simple date format of string data
  formatDate(date) {
    var str = date.split(' ');
    var res = str[1];
    var a = res.split(':');
    if (a[0] < 12){
      var time = (a[0]) + ":" + (a[1]) + " am";
    }
    else{
      time = (a[0] - 12) + ":" + (a[1]) + " pm";
    }
    return time;
  }



  render(){
    const items = this.state.items;
    return (
      <section className="palette">
        <div className="container">
          <div className="row main-title">
            <div className="col-9">
              <h1>ColourLovers. <span>Live.</span></h1>
            </div>
            <div className="col-3">
              <span>last Updated at 3:25 PM</span>
            </div>
          </div>
          <div className="row main-body">
            {items.map((dataitem, index) => {
              const date = this.formatDate(dataitem.dateCreated);
              return <div className="col-6 ">
              <div className="item">
              <div className="user">
                <h2>{dataitem.title}</h2>
                <p>by {dataitem.userName} at {date}</p>
                <div className="labels">
                  <span>{dataitem.numViews} views</span>
                  <span>{dataitem.numVotes} votes</span>
                </div>
              </div>
              <div className="image-container">
                <img src={dataitem.imageUrl} className="responsive" alt="palette"></img>
              </div>
              </div>
            </div>
            })}

            

          </div>
        </div>
      </section>
    );
  }
}

export default App;



