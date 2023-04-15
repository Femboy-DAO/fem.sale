import { Link } from 'react-router-dom';

export const NavbarRoutes = () => {
  return <div>
    <div className="gen-container navbar-route alt-color-2">
      <div className="gen-container padded center-insides alt-color-2 cursor-pointer">
        <h1 style={{ color: 'white' }}>
          FEMBOY
        </h1>
        <h3 style={{ margin: 'auto 0' }}>&nbsp;DAO</h3>
      </div>
      <div className="gen-container">
        <div className="gen-container padded alt-color-3 center-insides navbar-route-button">
          <Link to="/"><h3>HOME</h3></Link>
        </div>

        <div className="gen-container padded alt-color-3 center-insides navbar-route-button">
          <Link to="/scuffies"><h3>SCUFF</h3></Link>
        </div>
      </div>

    </div>
  </div>
}