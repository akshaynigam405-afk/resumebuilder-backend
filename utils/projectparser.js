export default function projectparser(text) {

    const lines = text
        .split("\n")
        .map(line => line.trim())
        .filter(line => line.length > 0);

    const projects = [];

    let inProjectsSection = false;

    const stopHeadings = [
        "experience",
        "education",
        "skills",
        "certifications",
        "achievements",
        "contact"
    ];

    let currentProject = null;

    for (const line of lines) {

        const value = line.toLowerCase();

        // Start Project Section

        if (
            value === "projects" ||
            value === "project"
        ) {

            inProjectsSection = true;
            continue;

        }

        // Stop Section

        if (
            inProjectsSection &&
            stopHeadings.some(h => value.includes(h))
        ) {

            if (currentProject) {

                projects.push(currentProject);

            }

            break;

        }

        if (!inProjectsSection) continue;

        // New Project

        if (
            !currentProject ||
            (
                currentProject.projectName &&
                /^[A-Z]/.test(line)
            )
        ) {

            if (currentProject) {

                projects.push(currentProject);

            }

            currentProject = {

                projectName: line,

                role: "",

                link: "",

                technologies: [],

                startDate: "",

                endDate: "",

                currentlyWorking: false,

                description: ""

            };

            continue;

        }

        // URL

        const url = line.match(/https?:\/\/[^\s]+/);

        if (url) {

            currentProject.link = url[0];

            continue;

        }

        // Date

        const dateMatch = line.match(
            /([A-Za-z]{3,9}\s+\d{4}|\d{4})\s*[-–]\s*(Present|Current|[A-Za-z]{3,9}\s+\d{4}|\d{4})/i
        );

        if (dateMatch) {

            currentProject.startDate = dateMatch[1];

            currentProject.endDate = dateMatch[2];

            currentProject.currentlyWorking =
                /present|current/i.test(dateMatch[2]);

            continue;

        }

        // Technologies

        if (
            line.toLowerCase().startsWith("tools") ||
            line.toLowerCase().startsWith("technologies")
        ) {

            currentProject.technologies = line
                .replace(/Tools:|Technologies:/i, "")
                .split(",")
                .map(t => t.trim())
                .filter(Boolean);

            continue;

        }

        // Role

        if (!currentProject.role) {

            currentProject.role = line;

        }

        else {

            currentProject.description +=
                (currentProject.description ? " " : "") + line;

        }

    }

    if (currentProject) {

        projects.push(currentProject);

    }

    return projects;

}