export default function educationparser(text) {

    const lines = text
        .split("\n")
        .map(line => line.trim())
        .filter(line => line.length > 0);

    const education = [];

    let inEducationSection = false;

    const stopHeadings = [
        "experience",
        "projects",
        "skills",
        "certifications",
        "achievements",
        "contact"
    ];

    let currentEducation = null;

    for (const line of lines) {

        const value = line.toLowerCase();

        // Start Education Section
        if (
            value === "education" ||
            value.includes("academic") ||
            value.includes("qualification")
        ) {
            inEducationSection = true;
            continue;
        }

        // Stop Education Section
        if (
            inEducationSection &&
            stopHeadings.some(h => value.includes(h))
        ) {

            if (currentEducation) {
                education.push(currentEducation);
            }

            break;
        }

        if (!inEducationSection) continue;

        // Detect new institute
        if (
            !currentEducation ||
            (
                currentEducation.school &&
                /^[A-Z]/.test(line)
            )
        ) {

            if (currentEducation) {
                education.push(currentEducation);
            }

            currentEducation = {

                school: line,

                degree: "",

                fieldOfStudy: "",

                location: "",

                startDate: "",

                endDate: "",

                currentlyStudying: false,

                cgpa: "",

                highlights: ""

            };

            continue;

        }

        // Date Extraction
        const dateMatch = line.match(
            /([A-Za-z]{3,9}\s+\d{4}|\d{4})\s*[-–]\s*(Expected\s+[A-Za-z]{3,9}\s+\d{4}|Present|Current|[A-Za-z]{3,9}\s+\d{4}|\d{4})/i
        );

        if (dateMatch) {

            currentEducation.startDate = dateMatch[1];
            currentEducation.endDate = dateMatch[2];

            if (/expected|present|current/i.test(dateMatch[2])) {
                currentEducation.currentlyStudying = true;
            }

            continue;
        }

        // CGPA
        const cgpaMatch = line.match(
            /(\d+(\.\d+)?\/10|\d+(\.\d+)?\s*CGPA|\d+%)/
        );

        if (cgpaMatch) {

            currentEducation.cgpa = cgpaMatch[0];

            continue;

        }

        // Degree
        if (!currentEducation.degree) {

            currentEducation.degree = line;

            continue;

        }

        // Highlights
        currentEducation.highlights +=
            (currentEducation.highlights ? " " : "") + line;

    }

    if (currentEducation) {
        education.push(currentEducation);
    }

    return education;

}