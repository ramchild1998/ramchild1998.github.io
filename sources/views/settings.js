import {JetView} from "webix-jet";
import SettingsData from "views/settingsdata";
import SettingsForm from "views/forms/settingform";

export default class SettingsView extends JetView{
	config(){
		return {
			rows:[
				{
					view:"toolbar", css:"subbar", padding:0,
					elements:[
						{
							height:50, css:"title", borderless:true,
							template:`<div class='header'>Kafe</div>
								<div class='details'>( Detil Kafe )</div>`
						}
					]
				},
				{
					animate:false,
					fitBiggest:true,
					localId:"multi",
					cells:[
						{ id:"gridView", $subview:SettingsData },
						{ id:"formView", $subview:SettingsForm }
					]
				}
			]
		};
	}
	urlChange(){
		// grid-form navigation
		this.$$("multi").setValue(this.getParam("id") ? "formView" : "gridView");
	}
}
