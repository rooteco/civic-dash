export default function Header({
  setTableOpen,
  prevState
}) {
  return <div className="header">
              <p>Hello <strong>Farnney the Dinosaur</strong></p>
              <div className="portfoliostats">
                <button className="metric" onClick={() => setTableOpen(prevState => !prevState)}>$1000</button>
                  <button className="metric" onClick={() => setTableOpen(prevState => !prevState)}>3</button>
              </div>
          </div>;
}
  