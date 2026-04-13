/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import client from "../../../services/restClient";
import _ from "lodash";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';


const getSchemaValidationErrorsStrings = (errorObj) => {
    let errMsg = {};
    for (const key in errorObj.errors) {
        if (Object.hasOwnProperty.call(errorObj.errors, key)) {
            const element = errorObj.errors[key];
            if (element?.message) {
                errMsg.push(element.message);
            }
        }
    }
    return errMsg.length ? errMsg : errorObj.message ? errorObj.message : null;
};

const OrderEditDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const urlParams = useParams();
    

    useEffect(() => {
        set_entity(props.entity);
    }, [props.entity, props.show]);

    

    const onSave = async () => {
        let _data = {
            orderId: _entity?.orderId,
orderName: _entity?.orderName,
shippingAddress: _entity?.shippingAddress,
totalAmount: _entity?.totalAmount,
orderStatus: _entity?.orderStatus,
        };

        setLoading(true);
        try {
            
        const result = await client.service("order").patch(_entity._id, _data);
        props.onHide();
        props.alert({ type: "success", title: "Edit info", message: "Info order updated successfully" });
        props.onEditResult(result);
        
        } catch (error) {
            console.debug("error", error);
            setError(getSchemaValidationErrorsStrings(error) || "Failed to update info");
            props.alert({ type: "error", title: "Edit info", message: "Failed to update info" });
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
        <Dialog header="Edit Order" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max scalein animation-ease-in-out animation-duration-1000" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="order-edit-dialog-component">
                <div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="orderId">orderId:</label>
                <InputText id="orderId" className="w-full mb-3 p-inputtext-sm" value={_entity?.orderId} onChange={(e) => setValByKey("orderId", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["orderId"]) && (
              <p className="m-0" key="error-orderId">
                {error["orderId"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="orderName">orderName:</label>
                <InputText id="orderName" className="w-full mb-3 p-inputtext-sm" value={_entity?.orderName} onChange={(e) => setValByKey("orderName", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["orderName"]) && (
              <p className="m-0" key="error-orderName">
                {error["orderName"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="shippingAddress">shippingAddress:</label>
                <InputText id="shippingAddress" className="w-full mb-3 p-inputtext-sm" value={_entity?.shippingAddress} onChange={(e) => setValByKey("shippingAddress", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["shippingAddress"]) && (
              <p className="m-0" key="error-shippingAddress">
                {error["shippingAddress"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="totalAmount">totalAmount:</label>
                <InputNumber id="totalAmount" className="w-full mb-3 p-inputtext-sm" value={_entity?.totalAmount} onChange={(e) => setValByKey("totalAmount", e.value)}  useGrouping={false}/>
            </span>
            <small className="p-error">
            {!_.isEmpty(error["totalAmount"]) && (
              <p className="m-0" key="error-totalAmount">
                {error["totalAmount"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="orderStatus">orderStatus:</label>
                <InputText id="orderStatus" className="w-full mb-3 p-inputtext-sm" value={_entity?.orderStatus} onChange={(e) => setValByKey("orderStatus", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["orderStatus"]) && (
              <p className="m-0" key="error-orderStatus">
                {error["orderStatus"]}
              </p>
            )}
          </small>
            </div>
                <div className="col-12">&nbsp;</div>
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

export default connect(mapState, mapDispatch)(OrderEditDialogComponent);
