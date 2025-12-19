const scoreTable = document.getElementById("score-table-body");
const calculateGradeButton = document.getElementById("calculate-grade-button");

const randomGrade = () => {
    return Math.floor(Math.random() * 101);
}

const calculateGrade = (score) => {
    if (score >= 80) return "A";
    if (score >= 70) return "B";
    if (score >= 60) return "C";
    if (score >= 50) return "D";
    return "F";
}

const updateGrades = () => {
    for (let i = 0; i < scoreTable.rows.length; i++) {
        const row = scoreTable.rows[i];
        const score = parseInt(row.cells[2].textContent);
        const grade = calculateGrade(score);
        row.cells[3].textContent = grade;
    }
}

const mockData = [
    {
        id: 1,
        name: "สมชาย",
        score: randomGrade(),
        grade: null
    },
    {
        id: 2,
        name: "สมหญิง",
        score: randomGrade(),
        grade: null
    },
    {
        id: 3,
        name: "สมศรี",
        score: randomGrade(),
        grade: null
    },
    {
        id: 4,
        name: "สมปอง",
        score: randomGrade(),
        grade: null
    },
    {
        id: 5,
        name: "สมเกียรติ",
        score: randomGrade(),
        grade: null
    },
    {
        id: 6,
        name: "สมบัติ",
        score: randomGrade(),
        grade: null
    },
    {
        id: 7,
        name: "สมฤดี",
        score: randomGrade(),
        grade: null
    },
    {
        id: 8,
        name: "สมจิตร",
        score: randomGrade(),
        grade: null
    }
];

const loadData = () => {
    mockData.forEach(student => {
        const row = scoreTable.insertRow();
        const cellId = row.insertCell(0);
        const cellName = row.insertCell(1);
        const cellScore = row.insertCell(2);
        const cellGrade = row.insertCell(3);

        cellId.textContent = student.id;
        cellName.textContent = student.name;
        cellScore.textContent = student.score;
        cellGrade.textContent = student.grade;
    });
}

window.onload = loadData;

calculateGradeButton.addEventListener("click", updateGrades);

