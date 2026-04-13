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
import { Calendar } from "primereact/calendar";


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

const BillingCreateDialogComponent = (props) => {
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
            billingId: _entity?.billingId,billingName: _entity?.billingName,customerId: _entity?.customerId,billingAddress: _entity?.billingAddress,paymentMethod: _entity?.paymentMethod,transactionId: _entity?.transactionId,transactionDate: _entity?.transactionDate,
            createdBy: props.user._id,
            updatedBy: props.user._id
        };

        setLoading(true);

        try {
            
        const result = await client.service("billing").create(_data);
        props.onHide();
        props.alert({ type: "success", title: "Create info", message: "Info Billing created successfully" });
        props.onCreateResult(result);
        } catch (error) {
            console.debug("error", error);
            setError(getSchemaValidationErrorsStrings(error) || "Failed to create");
            props.alert({ type: "error", title: "Create", message: "Failed to create in Billing" });
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
        <Dialog header="Create Billing" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max scalein animation-ease-in-out animation-duration-1000" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="billing-create-dialog-component">
            <div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="billingId">billingId:</label>
                <InputNumber id="billingId" className="w-full mb-3 p-inputtext-sm" value={_entity?.billingId} onChange={(e) => setValByKey("billingId", e.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["billingId"]) ? (
              <p className="m-0" key="error-billingId">
                {error["billingId"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="billingName">billingName:</label>
                <InputText id="billingName" className="w-full mb-3 p-inputtext-sm" value={_entity?.billingName} onChange={(e) => setValByKey("billingName", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["billingName"]) ? (
              <p className="m-0" key="error-billingName">
                {error["billingName"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="customerId">customer Id:</label>
                <InputText id="customerId" className="w-full mb-3 p-inputtext-sm" value={_entity?.customerId} onChange={(e) => setValByKey("customerId", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["customerId"]) ? (
              <p className="m-0" key="error-customerId">
                {error["customerId"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="billingAddress">billingAddress:</label>
                <InputText id="billingAddress" className="w-full mb-3 p-inputtext-sm" value={_entity?.billingAddress} onChange={(e) => setValByKey("billingAddress", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["billingAddress"]) ? (
              <p className="m-0" key="error-billingAddress">
                {error["billingAddress"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="paymentMethod">paymentMethod:</label>
                <InputText id="paymentMethod" className="w-full mb-3 p-inputtext-sm" value={_entity?.paymentMethod} onChange={(e) => setValByKey("paymentMethod", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["paymentMethod"]) ? (
              <p className="m-0" key="error-paymentMethod">
                {error["paymentMethod"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="transactionId">transactionId:</label>
                <InputText id="transactionId" className="w-full mb-3 p-inputtext-sm" value={_entity?.transactionId} onChange={(e) => setValByKey("transactionId", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["transactionId"]) ? (
              <p className="m-0" key="error-transactionId">
                {error["transactionId"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="transactionDate">transactionDate:</label>
                <Calendar id="transactionDate"  value={_entity?.transactionDate ? new Date(_entity?.transactionDate) : null} dateFormat="dd/mm/yy" onChange={ (e) => setValByKey("transactionDate", new Date(e.value))} showIcon showButtonBar  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["transactionDate"]) ? (
              <p className="m-0" key="error-transactionDate">
                {error["transactionDate"]}
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

export default connect(mapState, mapDispatch)(BillingCreateDialogComponent);
