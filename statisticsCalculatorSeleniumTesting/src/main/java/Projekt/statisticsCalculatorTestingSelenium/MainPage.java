package Projekt.statisticsCalculatorTestingSelenium;

import com.codeborne.selenide.SelenideElement;

import static com.codeborne.selenide.Selenide.$;
import static com.codeborne.selenide.Selenide.$x;

public class MainPage {
    public SelenideElement inputNumSequence = $("#numSequence");
    public SelenideElement buttonImportFile = $("#importFile");
    public SelenideElement inputMeanDeviation = $("#meanDeviation");
    public SelenideElement radioExplSample = $("#explSample");
    public SelenideElement radioAbsSample = $("#absSample");
    public SelenideElement buttonShowResults = $("#show");

}
