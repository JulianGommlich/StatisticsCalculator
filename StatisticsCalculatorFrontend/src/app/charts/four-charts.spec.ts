import { FourCharts } from "./four-charts";

describe('Four-Charts', () => {

    let fourCharts: FourCharts
    const mockFreqDistKeys = ['1', '2', '3'];
    const mockFreqDistValues = [2, 5, 4];

    beforeAll(() => {
        fourCharts = new FourCharts();
        fourCharts.expliziteStichprobe = [1, 1, 2, 2, 2, 2, 2, 3, 3, 3, 3];
    });


    it('should set the values for bar and pie charts correctly', () => {
        // Arrange
        const expectedOutput = [
            { 'name': '1', 'value': 2 },
            { 'name': '2', 'value': 5 },
            { 'name': '3', 'value': 4 }
        ]

        // Act
        fourCharts.setBarAndPieChartValues(mockFreqDistKeys, mockFreqDistValues);

        // Assert
        expect(fourCharts.barAndPieChartValues).toEqual(expectedOutput);
    });


    it('should set the values for the empirical distribution function charts correctly', () => {
        // Arrange
        const expectedOutput = [
            {
                'name': '0',
                'series': [
                    { 'name': '-9', 'value': 0 },
                    { 'name': '1',  'value': 0 }
                ]
            },
            {
                'name': '1',
                'series': [
                    { 'name': '1', 'value': Math.round(2/11 * 1000)/1000 },
                    { 'name': '2', 'value': Math.round(2/11 * 1000)/1000 }
                ]
            },
            {
                'name': '2',
                'series': [
                    { 'name': '2', 'value': Math.round(7/11 * 1000)/1000 },
                    { 'name': '3', 'value': Math.round(7/11 * 1000)/1000 }
                ]
            },
            {
                'name': '3',
                'series': [
                    { 'name': '3',  'value': 1 },
                    { 'name': '13', 'value': 1 }
                ]
            }
        ]

        // Act
        fourCharts.setEmpiricalDistributionChartValues(mockFreqDistKeys, mockFreqDistValues);

        // Assert
        expect(fourCharts.empiricalDistributionChartValues).toEqual(expectedOutput);
    });


    it('should set the values for the lorenz curve charts correctly', () => {
        // Arrange
        const expectedOutput = [
            {
                'name': 'Lorenzkurve',
                'series': [
                    { 'name': '0', 'value': 0 },
                    { 'name': (Math.round(2/11 * 1000)/1000).toString(), 'value': Math.round(2/24 * 1000)/1000 },
                    { 'name': (Math.round(7/11 * 1000)/1000).toString(), 'value': Math.round(12/24 * 1000)/1000 },
                    { 'name': '1', 'value': 1 }
                ]
            },
            {
                'name': 'Referenz',
                'series': [
                    { 'name': '0', 'value': 0 },
                    { 'name': '1', 'value': 1 }
                ]
            }
        ]

        // Act
        fourCharts.setLorenzChartValues(mockFreqDistKeys, mockFreqDistValues);

        // Assert
        expect(fourCharts.lorenzChartValues).toEqual(expectedOutput);
    });
});