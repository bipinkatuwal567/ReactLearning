import { useState } from 'react'

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

function App() {
  const [addFriend, setAddFriend] = useState(false);
  const [friends, setFriends] = useState(initialFriends);
  const [selectedFriend, setSelectedFriend] = useState(null);

  function handleAddFriend(){
    setAddFriend(value => !value);
  }

  function handleSplitBill(value){
    console.log(value);
    setFriends(friends => friends.map(friend => friend.id === selectedFriend.id ? {...friend, balance: friend.balance + value} : friend));
  }

  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList friends={friends} selectedFriend={selectedFriend} setSelectedFriend={setSelectedFriend} />
       {
        addFriend &&  <FormAddFriend onSetAddFriend={setAddFriend} onSetFriends={setFriends} />
       }
        <Button onClick={handleAddFriend}>
          {
            addFriend ? "Close" : "Add Friend"
          }
        </Button>
      </div>
        {
          selectedFriend !== null && <FormSplitBill key={selectedFriend.id} selectedFriend={selectedFriend} handleSplitBill={handleSplitBill}/> 
        }
    </div>
  )
}

function FormSplitBill({selectedFriend, handleSplitBill}){
  const [billValue , setBillValue] = useState("");
  const [userExpense, setUserExpense] = useState("");
  const [whoIsPaying, setWhoIsPaying] = useState("you");

  const friendExpense = billValue ? billValue - userExpense : "";

  function handleSubmit(e){
    e.preventDefault();
    if(!billValue || !userExpense) return;

    handleSplitBill(whoIsPaying === "you" ? friendExpense : -userExpense);
    setBillValue("");
    setUserExpense("");
  }

  return(
    <form className="form-split-bill" onSubmit={handleSubmit}>
      <h2>Split a bill with {selectedFriend.name}</h2>

      <label>💰 Bill Value</label>
      <input 
        type="text"
        value={billValue}
        onChange={(e) => setBillValue(Number(e.target.value))}
      />

      <label>🕴️ Your Expense</label>
      <input 
        type="text" 
        value={userExpense}
        onChange={(e) => setUserExpense(Number(e.target.value) > billValue ? userExpense : Number(e.target.value))}
      />

      <label>👯‍♂️ {selectedFriend.name}'s expense :</label>
      <input type="text" disabled value={friendExpense} />

      <label>🤑 Who is paying the bill?</label>
      <select value={whoIsPaying} onChange={(e) => setWhoIsPaying(e.target.value)}>
        <option value="you">You</option>
        <option value="friend">{selectedFriend.name}</option>
      </select>

      <Button type="submit">Split Bill</Button>
    </form>
  )
}

function FormAddFriend(
  {
    onSetFriends, 
    onSetAddFriend, 
    selectedFriend, 
    setSelectedFriend
  }) 
  {
  const[friendName, setFriendName] = useState("");
  const[image, setFriendImage] = useState("https://i.pravatar.cc/48");

  const id=crypto.randomUUID();
  const friendImage = `${image}?=${id}`;

  function addNewFriend(e){
    e.preventDefault();
    onSetFriends(friends => [...friends, {balance: 0, id, name: friendName, image: friendImage}])

    if(!friendName || !image) return;

    setFriendImage("https://i.pravatar.cc/48");
    setFriendName("");

    onSetAddFriend(value => !value);
  }

  return (
    <form className="form-add-friend" onSubmit={(e) => addNewFriend(e)}>
      <label>👯Friend Name</label>
      <input type="text" value={friendName} onChange={(e) => setFriendName(e.target.value)} />

      <label>🌄 Image URL</label>
      <input type="text" value={image} onChange={(e) => setFriendImage(e.target.value)} />
      <Button type="submit" selectedFriend={selectedFriend} setSelectedFriend={setSelectedFriend}>Add</Button>
    </form>
  )
}

function Button({children, onClick}){

  return(
    <button className="button" onClick={onClick}>
      {children}
    </button>
  )
}

function FriendsList({friends, setSelectedFriend, selectedFriend}) {
  const newFriends = friends;
  return (
    <ul>
      {
        newFriends.map(friend => <Friend selectedFriend={selectedFriend} setSelectedFriend={setSelectedFriend} friends={friend} key={friend.id} />)
      }
    </ul>
  )
}

function Friend({ friends, setSelectedFriend, selectedFriend }) {
  const isCurrentFriend = friends.id === selectedFriend?.id;
  return (
    <li className={isCurrentFriend ? "selected" : ""}>
      <img src={friends.image} alt="image" />
      <h3>{friends.name}</h3>
      {
        friends.balance === 0
          ?
          <p>You and {friends.name} are even.</p>
          :
          friends.balance > 0
            ?
            <p className='green'>{friends.name} owes you ${friends.balance}</p>
            :
            <p className='red'>You owe {friends.name} ${Math.abs(friends.balance)}</p>
      }
      <Button onClick={() => setSelectedFriend(cur => cur?.id === friends?.id ? null : friends)}>
        {
          isCurrentFriend ? "Close" : "Select"
        }
      </Button>
    </li>
  )
}



export default App
