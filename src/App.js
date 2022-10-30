import React, { useEffect, useState } from "react";
import FloatingButton from "./components/FloatingButton";
import Modal from "./components/TaskModal";

const App = () => {
  const [data, setData] = useState([]);
  const [dataurut, setDataurut] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    await fetch(`https://api.todoist.com/rest/v1/tasks`, {
      headers: {
        Authorization: `Bearer 8845c7d100a662743d705c1c0aaf4150bb1a226d`,
      },
    })
      .then((response) => response.json())
      .then((res) => setData(res))
      .then(() => sortData());
  };

  const sortData = async () => {
    let sortedData = data.sort((a, b) => {
      if (a.due.date > b.due.date) {
        return -1;
      } else if (a.due.date < b.due.date) {
        return 1;
      } else {
        return 0;
      }
    });
    setDataurut(sortedData);
    setLoading(false);
  };

  return (
    <div>
      <Modal data={data} loading={loading} getData={() => fetchData()} />
      <FloatingButton getData={() => fetchData()} />
    </div>
  );
};

export default App;
