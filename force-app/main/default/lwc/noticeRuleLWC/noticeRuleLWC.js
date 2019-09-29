/* eslint-disable no-console */
import { LightningElement, track, wire } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import { NavigationMixin } from 'lightning/navigation';

import ACCOUNT_OBJECT from '@salesforce/schema/Account';
import LEAD_OBJECT from '@salesforce/schema/Lead';

export default class noticeRuleLWC extends NavigationMixin(LightningElement) {
    @track error;    
    @track targetField;
    @track targetChange;
    @track showTargeValue;
    @track fieldOptions;
    objFields = {};

    // Get list of account fields
    @wire(getObjectInfo, { objectApiName: ACCOUNT_OBJECT })
    wiredAcctData({data, error}) {
        if (data) {
            const options = this.createFieldOptions(data);
            this.objFields.Account = options;
        } else {
            this.error = error;
        }
    }

    // Get list of lead fields
    @wire(getObjectInfo, { objectApiName: LEAD_OBJECT })
    wiredLeadData({data, error}) {
        if (data) {
            const options = this.createFieldOptions(data);
            this.objFields.Lead = options;
        } else {
            this.error = error;
        }
    }

    // Return sorted array of select options
    createFieldOptions(data) {
        let options = [];
        Object.keys(data.fields).forEach( key => {
            const field = data.fields[key];
            if (field.updateable) {
                const opt = {
                    label: field.label,
                    value: field.apiName
                }
                options.push(opt);
            }
        });
        options.sort( (a, b) => {
            const aLabel = a.label.toUpperCase();
            const bLabel = b.label.toUpperCase();
            if (aLabel > bLabel) { return 1; }
            if (aLabel < bLabel) { return -1; }
            return 0;
        });
        return options;
    }

    handleRecTypeUpdate(event) {
        this.fieldOptions = this.objFields[event.target.value];
    }

    handleChangeTypeUpdate(event) {
        this.targetChange = event.target.value;
        this.showTargetValue = (this.targetChange !== 'Any change');
    }

    handleFieldUpdate(event) {
        this.targetField = event.target.value;
    }

    handleSuccess(event) {
        // Show toast
        this.dispatchEvent(
            new ShowToastEvent({
                title: 'Success',
                message: 'Notice Rule Created',
                variant: 'success',
            }),
        );
        // Go to new record page
        const newRuleRef = {
            type: 'standard__recordPage',
            attributes: {
                'recordId': event.detail.id,
                'actionName': 'view'
            }
        }
        this[NavigationMixin.Navigate](newRuleRef);
    }
}