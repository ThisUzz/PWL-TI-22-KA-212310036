import { NavLink } from "react-router-dom";
import Footers from "./Footers";
import Headers from "./Headers";

const LayoutInit = ({ children }) => {
  return (
    <div className="d-flex flex-column flex-root">
      <div className="page d-flex flex-row flex-column-fluid">
        <div className="wrapper d-flex flex-column flex-row-fluid">
          <div className="py-10">
            <section className="d-flex flex-column-fluid align-items-start  container-xxl mb-5">
              <div className="content flex-row-fluid">
                <Headers />
                {children}
              </div>
            </section>
          </div>
          <Footers />
        </div>
      </div>
    </div>
  );
};

export default LayoutInit;
