// import logo from './logo.svg';
import React,{ useEffect, useState } from 'react'
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import './App.css';
import axios from 'axios';

// @autobind
const App = () => {
  // const [data,setData] = useState('');
  // const [renderr,setRenderr] = useState([]); 
  const [arr,setArr] = useState([]);
  
  useEffect(()=>{
    axios.get('https://wordpress.ferofly.com/wp-json/wp/v2/posts').then(data=>{

      var dummyArray=[]
data.data.map(item=>{
      ReactHtmlParser(item.content.rendered).map(data=>{
      if(data.type === "h2"){
        // console.log(data)
        // setRenderr(data)
      if(data.props.children.length > 1 && data.props.children[0].type!="strong"){
        // var toPush={
        //   number:data.props.children[0],
        //   information:data.props.children[1].props.children[0] 
        // }
        var totalString = `<h2 id="${data.props.children[1].props.children[0]}">${data.props.children[0]} ${data.props.children[1].props.children[0]}</h2>`
        dummyArray.push(totalString)
        
        // setRenderr(data)
        // setData(data)
      }
    }
    })
    ReactHtmlParser()
    })
    setArr(dummyArray)
      // setData(data.data)
    }).catch(err=>console.log(err))
  },[])
console.log(arr)
  return (
    <div className="App">
       {/* {data && ReactHtmlParser(renderr) }  */}
       
       {arr?arr.map(item=>ReactHtmlParser(item)):null}
      
    </div>
  );
}

export default App;
