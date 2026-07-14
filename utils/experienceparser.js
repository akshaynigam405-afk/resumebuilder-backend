export default function experienceparser(text) {

    const lines = text
        .split("\n")
        .map(line => line.trim())
        .filter(line => line.length > 0);

    const experience = [];

    let inExperienceSection = false;

    const stopHeadings = [
        "education",
        "projects",
        "skills",
        "certifications",
        "achievements",
        "contact"
    ];

    let currentExperience = null;

    for (const line of lines) {

        const value = line.toLowerCase();

        // Start Experience Section
        if (
            value === "experience" ||
            value.includes("work experience") ||
            value.includes("professional experience") ||
            value.includes("employment")
        ) {
            inExperienceSection = true;
            continue;
        }

        // Stop Experience Section
        if (
            inExperienceSection &&
            stopHeadings.some(h => value.includes(h))
        ) {

            if (currentExperience) {
                experience.push(currentExperience);
            }

            break;
        }

        if (!inExperienceSection) continue;

        // Detect Company/Role line
        if (
            !currentExperience ||
            (
                currentExperience.company &&
                currentExperience.accomplishments.length > 0 &&
                /^[A-Z]/.test(line)
            )
        ) {

            if (currentExperience) {
                experience.push(currentExperience);
            }

            currentExperience = {
                company: line,
                role: "",
                startDate: "",
                endDate: "",
                currentlyWorking: false,
                accomplishments: ""
            };

            continue;
        }

        // Extract Dates
        const dateMatch = line.match(
            /([A-Za-z]{3,9}\s+\d{4}|\d{4})\s*[-–]\s*(Present|Current|[A-Za-z]{3,9}\s+\d{4}|\d{4})/i
        );

        if (dateMatch) {

            currentExperience.startDate = dateMatch[1];
            currentExperience.endDate = dateMatch[2];

            if (
                /present|current/i.test(dateMatch[2])
            ) {
                currentExperience.currentlyWorking = true;
            }

            continue;

        }

        // First line after company becomes role
        if (!currentExperience.role) {

            currentExperience.role = line;

        } else {

            currentExperience.accomplishments +=
                (currentExperience.accomplishments ? " " : "") + line;

        }

    }

    if (currentExperience) {
        experience.push(currentExperience);
    }

    return experience;

}