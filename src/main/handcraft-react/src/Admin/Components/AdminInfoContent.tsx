import React from "react";

const AdminInfoContent: React.FC<{ totalProduct: number }> = (props) => {
  return (
    <>
      <div className="col-xl-3 col-md-6">
        <div className="card">
          <div className="card-body">
            <h4 className="header-title mt-0 mb-4">Total Products Count </h4>
            <div className="widget-chart-1">
              <div className="widget-detail-1 text-end">
                <h2 className="fw-normal pt-2 mb-1"> {props.totalProduct} </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-xl-3 col-md-6">
        <div className="card">
          <div className="card-body">
            <h4 className="header-title mt-0 mb-4">Statistics</h4>
            <div className="widget-chart-1">
              <div className="widget-chart-box-1 float-start" dir="ltr">
                <input
                  data-plugin="knob"
                  data-width="70"
                  data-height="70"
                  data-fgColor="#ffbd4a"
                  data-bgColor="#FFE6BA"
                  value="80"
                  data-thickness=".15"
                />
              </div>
              <div className="widget-detail-1 text-end">
                <h2 className="fw-normal pt-2 mb-1"> 4569 </h2>
                <p className="text-muted mb-1">Revenue today</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-xl-3 col-md-6">
        <div className="card">
          <div className="card-body">
            <h4 className="header-title mt-0 mb-3">Daily Sales</h4>
            <div className="widget-box-2">
              <div className="widget-detail-2 text-end">
                <span className="badge bg-pink rounded-pill float-start mt-3">
                  32% <i className="mdi mdi-trending-up"></i>{" "}
                </span>
                <h2 className="fw-normal mb-1"> 158 </h2>
                <p className="text-muted mb-3">Revenue today</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-xl-3 col-md-6">
              <div className="card">
                <div className="card-body">
                  <h4 className="header-title mt-0 mb-3">Sales Analytics</h4>
                  <div className="widget-box-2">
                    <div className="widget-detail-2 text-end">
                      <span className="badge bg-success rounded-pill float-start mt-3">
                        <i className="mdi mdi-trending-up"></i>{" "}
                      </span>
                      <h2 className="fw-normal mb-1"> Sales Analytics </h2>
                      <p className="text-muted mb-3">Revenue today</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
    </>
  );
};

export default AdminInfoContent;
