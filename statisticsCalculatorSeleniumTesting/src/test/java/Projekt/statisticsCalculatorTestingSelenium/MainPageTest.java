package Projekt.statisticsCalculatorTestingSelenium;

import com.codeborne.selenide.Configuration;
import com.codeborne.selenide.Selenide;
import com.codeborne.selenide.WebDriverRunner;
import com.codeborne.selenide.logevents.SelenideLogger;
import io.qameta.allure.selenide.AllureSelenide;
import org.junit.jupiter.api.*;
import org.openqa.selenium.interactions.Actions;

import static com.codeborne.selenide.Condition.*;
import static com.codeborne.selenide.Selenide.*;
import static org.junit.jupiter.api.Assertions.*;

import static com.codeborne.selenide.Selectors.*;

public class MainPageTest {
    private final MainPage mainPage = new MainPage();

    @BeforeAll
    public static void setUpAllure() {
        SelenideLogger.addListener("allure", new AllureSelenide());
        open("http://localhost:4200/");
        assertEquals("http://localhost:4200/calculator", WebDriverRunner.getWebDriver().getCurrentUrl());
    }

    @BeforeEach
    public void setUp() {
        Configuration.startMaximized = true;
        assertEquals("StatisticsCalculatorFrontend", Selenide.title());
    }

    @AfterEach
    public void reload() {
        open("http://localhost:4200/");
    }

    @Test
    public void clickOnImportFile() {
        mainPage.buttonImportFile.shouldBe(visible);
        mainPage.buttonImportFile.click();
    }

    @Test
    public void expSample() {
        mainPage.spanExplSample.shouldNotBe(visible);
        assertFalse(mainPage.radioExplSample.isSelected());
        mainPage.spanExplSample.click();
        mainPage.spanExplSample.shouldBe(visible);
        assertTrue(mainPage.radioExplSample.isSelected());
        assertFalse(mainPage.radioAbsSample.isSelected());
    }

    @Test
    public void absSample() {
        mainPage.spanAbsSample.shouldNotBe(visible);
        assertFalse(mainPage.radioAbsSample.isSelected());
        mainPage.spanAbsSample.click();
        mainPage.spanAbsSample.shouldBe(visible);
        assertTrue(mainPage.radioAbsSample.isSelected());
        assertFalse(mainPage.radioExplSample.isSelected());
    }

    @Test
    public void zInput() {
        mainPage.inputZ.shouldBe(visible);

        mainPage.inputZ.sendKeys("25");
        assertEquals("25", mainPage.inputZ.getValue());
        mainPage.inputZ.setValue("");

        mainPage.inputZ.sendKeys("25,5");
        assertEquals("25.5", mainPage.inputZ.getValue());
        mainPage.inputZ.setValue("");

        mainPage.inputZ.sendKeys("-25");
        assertEquals("-25", mainPage.inputZ.getValue());
        mainPage.inputZ.setValue("");

        mainPage.inputZ.sendKeys("0");
        assertEquals("0", mainPage.inputZ.getValue());
        mainPage.inputZ.setValue("");

        mainPage.inputZ.sendKeys("!");
        assertEquals("", mainPage.inputZ.getValue());

        mainPage.inputZ.sendKeys("a");
        assertEquals("", mainPage.inputZ.getValue());
    }

    @Test
    public void buttonDelete() {
        mainPage.spanExplSample.click();
        mainPage.inputNumSequence.sendKeys("1;3;3;7");
        mainPage.inputZ.sendKeys("25");

        mainPage.buttonDelete.shouldBe(visible);
        mainPage.buttonDelete.click();

        mainPage.popUpDelete.shouldBe(visible);
        mainPage.popUpDeleteButtonClose.click();

        mainPage.popUpDelete.shouldNotBe(visible);
        assertTrue(mainPage.radioExplSample.isSelected());
        assertEquals("25", mainPage.inputZ.getValue());
        mainPage.buttonDelete.click();

        mainPage.popUpDelete.shouldBe(visible);
        mainPage.popUpDeleteButtonAction.click();

        mainPage.popUpDelete.shouldNotBe(visible);
        assertFalse(mainPage.radioExplSample.isSelected());
        assertFalse(mainPage.radioAbsSample.isSelected());
        assertEquals("", mainPage.inputZ.getValue());
    }

    @Test
    public void buttonShowResults() {
        mainPage.spanExplSample.click();
        mainPage.inputNumSequence.setValue("1;3;3;7");
        mainPage.inputZ.sendKeys("25");

        mainPage.buttonShowResults.shouldBe(visible);
        mainPage.buttonShowResults.click();

        mainPage.popUp.shouldBe(visible);
        mainPage.popUpExplSample.shouldBe(visible);
        mainPage.popUpExplSample.shouldNotBe(readonly);
        mainPage.popUpAbsSampleReadonly.shouldBe(visible);
        mainPage.popUpAbsSampleReadonly.shouldBe(readonly);
        mainPage.popUpAbsSample.shouldNotBe(visible);
        assertEquals("1;3;3;7", mainPage.popUpExplSample.getValue());
        assertEquals("(1; 1); (3; 2); (7; 1)", mainPage.popUpAbsSampleReadonly.getValue());

        Actions builder = new Actions(WebDriverRunner.getWebDriver());
        builder.moveToElement(mainPage.popUp, -200, -200).click().build().perform();

        mainPage.popUp.shouldNotBe(visible);
        mainPage.spanAbsSample.click();
        mainPage.inputNumSequence.setValue("(4; 2); (13; 37)");
        assertEquals("25", mainPage.inputZ.getValue());
        mainPage.buttonShowResults.click();

        mainPage.popUp.shouldBe(visible);
        mainPage.popUpAbsSample.shouldBe(visible);
        mainPage.popUpAbsSample.shouldNotBe(readonly);
        mainPage.popUpExplSample.shouldNotBe(visible);
        mainPage.popUpAbsSampleReadonly.shouldNotBe(visible);
        assertEquals("(4; 2); (13; 37)", mainPage.popUpAbsSample.getValue());
    }

    @Test
    public void validationRules() {
        mainPage.buttonShowResults.click();

        mainPage.popUpInvalid.shouldBe(visible);
        mainPage.popUpInvalidButtonClose.click();

        mainPage.popUpInvalid.shouldNotBe(visible);
        mainPage.spanAbsSample.click();
        mainPage.buttonShowResults.click();

        mainPage.popUpInvalid.shouldBe(visible);
        mainPage.popUpInvalidButtonClose.click();

        mainPage.popUpInvalid.shouldNotBe(visible);
        assertTrue(mainPage.radioAbsSample.isSelected());
        mainPage.spanExplSample.click();
        mainPage.buttonShowResults.click();

        mainPage.popUpInvalid.shouldBe(visible);
        mainPage.popUpInvalidButtonClose.click();

        mainPage.popUpInvalid.shouldNotBe(visible);
        assertTrue(mainPage.radioExplSample.isSelected());
        mainPage.inputZ.sendKeys("25");
        mainPage.buttonShowResults.click();

        mainPage.popUpInvalid.shouldBe(visible);
        mainPage.popUpInvalidButtonClose.click();

        mainPage.popUpInvalid.shouldNotBe(visible);
        assertEquals("25", mainPage.inputZ.getValue());

        mainPage.inputNumSequence.sendKeys("1;3;3;7");
        mainPage.buttonShowResults.click();

        mainPage.popUp.shouldBe(visible);
        mainPage.popUpInvalid.shouldNotBe(visible);
    }

    @Test
    public void correctResultsForExplicitSample() {
        mainPage.spanExplSample.click();
        mainPage.inputNumSequence.setValue("15; 15; 15; 18; 18; 18; 18; 20; 20; 20; 20; 20; 22; 22; 22; 22; 22; 22; " +
                "22; 23; 23; 23; 23; 23; 23; 23; 23; 23; 23; 27; 27; 27; 27; 27; 27; 27; 27; 27; 27; 36; 36; 36; 36; " +
                "36; 36; 36; 49; 49; 49; 49; 49; 72; 72; 72; 72; 98; 98; 98");
        mainPage.inputZ.sendKeys("25");
        mainPage.buttonShowResults.click();

        mainPage.popUp.shouldBe(visible);
        mainPage.popUpButtonCalculate.click();

        assertEquals("http://localhost:4200/results", WebDriverRunner.getWebDriver().getCurrentUrl());
        assertEquals("23, 27", mainPage.modalwert.getValue());
        assertEquals("33,62", mainPage.mittelwert.getValue());
        assertEquals("25", mainPage.median.getValue());
        assertEquals("431,1", mainPage.varianz.getValue());
        assertEquals("20,76", mainPage.standardabweichung.getValue());
        assertEquals("0,29", mainPage.giniKoeffizient.getValue());
        assertEquals("15", mainPage.quantil005.getValue());
        assertEquals("18", mainPage.quantil01.getValue());
        assertEquals("22", mainPage.quantil025.getValue());
        assertEquals("36", mainPage.quantil075.getValue());
        assertEquals("72", mainPage.quantil09.getValue());
        assertEquals("98", mainPage.quantil095.getValue());
        assertEquals("12,9", mainPage.mittlereAbweichungZuZ.getValue());
    }

    @Test
    public void correctResultsForAbsoluteDistribution() {
        mainPage.spanAbsSample.click();
        mainPage.inputNumSequence.setValue("(15; 3); (18; 4); (20; 5); (22; 7); (23; 10); (27; 10); (36; 7); " +
                "(49; 5); (72; 4); (98; 3)");
        mainPage.inputZ.sendKeys("25");
        mainPage.buttonShowResults.click();

        mainPage.popUp.shouldBe(visible);
        mainPage.popUpButtonCalculate.click();

        assertEquals("http://localhost:4200/results", WebDriverRunner.getWebDriver().getCurrentUrl());
        assertEquals("23, 27", mainPage.modalwert.getValue());
        assertEquals("33,62", mainPage.mittelwert.getValue());
        assertEquals("25", mainPage.median.getValue());
        assertEquals("431,1", mainPage.varianz.getValue());
        assertEquals("20,76", mainPage.standardabweichung.getValue());
        assertEquals("0,29", mainPage.giniKoeffizient.getValue());
        assertEquals("15", mainPage.quantil005.getValue());
        assertEquals("18", mainPage.quantil01.getValue());
        assertEquals("22", mainPage.quantil025.getValue());
        assertEquals("36", mainPage.quantil075.getValue());
        assertEquals("72", mainPage.quantil09.getValue());
        assertEquals("98", mainPage.quantil095.getValue());
        assertEquals("12,9", mainPage.mittlereAbweichungZuZ.getValue());
    }

    @Test
    public void headerLeadsToViewOne() {
        mainPage.spanExplSample.click();
        mainPage.inputNumSequence.setValue("1;3;3;7");
        mainPage.inputZ.sendKeys("25");
        mainPage.buttonShowResults.click();

        mainPage.popUp.shouldBe(visible);
        mainPage.popUpButtonCalculate.click();

        assertEquals("http://localhost:4200/results", WebDriverRunner.getWebDriver().getCurrentUrl());
        mainPage.header.click();

        assertEquals("http://localhost:4200/calculator", WebDriverRunner.getWebDriver().getCurrentUrl());
        assertFalse(mainPage.radioExplSample.isSelected());
        assertFalse(mainPage.radioAbsSample.isSelected());
        assertEquals("", mainPage.inputZ.getValue());
    }

    @Test
    public void buttonReturn() {
        mainPage.spanExplSample.click();
        mainPage.inputNumSequence.setValue("1;3;3;7");
        mainPage.inputZ.sendKeys("25");
        mainPage.buttonShowResults.click();

        mainPage.popUp.shouldBe(visible);
        mainPage.popUpButtonCalculate.click();

        assertEquals("http://localhost:4200/results", WebDriverRunner.getWebDriver().getCurrentUrl());
        mainPage.buttonReturn.click();

        assertEquals("http://localhost:4200/calculator;numSequence=1,3,3,7;sampleType=explizit;valueZInput=25",
                WebDriverRunner.getWebDriver().getCurrentUrl());
        assertTrue(mainPage.radioExplSample.isSelected());
        assertFalse(mainPage.radioAbsSample.isSelected());
        assertEquals("25", mainPage.inputZ.getValue());
    }

    @Test
    public void diagramsAreShown() {
        mainPage.spanExplSample.click();
        mainPage.inputNumSequence.setValue("1;3;3;7");
        mainPage.inputZ.sendKeys("25");
        mainPage.buttonShowResults.click();

        mainPage.popUp.shouldBe(visible);
        mainPage.popUpButtonCalculate.click();

        assertEquals("http://localhost:4200/results", WebDriverRunner.getWebDriver().getCurrentUrl());
        mainPage.barChart.shouldBe(visible);
        mainPage.pieChart.shouldBe(visible);
        mainPage.empiricalDistributionChart.shouldBe(visible);
        mainPage.lorenzChart.shouldBe(visible);
    }
}
