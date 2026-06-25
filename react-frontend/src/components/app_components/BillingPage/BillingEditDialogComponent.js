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
import { Calendar } from "primereact/calendar";


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

const BillingEditDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const urlParams = useParams();
    

    useEffect(() => {
        set_entity(props.entity);
    }, [props.entity, props.show]);

    

    const onSave = async () => {
        let _data = {
            billingId: _entity?.billingId,
billingName: _entity?.billingName,
customerId: _entity?.customerId,
billingAddress: _entity?.billingAddress,
paymentMethod: _entity?.paymentMethod,
transactionId: _entity?.transactionId,
transactionDate: _entity?.transactionDate,
        };

        setLoading(true);
        try {
            
        const result = await client.service("billing").patch(_entity._id, _data);
        props.onHide();
        props.alert({ type: "success", title: "Edit info", message: "Info billing updated successfully" });
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
        <Dialog header="Edit Billing" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max scalein animation-ease-in-out animation-duration-1000" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="billing-edit-dialog-component">
                <div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="billingId">billingId:</label>
                <InputNumber id="billingId" className="w-full mb-3 p-inputtext-sm" value={_entity?.billingId} onChange={(e) => setValByKey("billingId", e.value)}  useGrouping={false}/>
            </span>
            <small className="p-error">
            {!_.isEmpty(error["billingId"]) && (
              <p className="m-0" key="error-billingId">
                {error["billingId"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="billingName">billingName:</label>
                <InputText id="billingName" className="w-full mb-3 p-inputtext-sm" value={_entity?.billingName} onChange={(e) => setValByKey("billingName", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["billingName"]) && (
              <p className="m-0" key="error-billingName">
                {error["billingName"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="customerId">customer Id:</label>
                <InputText id="customerId" className="w-full mb-3 p-inputtext-sm" value={_entity?.customerId} onChange={(e) => setValByKey("customerId", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["customerId"]) && (
              <p className="m-0" key="error-customerId">
                {error["customerId"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="billingAddress">billingAddress:</label>
                <InputText id="billingAddress" className="w-full mb-3 p-inputtext-sm" value={_entity?.billingAddress} onChange={(e) => setValByKey("billingAddress", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["billingAddress"]) && (
              <p className="m-0" key="error-billingAddress">
                {error["billingAddress"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="paymentMethod">paymentMethod:</label>
                <InputText id="paymentMethod" className="w-full mb-3 p-inputtext-sm" value={_entity?.paymentMethod} onChange={(e) => setValByKey("paymentMethod", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["paymentMethod"]) && (
              <p className="m-0" key="error-paymentMethod">
                {error["paymentMethod"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="transactionId">transactionId:</label>
                <InputText id="transactionId" className="w-full mb-3 p-inputtext-sm" value={_entity?.transactionId} onChange={(e) => setValByKey("transactionId", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["transactionId"]) && (
              <p className="m-0" key="error-transactionId">
                {error["transactionId"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="transactionDate">transactionDate:</label>
                <Calendar id="transactionDate"  value={_entity?.transactionDate ? new Date(_entity?.transactionDate) : null} dateFormat="dd/mm/yy" onChange={ (e) => setValByKey("transactionDate", new Date(e.value))} showIcon showButtonBar  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["transactionDate"]) && (
              <p className="m-0" key="error-transactionDate">
                {error["transactionDate"]}
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

export default connect(mapState, mapDispatch)(BillingEditDialogComponent);
