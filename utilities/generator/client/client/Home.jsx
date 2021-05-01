import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import axios from 'axios';
function Home()
{
  const [todos, setTodos] = useState([]);
  const [keys, setKeys] = useState([]);
  const fetchData = async () =>
  {
    try
    {
      const { data } = await axios.get('http://localhost:5000/');
      const currentDta = Array.from(data).map((elements) =>
      {
        return { ...elements };
      });
      setKeys(Object.keys(currentDta[0]));
      setTodos(currentDta);

    } catch (error)
    {
      console.log(error);
    }
  };
  useEffect(() =>
  {
    fetchData();
  }, []);

  return (
    <table className="customers">
      <thead>
        <tr>
          {keys.map((keys) => (
            <th>{keys}</th>
          ))}
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {todos.map((data, index) => (
          <tr>
            <td>{index + 1}</td>
            {keys.map((key) => {
              if(key !== '_id') return <td>{`${data[key]}`}</td>
            })}
            <td className="actions">
              <Link to={`/update/${data._id}`}>
                <button className="update">Update</button>
              </Link>
              <Link to="/add">
                <button className="add">Add</button>
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Home;
