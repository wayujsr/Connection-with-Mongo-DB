import React from 'react';
import logo from './logo.svg';
import Listing from './listing';
import './App.css';

class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      list : [],
      data : [{"name":"1"},{"name":"2"}]
    }
  }
  getData(){
	if(this.state.list){
		var fullList = this.state.list.map((item,index) => 
		  <Listing key={index} item={item} />
		);
		return fullList;
	}
  }
  fillData(){
    return <Entry submitData={this.submitData.bind(this)} />
  }
  
  submitData(name,job){
    //console.log(name,job);
    let oldList = this.state.list;
    let newData = {"id": this.state.list.length + 1, "name" : name, "Designation": job}
    oldList.push(newData)
    this.setState({list: oldList})

    //path of local list from mongodb
    fetch("http://localhost:2040/list", {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify( newData )})
    .then(function(res){ 
      if (res.status >= 400) {
       throw new Error("Bad response from server");
      }
      return res.json();
     })
    .then(function(data){})
    .catch (function (error) { 

      //console.log(data);
    });

  }

  componentDidMount(){
    //path of local list from mongodb
    fetch("http://localhost:2040/list")
    .then((response) =>
    response.json()
  )
  .then((data) => {
    //console.log(typeof(data))
    this.setState({list: data});
  });
}
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <div>
          <ul>
            {this.getData(this)}
          </ul>
          {this.fillData(this)}
        </div>
      </div>
    );
  }
}

class Entry extends React.Component{
  submitForm(e){
    e.preventDefault();
    let name = this.refs.name.value;
    let job = this.refs.job.value;
    this.props.submitData(name,job);
    this.refs.name.value = "";
    this.refs.job.value = "";
    document.getElementById("Name").focus();
  }
  render(){
    return(
      <form className="form" onSubmit={this.submitForm.bind(this)}>
        <input type="text" id="Name" ref="name" placeholder="Enter Name" />
        <input type="text" ref="job" placeholder="Enter Designation" />
        <button type="submit">Submit</button>
      </form>
      )
  }
}

export default App;