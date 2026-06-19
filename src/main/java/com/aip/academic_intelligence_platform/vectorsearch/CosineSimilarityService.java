package com.aip.academic_intelligence_platform.vectorsearch;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CosineSimilarityService {
    public double calculate(List<Double> vectorA,List<Double> vectorB){
        double dotProduct=0;
        double normA=0;
        double normB=0;
        for(int i=0;i< vectorA.size();i++){
            dotProduct+=vectorA.get(i)*vectorB.get(i);
            normA+=Math.pow(vectorA.get(i),2);
            normB+=Math.pow(vectorB.get(i),2);

        }
        return dotProduct/(Math.sqrt(normA)*Math.sqrt(normB));
    }
}
