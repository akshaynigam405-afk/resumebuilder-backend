export default function skillsparser(text) {

    const lines = text
        .split("\n")
        .map(line => line.trim())
        .filter(line => line.length > 0);

    const skills = [];

    let inSkillsSection = false;

    const stopHeadings = [
        "experience",
        "education",
        "projects",
        "certifications",
        "achievement",
        "contact"
    ];

    for (const line of lines) {

        const value = line.toLowerCase();

        if (
            value.includes("technical skills") ||
            value === "skills" ||
            value.includes("key skills")
        ) {
            inSkillsSection = true;
            continue;
        }

        if (
            inSkillsSection &&
            stopHeadings.some(head => value.includes(head))
        ) {
            break;
        }

        if (inSkillsSection) {

            line
                .split(/,|•|\||:/)
                .forEach(skill => {

                    const s = skill.trim();

                    if (s.length > 1) {
                        skills.push(s);
                    }

                });

        }

    }

    return [...new Set(skills)];

}