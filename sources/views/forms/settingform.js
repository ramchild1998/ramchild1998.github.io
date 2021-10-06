import {JetView} from "webix-jet";
import {settings} from "models/settings";

export default class SettingsForm extends JetView{
	config(){
		return {
			view:"form", paddingY:20, paddingX:30,
			elementsConfig:{ labelWidth:100 },
			elements:[
				{ type:"header", height:45, template:"Settings" },
				{ view:"text", name:"cafe_name", label:"Nama Kafe"},
				{ view:"text", name:"owner", label:"Nama Pemilik" },
				{ view:"text", name:"phone", label:"Telp" },
				{ view:"text", name:"address", label:"alamat" },
				{
					margin:10,
					cols:[
						{
							view:"button", value:"Cencel",
							align:"center", width:120,
							click:() => this.getBack()
						},
						{
							view:"button", value:"Save", type:"form", align:"center", width:120,
							click:() => {
								const form = this.getRoot();
								if (form.validate()) {
									//save values
									this.saveCustomer(form.getValues());
									this.getBack();
								}
							}
						},
						{}
					]
				}
			],
			rules:{
				name:webix.rules.isNotEmpty,
				email:webix.rules.isEmail
			}
		};
	}
	urlChange(form){
		settings.waitData.then(()=>{
			const id = this.getParam("id");
			if (id && settings.exists(id)){
				form.setValues(settings.getItem(id));
			}
		});
	}
	saveSetting(values){
		values.id ? settings.updateItem(values.id,values) : settings.add(values);
	}
	getBack(){
		//clear values and validation
		const form = this.getRoot();
		form.clear();
		form.clearValidation();
		//show grid
		this.show("settings");
	}
}
