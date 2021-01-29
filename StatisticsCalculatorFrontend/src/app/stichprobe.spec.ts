import { SampleType, Stichprobe } from "./stichprobe";

describe('Stichprobe', () => {

    const explSample = [15, 15, 15, 18, 18, 18, 18, 20, 20, 20, 20, 20, 22, 22, 22, 22, 22, 22, 22, 23,
        23, 23, 23, 23, 23, 23, 23, 23, 23, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 36,
        36, 36, 36, 36, 36, 36, 49, 49, 49, 49, 49, 72, 72, 72, 72, 98, 98, 98];
    const freqDist = {'15': 3, '18': 4, '20': 5, '22': 7, '23': 10, '27': 10, '36': 7, '49': 5, '72': 4, '98': 3};

    it('should convert explicit sample to frequency distribution', () => {
        // Arrange
        const stichprobe = new Stichprobe(SampleType.explicit, explSample, {}, 25);

        // Act
        stichprobe.setFreqDistribution();

        // Asserts
        expect(stichprobe.freqDist).toEqual(freqDist);
    });

    it('should convert frequency distribution to explicit sample', () => {
        // Arrange
        const stichprobe = new Stichprobe(SampleType.absolute, [], freqDist, 25);

        // Act
        stichprobe.setExpSample();

        // Asserts
        expect(stichprobe.explSample).toEqual(explSample);
    });

});