package de.student.dhbwvs.statisticsCalculatorBackend;

import com.fasterxml.jackson.annotation.JsonCreator;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Input {
    private int z;
    private double[] stichprobe;
    //private map???

    @JsonCreator
    public Input(int z, double[] stichprobe){
        this.z = z;
        this.stichprobe = stichprobe;
    }
}
