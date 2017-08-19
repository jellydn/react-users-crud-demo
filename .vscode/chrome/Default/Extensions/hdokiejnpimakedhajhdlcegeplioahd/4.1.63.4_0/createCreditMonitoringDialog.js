var CreateCreditMonitoringDialog=function(t){Dialog.call(this,t,{additionalHeaderClasses:["icon"],dynamicHeight:!0,title:Strings.translateString("Create Credit Monitoring Profile"),nextButtonText:Strings.translateString("Create New Profile")})};CreateCreditMonitoringDialog.prototype=Object.create(Dialog.prototype),CreateCreditMonitoringDialog.prototype.constructor=CreateCreditMonitoringDialog,CreateCreditMonitoringDialog.prototype.initialize=function(){Dialog.prototype.initialize.apply(this,arguments),this.nextButton.addClass("dynamicWidth")},CreateCreditMonitoringDialog.prototype.setup=function(){if(function(t){for(var e=[],i=LPProxy.getFormFills(),o=0,n=i.length;o<n;++o){var r=i[o];"1"!==r._model._data.profiletype&&e.push(r)}t.containers.formFill=new Container(e,{display:VaultItemBaseDisplay.prototype.DISPLAY_LIST,additionalItemClasses:"creditMonitoringItem",allowDrag:!1,allowDrop:!1,excludeActions:[Constants.ACTION_SHARE,Constants.ACTION_DELETE],multiSelect:!1,publishSelect:!1,selectCallback:function(e){0===e?t.nextButton.text(Strings.translateString("Create New Profile")):t.nextButton.text(Strings.translateString("Enable Credit Monitoring"))}})}(this),this.containers.formFill.isEmpty())document.getElementById("createCreditMonitoringProfile").textContent="None available";else{var t=document.getElementById("createCreditMonitoringProfile");LPTools.removeDOMChildren(t),this.containers.formFill.initialize(t)}this.nextButton.text(Strings.translateString("Create New Profile")),Dialog.prototype.setup.apply(this,arguments)},CreateCreditMonitoringDialog.prototype.handleSubmit=function(){var t=this.containers.formFill.getSelectedModelItems();if(t.length>0){var e=t[0];dialogs.formFill.open({vaultItem:e,show:!1,postSetup:function(t){t.inputFields.creditmon.setValue(!0),t.performValidate({data:t.getData(!1),callback:function(e){e?t.submit():(t.setTitle(Strings.translateString("Enable Credit Monitoring")),t.$element.show(),dialogs.alert.open({title:Strings.translateString("Error"),text:Strings.translateString("Please correct the validation errors and then click Save to enable credit monitoring.")}))}})}})}else dialogs.formFill.open({title:this.getTitle(),defaultData:{creditmon:!0}});this.close(!0)};