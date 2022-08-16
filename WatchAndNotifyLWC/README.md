# Watch and Notify LWC

A Lightning Web Component for [Watch and Notify](https://github.com/atsutton/WatchAndNotify).

This add-on provides an alternative way to create Notice Rules. 

The steps under 'Setup' will push a Lightning page with the component to your scratch org. The page is automatically added to the Watch And Notify Lightning app.

## Setup

First, if you have not already, go to [Watch and Notify](https://github.com/atsutton/WatchAndNotify) and complete the setup. 

**Clone the repo:**

```````````````````````````````````
git clone https://github.com/atsutton/WatchAndNotifyLWC

cd WatchAndNotifyLWC
```````````````````````````````````

**Set your default dev hub (if not set globally):**
```````````````````````````````````
sfdx force:config:set defaultdevhubusername=[YOUR DEV HUB]
```````````````````````````````````

**Push to the scratch org you made previously**

```````````````````````````````````
sfdx force:source:push -u Scratch1

sfdx force:org:open -u Scratch1
```````````````````````````````````

Now you should see a new tab titled 'Notice Rule LWC' in the 'Watch and Notify' Lightning app. 


## Details

This feature is built using the [Lightning Web Component](https://developer.salesforce.com/docs/component-library/documentation/lwc/lwc.get_started_introduction) model.

It uses Javascript and Lightning Data Service, rather than Apex controllers, to handle dynamic page updates and metadata fetching. 

### Form

Several of the form fields update dynamically: 

- Changes to the 'Target Record Type' will auto-update the list of options under 'Target Field'. 

- Setting the 'Target Change' field to 'Any change' will auto-hide the 'Target Value' field.

### Permission Set

The included permission set is a modified version of the one for Watch and Notify. It adds a permission to view the tab / Lightning page corresponding to this add-on. 
