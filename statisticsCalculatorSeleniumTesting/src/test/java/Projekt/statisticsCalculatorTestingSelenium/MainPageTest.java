package Projekt.statisticsCalculatorTestingSelenium;

import com.codeborne.selenide.Configuration;
import com.codeborne.selenide.Selenide;
import com.codeborne.selenide.logevents.SelenideLogger;
import io.qameta.allure.selenide.AllureSelenide;
import org.junit.jupiter.api.*;

import static com.codeborne.selenide.Selenide.*;
import static org.junit.jupiter.api.Assertions.*;

import static com.codeborne.selenide.Condition.attribute;
import static com.codeborne.selenide.Condition.visible;
import static com.codeborne.selenide.Selectors.*;

public class MainPageTest {
    private final MainPage mainPage = new MainPage();

    @BeforeAll
    public static void setUpAllure() {
        SelenideLogger.addListener("allure", new AllureSelenide());
        open("http://localhost:4200/");
    }

    @BeforeEach
    public void setUp() {
        Configuration.startMaximized = true;
        assertEquals("StatisticsCalculatorFrontend", Selenide.title());
    }

    @AfterEach
    public void reload() {
        refresh();
    }

    @Test
    public void clickOnImportFile() {
        mainPage.buttonImportFile.shouldBe(visible);
        mainPage.buttonImportFile.click();
    }

    @Test
    public void inputNum() {
        mainPage.inputNumSequence.shouldBe(visible);
        mainPage.inputNumSequence.hover();

        mainPage.inputNumSequence.sendKeys("(29, 215, 155, 129, 1856)");
    }

    @Test
    public void inputDeviation() {
        mainPage.inputMeanDeviation.shouldBe(visible);
        mainPage.inputMeanDeviation.click();

        mainPage.inputMeanDeviation.sendKeys("25185");
    }

    @Test
    public void expSample() {
        mainPage.radioExplSample.shouldBe(visible);
        assertFalse(mainPage.radioExplSample.isSelected());
        mainPage.radioExplSample.click();
        assertTrue(mainPage.radioExplSample.isSelected());
        assertFalse(mainPage.radioAbsSample.isSelected());
    }

    @Test
    public void absSample() {
        mainPage.radioAbsSample.shouldBe(visible);
        assertFalse(mainPage.radioAbsSample.isSelected());
        mainPage.radioAbsSample.click();
        assertTrue(mainPage.radioAbsSample.isSelected());
        assertFalse(mainPage.radioExplSample.isSelected());
    }

    @Test
    public void buttonShowResults() {
        mainPage.buttonShowResults.shouldBe(visible);
        mainPage.buttonShowResults.click();
    }
}
