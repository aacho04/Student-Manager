package com.studentmanager.analytics.dto;

import java.util.List;

public class SummaryRequest {
    private List<StudentSnapshot> students;

    public List<StudentSnapshot> getStudents() {
        return students;
    }

    public void setStudents(List<StudentSnapshot> students) {
        this.students = students;
    }
}
