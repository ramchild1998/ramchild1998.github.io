import {JetView} from "webix-jet";
import {settings} from "models/settings";

export default class SettingsData extends JetView{
	config(){
		return {
			view:"datatable",
			select:true,
			scroll:"y",
			columns:[
				{ id:"cafe_name", header:"Nama Kafe", sort:"text", fillspace:true, minWidth:50 },
				{ id:"owner", header:"Pemilik", sort:"text", fillspace:true, minWidth:50 },
				{ id:"phone", header:"Telp", sort:"text", width:120 },
				{ id:"address", header:"Alamat", sort:"text", width:200, fillspace:true, minWidth:50 },
				{ id:"edit", header:"", width:35, template:"{common.editIcon()}" }
			],
			onClick:{
				"wxi-pencil":(e, id) => this.show("settings?id="+id.row)
			}
		};
	}
	init(view){
		view.sync(settings);
	}
}
