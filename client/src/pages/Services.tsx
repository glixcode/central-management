import axios from "axios";
import {useState, useEffect } from "react";

type ListType = {
  _id: string,
  fee: number,
  description: string
}

const apiBaseURL = import.meta.env.VITE_API_BASE_URL;

const Services = () => {
  const [lists, setLists] = useState<ListType[]>([]);

  const fetchData = async () :Promise<ListType[]> => {
    const response = await axios.get<ListType[]>(`${apiBaseURL}/services/getServices`);
    return response.data;
  }

  const loadData = async () => {
   const data = await fetchData();
   setLists(data)
  }

  useEffect(()=> {
    loadData()
  },[])
  
  return (
    <div>
      <ul>
        {lists.map((list)=> (
          <li key={list._id}>{list.description} {list.fee}</li>
        ))}
      </ul>
    </div>
  )
}

export default Services