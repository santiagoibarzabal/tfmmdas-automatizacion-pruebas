import Page from './page';

export default class SearchPage extends Page {
    /**
     * define selectors using getter methods
     */
    public get acceptCookiesBtn () {
        return $('#onetrust-accept-btn-handler');
    }

    public get fromInput () {
        return $('#originInput');
    }

    public get toInput () {
        return $('#destinationInput');
    }

    public get submitBtn () {
        return $('#btnSubmitHomeSearcher');
    }

    public get returnRadioButton (){
        return $('#returnLabel .radio-circle_outer');
    }

    public get oneWayRadioButton (){
        return $('#oneWayLabel');
    }

    public get fromItem(){
        return $('.list__item:nth-child(3)');
    }

    public get toItem() {
        return $('.list__item:nth-child(2)');
    }

    public get clickableOriginOrDestination() {
        return $('.liStation');
    }

    public get month(){
        return $('.ui-datepicker-month');
    }
    public get day(){
        return "#calendarDaysTable2023";
    }
    public get nextMonthBtn(){
        return $('#nextButtonCalendar');
    }


    /**
     * overwrite specific options to adapt it to page object
     */
    public open () {
        return super.open('es');
    }
    public async cookies() {
        return await this.acceptCookiesBtn.click();
    }

    public async typeOriginInput(origin){
        await this.fromInput.click();
        await this.fromInput.setValue(origin);
        await this.fromItem.waitForDisplayed();
        return this.clickableOriginOrDestination.click();

    }
    async typeDestinationInput(destination){
        await this.toInput.click();
        await this.toInput.setValue(destination);
        await this.toItem.waitForDisplayed();
        await this.clickableOriginOrDestination.click();
    }
    async selectTripType(tripType){
        if(tripType === "Ida"){
            await this.oneWayRadioButton.waitForDisplayed();
            await new Promise(r => setTimeout(r, 2000));
            return await this.oneWayRadioButton.click();
        }
        if (tripType !== "Ida") {
            await this.returnRadioButton.waitForDisplayed();
            return await this.returnRadioButton.click();
        }
    }

    async selectDate(DateTripDay, DateTripMonth){
        let selectedMonth = await this.month.getText();
        while(selectedMonth != DateTripMonth){
            await this.nextMonthBtn.click();
            await new Promise(r => setTimeout(r, 2000));
            await this.month.waitForDisplayed();
            selectedMonth = await this.month.getText();
        }
        const monthNumber = new Date(`${DateTripMonth} 1, 2000`).toLocaleString("es-ES", { month: "numeric" });
        let dayToSelect = $(this.day + monthNumber + DateTripDay);
        await dayToSelect.click();
        await this.submitBtn.click();
    }
}
