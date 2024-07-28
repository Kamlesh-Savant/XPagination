import React, { useEffect, useState } from "react";
import './Table.css';


function Table() {
    const [data, setData] = useState([]);
    const [pageIndex, setPageIndex] = useState(1);
    const [indexedData, setIndexedData] = useState([]);
    const [prev, setPrev] = useState(false);
    const [next, setNext] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = await fetch(
          "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
        );
        let res = await response.json();
        setData(res);
        setIndexedData(()=>{
            return res.filter((res,idx) => {if(idx < 10){return res}});
        });
        // console.log(res);
      } catch (error) {
        console.log(error);
        alert("failed to fetch data");
      }
    };

    fetchData();
  }, []);

  const handleNext = ()=>{
    let idx = (indexedData.length * pageIndex);
    const newData = data.filter((data, i)=>{
        return i < idx + 10 && i > idx -1;
    });
    setIndexedData(newData);
    setPageIndex(pageIndex+1);
    if(pageIndex === Math.floor(data.length/10)){
        setNext(false);
    }
    setPrev(true);
  }
  const handlePrev = ()=>{

    let from = ((pageIndex-1) * 10)-10;
    let to = ((pageIndex-1) * 10)-1;
    // console.log('from', from);
    // console.log('to', to);
    const newData = data.filter((data, i)=>{
        return i >= from  && i <= to;
    });

    setIndexedData(newData);
    setPageIndex(pageIndex-1);
    if(pageIndex-1 === 1){
        setPrev(false);
    }
    setNext(true);
  }

  return (
    <div className="container">
      <h1>Employee Data Table</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {indexedData.map((emp) => {
            return (
              <tr key={emp.id}>
                <td>{emp.id}</td>
                <td>{emp.name}</td>
                <td>{emp.email}</td>
                <td>{emp.role}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div>
        <button disabled={!prev} onClick={handlePrev}>Previous</button>
        <button>{pageIndex}</button>
        <button disabled={!next} onClick={handleNext}>Next</button>
      </div>
    </div>
  );
}

export default Table;
