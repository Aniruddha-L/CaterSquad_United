import "../Assets/css/headbar.css"

function Headbar({ isLoggedIn = true }) {
  return (
    <div className="headbar">
      <div className="Logo">C4U</div>
      <div className="options">
        <a href="/">Home</a>
        <a href="/dashboard">Dashboard</a>
        <a href="/hub">Learning hub</a>
        <a href="/Todo">Todo</a>
        <a href="/Task">Task Time</a>
      </div>
    </div>
  );
}

export default Headbar;
