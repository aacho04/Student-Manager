package com.studentmanager.analytics.dto;

import java.util.List;

public class SummaryResponse {
    private List<StudentSnapshot> topStudents;
    private double overallAverage;
    private double overallAttendance;

    public SummaryResponse(List<StudentSnapshot> topStudents, double overallAverage, double overallAttendance) {
        this.topStudents = topStudents;
        this.overallAverage = overallAverage;
        this.overallAttendance = overallAttendance;
    }

    public List<StudentSnapshot> getTopStudents() {
        return topStudents;
    }

    public void setTopStudents(List<StudentSnapshot> topStudents) {
        this.topStudents = topStudents;
    }

    public double getOverallAverage() {
        return overallAverage;
    }

    public void setOverallAverage(double overallAverage) {
        this.overallAverage = overallAverage;
    }

    public double getOverallAttendance() {
        return overallAttendance;
    }

    public void setOverallAttendance(double overallAttendance) {
        this.overallAttendance = overallAttendance;
    }
}
