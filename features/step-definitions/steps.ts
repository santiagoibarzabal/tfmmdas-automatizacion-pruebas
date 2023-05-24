import { Given, When, Then } from '@wdio/cucumber-framework';
import ResultsPage from '../pageobjects/results.page';
import SearchPage from '../pageobjects/search.page';

const pages = {
    results: new ResultsPage(),
    search: new SearchPage(),
}

Given("Access to the home page", async ()=> {
    await pages.search.open();
    await pages.search.cookies();
});

When("Searching a flight from {string}", async (tripFrom)=>{
    await pages.search.typeOriginInput(tripFrom);
});

When("Searching a flight to {string}", async (tripTo) =>{
    await pages.search.typeDestinationInput(tripTo);
});

When("Selecting type {string}", async (tripType) =>{
    await pages.search.selectTripType(tripType);
});

When("Searching with date of departure {string} of {string}", async (DateTripDay, DateTripMonth) =>{
    await pages.search.selectDate(DateTripDay, DateTripMonth);
});

Then("An available flight is returned", async () =>{
    await pages.results.flightExists();
});

