import React, { useState } from "react";

function App() {
  const [item, setItem] = React.useState('');
  const [newItemEdit, setNewItemEdit] = React.useState('');
  const [list, setList] = useState([]);
  const [editing, setEditing] = useState('');


  React.useEffect(() => {
    const itemsLoad = localStorage.getItem('list');
    const parsedItems = JSON.parse(itemsLoad);

    if (parsedItems)
      setList(parsedItems);

  }, [])


  React.useEffect(() => {
    const items = JSON.stringify(list);
    localStorage.setItem('list', items)
  }, [list])

  const addItem = () => {
    if (!item) {
      alert('item empt');
      return
    }

    const newItem = {
      id: 1 + Math.random(),
      value: item,
      completed: false
    };

    //One wa to go
    // const newList = [...list];
    // newList.push(newItem);
    // setList(newList);

    //another wa to go
    setList([...list].concat(newItem))
    setItem('');
  }

  const deleteItem = (id) => {

    // const newList = [...list];
    // const updateList = newList.filter(item => item.id !== id);

    const updateList = [...list].filter(item => item.id !== id);

    setList(updateList);
  }

  const editItem = () => {

    const edittedList = [...list].map((element) => {
      if (element.id === editing) {
        element.value = newItemEdit;
      }
      return element;
    });

    setList(edittedList);
    setEditing('');

  }

  const completeFunction = (id) => {

    const edittedList = [...list].map((element) => {
      if (element.id === id) {
        element.completed = !element.completed;
      }
      return element;
    });
    setList(edittedList);

  }

  return (
    <div className="App">
      <input
        onChange={(event) => setItem(event.target.value)}
        placeholder="Add new Item"
        value={item}
      />
      <button
        onClick={addItem}
      >
        Add
      </button>
      <br />
      <ul>
        {list.map((item, index) => {
          return (
            <div
              key={item.id}
              style={{ flexDirection: 'row' }}
            >
              {editing === item.id ?
                <input
                  onChange={(event) => setNewItemEdit(event.target.value)}
                  placeholder="Add new Item"
                  value={newItemEdit}
                />
                :
                <li style={{color: item.completed ?  'green' : 'black', textDecoration: item.completed ? 'line-through' : 'none'}}>
                  
                  {item.value}

                </li>
              }
              <div>
                {editing === item.id ?
                  <>
                    <button
                      onClick={editItem}
                    >
                      Save
                    </button>

                    <button
                      onClick={() => setEditing('')}
                    >
                      CanCel
                    </button>
                  </> :
                  <>
                    <input
                      type={"checkbox"}
                      onChange={() => completeFunction(item.id)}
                      checked={item.completed}
                    />
                    <button
                      onClick={() => {
                        setEditing(item.id);
                        setNewItemEdit(item.value)
                      }}
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => deleteItem(item.id)}
                    >
                      x
                    </button>
                  </>
                }
              </div>
              <br />
            </div>
          )
        })}
      </ul>
    </div>
  );
}

export default App;
