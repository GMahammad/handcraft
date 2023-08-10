import React from "react";
import { Label } from "semantic-ui-react";

const AdminInfoContent: React.FC<{ totalProduct: number,totalRevenue:number,soldProducts:number }> = (props) => {
  return (
    <>
      <div className="col-xl-3 col-md-6">
        <div className="card">
          <div className="card-body card-top">
            <Label color="teal" size="large" className="header-title mt-0 mb-4">Total Products Count </Label>
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
          <div className="card-body card-top">
          <Label color="green" size="large" className="header-title mt-0 mb-4">Total Revenue </Label>

            <div className="widget-chart-1">
         
              <div className="widget-detail-1 text-end">
                <h2 className="fw-normal"> ${props.totalRevenue} </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-xl-3 col-md-6">
        <div className="card">
          <div className="card-body card-top">
          <Label color="teal" size="large" className="header-title mt-0 mb-4">Daily Sales </Label>
            <div className="widget-box-2">
              <div className="widget-detail-1 text-end">
                <h2 className="fw-normal">{props.soldProducts} </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-xl-3 col-md-6">
              <div className="card">
                <div className="card-body card-top">
                <Label color="green" size="large" className="header-title mt-0 mb-4">Sales Statistics</Label>

                  <div className="widget-box-2">
                    <div className="widget-detail-2 text-end">
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
