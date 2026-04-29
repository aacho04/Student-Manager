package com.studentmanager.analytics.dto;

public class PerformanceResponse {
    private String classification;

    public PerformanceResponse(String classification) {
        this.classification = classification;
    }

    public String getClassification() {
        return classification;
    }

    public void setClassification(String classification) {
        this.classification = classification;
    }
}
