/*
    TODO: @Gaurav
    Implement methods for creating, updating, getting, deleting assessments. 
    Also need to implement submitting assessments by students.
    Submit will be two types, submit a question or submit an assessment.
    1. getAssessmentForChapter(courseId, chapterId) -> get all assessments for a chapter
    2. submitAnswerForQuestion(studentId, assessmentId, question, answer) -> submit answer for a question
        When answer is submitted, we have to compare the answer given by the student to the answer which is present in Question object
    3. submitAssessment(studentId, assessmentId, answers) -> submit answers for all questions in an assessment
        returns the score of the student, how many questions are correct and how many are wrong
*/