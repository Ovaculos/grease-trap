//import './Sidebar.css';

function Sidebar({baskets, onChange}) {
  return (
    <div className="sidebar">
      <p>Baskets:</p>
      {baskets.map(basket => {
      return (
        <div key={basket}>
        <button onClick={() => onChange(basket)}>{basket}</button>
        </div>)
      })}
    </div>
  )
}

export default Sidebar;
