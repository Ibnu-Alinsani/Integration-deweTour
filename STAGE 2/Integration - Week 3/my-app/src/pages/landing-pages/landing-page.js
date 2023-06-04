import CardPerformance from "./card";
import Search from "./search";
import PlaceTour from "./place-tour";
import './landing-page.css'

export default function LandingPages() {
  return (
    <div className="container-fluid" style={{padding: "0"}}>
      <div className="hero">
        {/* <Navbar /> */}
        <div className="title">
          <p className="light">
            <span>Explore</span> your amazing city together
          </p>
        </div>
        <Search />
      </div>
      <div className="body">
        <div className="perform">
          <CardPerformance />
        </div>

        <h2 className="name-group">Group Tour</h2>

        <div className="locate">
          <PlaceTour />
        </div>
      </div>
    </div>
  );
}
