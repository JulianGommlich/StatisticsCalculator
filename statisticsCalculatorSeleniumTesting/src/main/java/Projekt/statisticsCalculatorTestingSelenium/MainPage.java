package Projekt.statisticsCalculatorTestingSelenium;

import com.codeborne.selenide.SelenideElement;

import static com.codeborne.selenide.Selenide.$;
import static com.codeborne.selenide.Selenide.$x;

public class MainPage {
    public SelenideElement header = $("#clickableTitle");

    public SelenideElement inputNumSequence = $("#numSequence");
    public SelenideElement buttonImportFile = $("#loadFile");
    public SelenideElement radioExplSample = $("#explSample");
    public SelenideElement spanExplSample = $("#explSampleSpan");
    public SelenideElement radioAbsSample = $("#absSample");
    public SelenideElement spanAbsSample = $("#absSampleSpan");
    public SelenideElement buttonDelete = $("#delete");
    public SelenideElement buttonShowResults = $("#show");

    public SelenideElement popUp = $("#popUp");
    public SelenideElement popUpExplSample = $("#explicitSample");
    public SelenideElement popUpAbsSampleReadonly = $("#absoluteFrequencyReadonly");
    public SelenideElement popUpAbsSample = $("#absoluteFrequency");
    public SelenideElement popUpButtonCalculate = $("#buttonCalculate");

    public SelenideElement popUpDelete = $("#popUpDelete");
    public SelenideElement popUpDeleteButtonAction = $("#buttonPopUpDeleteAction");
    public SelenideElement popUpDeleteButtonClose = $("#buttonPopUpDeleteClose");

    public SelenideElement popUpInvalid = $("#popUpInvalid");
    public SelenideElement popUpInvalidButtonClose = $("#buttonPopUpInvalidClose");

    public SelenideElement modalwert = $("#modalValue");
    public SelenideElement mittelwert = $("#meanValue");
    public SelenideElement median = $("#medianValue");
    public SelenideElement varianz = $("#varianceValue");
    public SelenideElement standardabweichung = $("#standardDeviation");
    public SelenideElement giniKoeffizient = $("#giniValue");
    public SelenideElement quantil005 = $("#quantile005");
    public SelenideElement quantil01 = $("#quantile01");
    public SelenideElement quantil025 = $("#quantile025");
    public SelenideElement quantil075 = $("#quantile075");
    public SelenideElement quantil09 = $("#quantile09");
    public SelenideElement quantil095 = $("#quantile095");
    public SelenideElement mittlereAbweichungZuZ = $("#meanAbsoluteDeviation");

    public SelenideElement barChart = $("#barChart");
    public SelenideElement pieChart = $("#pieChart");
    public SelenideElement empiricalDistributionChart = $("#empiricalDistributionChart");
    public SelenideElement lorenzChart = $("#lorenzChart");
}
