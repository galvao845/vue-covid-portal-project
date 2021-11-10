import Vue from 'vue'
import axios from "axios";

export default class Request extends Vue {
  body: any = {};
  route: string = "1%3D1";
  callbackSuccess: Function = new Function();
  callbackError: Function = new Function();
  blockTouchEvents: boolean = false;
  showLoader: boolean = true;
  Type: string = "";
  countryName: string = "";

  send(): any {
    //const urlBase: string = 'https://covid-api.mmediagroup.fr/v1';
    const urlBase: string = 'https://services1.arcgis.com/0MSEUqKaxRlEPj5g/arcgis/rest/services/ncov_cases2_v1/FeatureServer/2/query?where=';
    const fieldsToRequest: string = '&outFields=Country_Region,Last_Update,Confirmed,Deaths,Recovered,Active,Incident_Rate,People_Tested,People_Hospitalized,Mortality_Rate,UID,ISO3&returnGeometry=false&outSR=4&f=json';
    //const urlReq: string = urlBase + this.route;
    if (this.countryName == '') this.countryName = this.route; 
    const urlReq: string = urlBase + this.countryName + fieldsToRequest;
    const self = this;
    axios.request({
      method : "GET",
      url : urlReq
    }).then(function(response){
      const requestData: any = response.data;
      self.callbackSuccess(requestData);
    })
    .catch(function(error){
      self.callbackError(error);
    })
    .then(function(){
        console.log('done'); 
    });
  }

}
