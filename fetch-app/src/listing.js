import React from 'react';

class Listing extends React.Component{
  render(){
    //console.log(this)
    return(
      <li>{this.props.item.name}</li>
      )
  }
}

export default Listing ;