import React, {useState} from "react";
import { Rate } from 'antd';


const desc = ['terrible', 'malo', 'normal', 'bueno', 'excelente'];
class Rater extends React.Component {
    state = {
      value: 3,
    };
  
    handleChange = value => {
      this.setState({ value });
    };
    
    render() {
      const { value } = this.state;
      return (
        <span>
          <Rate tooltips={desc} onChange={this.handleChange} value={value} />
          {value ? <span className="ant-rate-text">{desc[value - 1]}</span> : ''}

        </span>
      );
    }
  }
  export default Rater