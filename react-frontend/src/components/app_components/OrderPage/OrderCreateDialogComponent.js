import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import client from "../../../services/restClient";
import _ from "lodash";
import initilization from "../../../utils/init";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";


const getSchemaValidationErrorsStrings = (errorObj) => {
    let errMsg = {};
    for (const key in errorObj.errors) {
      if (Object.hasOwnProperty.call(errorObj.errors, key)) {
        const element = errorObj.errors[key];
        if (element?.message) {
          errMsg[key] = element.message;
        }
      }
    }
    return errMsg.length ? errMsg : errorObj.message ? { error : errorObj.message} : {};
};

const OrderCreateDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState({});
    const [loading, setLoading] = useState(false);
    const urlParams = useParams();
    

    useEffect(() => {
        let init  = {};
        if (!_.isEmpty(props?.entity)) {
            init = initilization({ ...props?.entity, ...init }, [], setError);
        }
        set_entity({...init});
        setError({});
    }, [props.show]);

    const validate = () => {
        let ret = true;
        const error = {};
        
        if (!ret) setError(error);
        return ret;
    }

    const onSave = async () => {
        if(!validate()) return;
        let _data = {
            orderId: _entity?.orderId,orderName: _entity?.orderName,shippingAddress: _entity?.shippingAddress,totalAmount: _entity?.totalAmount,orderStatus: _entity?.orderStatus,
            createdBy: props.user._id,
            updatedBy: props.user._id
        };

        setLoading(true);

        try {
            
        const result = await client.service("order").create(_data);
        props.onHide();
        props.alert({ type: "success", title: "Create info", message: "Info Order created successfully" });
        props.onCreateResult(result);
        } catch (error) {
            console.debug("error", error);
            setError(getSchemaValidationErrorsStrings(error) || "Failed to create");
            props.alert({ type: "error", title: "Create", message: "Failed to create in Order" });
        }
        setLoading(false);
    };

    

    

    

    const renderFooter = () => (
        <div className="flex justify-content-end">
            <Button label="save" className="p-button-text no-focus-effect" onClick={onSave} loading={loading} />
            <Button label="close" className="p-button-text no-focus-effect p-button-secondary" onClick={props.onHide} />
        </div>
    );

    const setValByKey = (key, val) => {
        let new_entity = { ..._entity, [key]: val };
        set_entity(new_entity);
        setError({});
    };

    

    return (
        <Dialog header="Create Order" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max scalein animation-ease-in-out animation-duration-1000" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="order-create-dialog-component">
            <div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="orderId">orderId:</label>
                <InputText id="orderId" className="w-full mb-3 p-inputtext-sm" value={_entity?.orderId} onChange={(e) => setValByKey("orderId", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["orderId"]) ? (
              <p className="m-0" key="error-orderId">
                {error["orderId"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="orderName">orderName:</label>
                <InputText id="orderName" className="w-full mb-3 p-inputtext-sm" value={_entity?.orderName} onChange={(e) => setValByKey("orderName", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["orderName"]) ? (
              <p className="m-0" key="error-orderName">
                {error["orderName"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="shippingAddress">shippingAddress:</label>
                <InputText id="shippingAddress" className="w-full mb-3 p-inputtext-sm" value={_entity?.shippingAddress} onChange={(e) => setValByKey("shippingAddress", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["shippingAddress"]) ? (
              <p className="m-0" key="error-shippingAddress">
                {error["shippingAddress"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="totalAmount">totalAmount:</label>
                <InputNumber id="totalAmount" className="w-full mb-3 p-inputtext-sm" value={_entity?.totalAmount} onChange={(e) => setValByKey("totalAmount", e.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["totalAmount"]) ? (
              <p className="m-0" key="error-totalAmount">
                {error["totalAmount"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="orderStatus">orderStatus:</label>
                <InputText id="orderStatus" className="w-full mb-3 p-inputtext-sm" value={_entity?.orderStatus} onChange={(e) => setValByKey("orderStatus", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["orderStatus"]) ? (
              <p className="m-0" key="error-orderStatus">
                {error["orderStatus"]}
              </p>
            ) : null}
          </small>
            </div>
            <small className="p-error">
                {Array.isArray(Object.keys(error))
                ? Object.keys(error).map((e, i) => (
                    <p className="m-0" key={i}>
                        {e}: {error[e]}
                    </p>
                    ))
                : error}
            </small>
            </div>
        </Dialog>
    );
};

const mapState = (state) => {
    const { user } = state.auth;
    return { user };
};
const mapDispatch = (dispatch) => ({
    alert: (data) => dispatch.toast.alert(data),
});

export default connect(mapState, mapDispatch)(OrderCreateDialogComponent);
