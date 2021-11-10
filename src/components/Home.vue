<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top">
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <a class="navbar-brand text-danger" href="#">CORONAVÍRUS PORTAL PROJECT</a>
      </div>
      <div class="form-inline my-2 my-lg-0">
        <a href="https://github.com/galvao845" target="_blank"> <i className="bi-github" role="img" aria-label="GitHub" />My GitHub</a>
      </div>
    </nav>
    <main class="paddingFisrtDivs position-static">
      <div>
      </div>
      <div class="container">
        <carousel 
          :loop="true" 
          :autoplay="true" 
          :autoplayTimeout="1500"
          :paginationEnabled="false"
          :centerMode="true"
          :paginationSize="3"
          :perPage="3"
          class="carouselDiv"
        >
          <slide
            v-for="(eachCountry, indexInArray) in allCovidData"
            :index="indexInArray"
            :key="indexInArray"
          >
          <div>
            <p  class="paddingDivs d-flex justify-content-center">{{eachCountry.Country_Region + ' (' + eachCountry.ISO3 + ')'}}</p>
          </div>
          </slide>
        </carousel>
      </div>
      <form class="paddingDivs d-flex justify-content-center">
        <div class="input-group mb-3 col-md-6">
          <input type="text" class="form-control" placeholder="Enter with the name of the country to be searched" v-model="countryName">
          <div class="input-group-append">
            <button class="btn btn-danger" type="button" v-on:click="getDataFromCountry()">Search</button>
          </div>
        </div>
      </form>

      <div v-if="countryFinded == null" class="paddingDivs container carouselDiv responseDiv">
        <h3 class="finalpadding">Welcome</h3>
        <h1 class="finalpadding navbar-brand">First off all:  <h2 class="finalpadding navbar-brand text-danger">Get vaccinated!</h2></h1>
        <p class="finalpadding">This project was developed in order to learn more about vue and the coronavirus API made avaible by unstats.</p>
        <p class="finalpadding">
          The API Documentation can be finded in
          <a href="https://covid-19-data.unstatshub.org" target="_blank"> <i className="bi-github" role="img" aria-label="ApiLink" />covid-19-data.unstatshub.org</a>
        </p>
        <p class="finalpadding">
          It is good to emphasize that I cannot guarantee the veracity and accuracy of the data presented by the API, but I hope that they are as updated and accurate as possible.
        </p>      
      </div>
            
      <div v-else-if="countryFinded == true" class="paddingDivs container carouselDiv responseDiv">
        <div class="d-flex justify-content-center finalpadding text-danger">
          <h3 v-if="typeof allCovidDataFromCountry.Country_Region != 'undefined' && allCovidDataFromCountry.Country_Region != null"> {{  allCovidDataFromCountry.Country_Region + ' (' +  allCovidDataFromCountry.ISO3 + ')' }}</h3>
          <h3 v-else> Country Region information NotFound</h3>
        </div>
        <p class="d-flex justify-content-left removingPaddingBottonBoostraps" v-if="typeof allCovidDataFromCountry.Confirmed != 'undefined' && allCovidDataFromCountry.Confirmed != null"> Confirmed : {{  allCovidDataFromCountry.Confirmed }}</p>
        <p class="d-flex justify-content-left removingPaddingBottonBoostraps" v-else> Confirmed : information NotFound</p>
        <p class="d-flex justify-content-left removingPaddingBottonBoostraps" v-if="typeof allCovidDataFromCountry.Deaths != 'undefined' && allCovidDataFromCountry.Deaths != null"> Deaths : {{  allCovidDataFromCountry.Deaths }}</p>
        <p class="d-flex justify-content-left removingPaddingBottonBoostraps" v-else> Deaths : information NotFound</p>
        <p class="d-flex justify-content-left removingPaddingBottonBoostraps" v-if="typeof allCovidDataFromCountry.Recovered != 'undefined' && allCovidDataFromCountry.Recovered != null"> Recovered : {{  allCovidDataFromCountry.Recovered }}</p>
        <p class="d-flex justify-content-left removingPaddingBottonBoostraps" v-else> Recovered : information NotFound</p>
        <p class="d-flex justify-content-left removingPaddingBottonBoostraps" v-if="typeof allCovidDataFromCountry.Incident_Rate != 'undefined' && allCovidDataFromCountry.Incident_Rate != null"> Incident Rate : {{  allCovidDataFromCountry.Incident_Rate }}</p>
        <p class="d-flex justify-content-left removingPaddingBottonBoostraps" v-else> Incident Rate : information NotFound</p>
        <p class="d-flex justify-content-left removingPaddingBottonBoostraps" v-if="typeof allCovidDataFromCountry.Mortality_Rate != 'undefined' && allCovidDataFromCountry.Mortality_Rate != null"> Mortality Rate : {{  allCovidDataFromCountry.Mortality_Rate }}</p>
        <p class="d-flex justify-content-left removingPaddingBottonBoostraps" v-else> Mortality Rate :information NotFound</p>
        <p class="d-flex justify-content-left removingPaddingBottonBoostraps" v-if="typeof allCovidDataFromCountry.People_Hospitalized != 'undefined' && allCovidDataFromCountry.People_Hospitalized != null"> People Hospitalized : {{  allCovidDataFromCountry.People_Hospitalized }}</p>
        <p class="d-flex justify-content-left removingPaddingBottonBoostraps" v-else> People Hospitalized : information NotFound</p>
        <p class="d-flex justify-content-left removingPaddingBottonBoostraps" v-if="typeof allCovidDataFromCountry.People_Tested != 'undefined' && allCovidDataFromCountry.People_Tested != null"> People Tested : {{  allCovidDataFromCountry.People_Tested }}</p>
        <p class="d-flex justify-content-left removingPaddingBottonBoostraps" v-else> People Tested : information NotFound</p>
        <p class="d-flex justify-content-left removingPaddingBottonBoostraps" v-if="typeof allCovidDataFromCountry.Last_Update != 'undefined' && allCovidDataFromCountry.Last_Update != null"> Last Update : {{  allCovidDataFromCountry.Last_Update }}</p>
        <p class="d-flex justify-content-left removingPaddingBottonBoostraps" v-else> Last Update : information NotFound</p>
        <p class="d-flex justify-content-left removingPaddingBottonBoostraps finalpadding" v-if="typeof allCovidDataFromCountry.UID != 'undefined' && allCovidDataFromCountry.UID != null"> UID : {{  allCovidDataFromCountry.UID }}
        <p class="d-flex justify-content-left removingPaddingBottonBoostraps finalpadding" v-else> UID : information NotFound</p>
      </div>
      <div v-else-if="countryFinded == false" class="paddingDivs">
        <p>We didn't find any Country with this name, try again.</p>        
      </div>
    </main>  
    <footer>
      <p><a href="https://github.com/galvao845" target="_blank"> <i className="bi-github" role="img" aria-label="GitHub" /> Developed by João Victor Fonte</a></p>
    </footer>
  </div>
</template>

<style>
.removingPaddingBottonBoostraps {
  margin-top: -1% ;
}
.finalpadding {
  padding-bottom: 1%;
}
.responseDiv {
  width: 48% !important;
}
footer {
  bottom: 0;
  text-align: center;
  width: 100%;
  position: fixed;
}

.carouselDiv {
  box-shadow: 0px 0px 7px darkgray;
  border-radius: 15px;
  opacity: 0.9;
}

a:link, a:visited, a:active {
	text-decoration:none;
}

a:hover {
  text-decoration: none;
  color:red;
}

a {
  margin-top: 6px;
  text-decoration: none;
  color: black;
}

.paddingFisrtDivs {
  margin-top:8%;
}

.paddingDivs {
  margin-top: 4%;
}

</style>

<script lang="ts">

import Request from '../controllers/Request';
import { Carousel, Slide } from 'vue-carousel';

export default {
    components: {
      Carousel,
      Slide
    },
    data() {
        return {
            allCovidData : [],
            allCovidDataFromCountry : [],
            allArraysCovidDataFromCountry : [],
            countryName : '',
            countryFinded : null,
            countryNameSearched : '',
        }
    },
    mounted() {
      this.getCovidData();
    },
    methods: {
      getCovidData() {
        let scope = this;
        const req  = new Request();
        //req.route  = '/cases';
        req.callbackSuccess = (response) => {
          response = response.features;
          Object.keys(response).forEach(function(eachLineData) {
            let dataCountryData = response[eachLineData] ? response[eachLineData] : null;
            if (dataCountryData != null) {
              dataCountryData = dataCountryData.attributes;
              if (typeof dataCountryData.Country_Region == 'string') {
                scope.allCovidData.push(dataCountryData);
              }
            }
          });
        };
        req.callbackError = (error) => {
          console.log(error);
        }
        req.send();
      },
      getDataFromCountry() {
        if (this.countryName == '') return false;
        //this.countryName = this.countryName.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => {return str.toUpperCase();});
        let scope = this;
        const req  = new Request();
        //req.route  =  '/cases?country=' + this.countryName;
        req.route  =  "Country_Region%20%3D%20'" + this.countryName.toUpperCase() + "'";
        req.callbackSuccess = (response) => {
          scope.countryFinded = response.features[0] ? true : false;
          if (scope.countryFinded) {
            scope.allCovidDataFromCountry = response.features[0].attributes;
            this.countryNameSearched = this.countryName;
          }
          this.countryName = '';
        };
        req.callbackError = (error) => {
          this.countryName = '';
          console.log(error);
        }
        req.send();
      }  
    }
}

</script>