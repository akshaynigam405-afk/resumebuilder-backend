export default function certificationparser(text) {

    const lines = text
        .split("\n")
        .map(line => line.trim())
        .filter(line => line.length > 0);

    const certifications = [];

    let inCertificationSection = false;

    const stopHeadings = [
        "experience",
        "education",
        "projects",
        "skills",
        "achievements",
        "contact"
    ];

    let currentCertification = null;

    for (const line of lines) {

        const value = line.toLowerCase();

        // Start Section

        if (
            value === "certifications" ||
            value === "certificates" ||
            value === "licenses"
        ) {

            inCertificationSection = true;
            continue;

        }

        // Stop Section

        if (
            inCertificationSection &&
            stopHeadings.some(h => value.includes(h))
        ) {

            if (currentCertification) {
                certifications.push(currentCertification);
            }

            break;

        }

        if (!inCertificationSection) continue;

        // New Certificate

        if (
            !currentCertification ||
            (
                currentCertification.name &&
                /^[A-Z]/.test(line)
            )
        ) {

            if (currentCertification) {
                certifications.push(currentCertification);
            }

            currentCertification = {

                name: line,

                organization: "",

                credentialId: "",

                credentialUrl: "",

                issueDate: "",

                expiryDate: "",

                doesNotExpire: false,

                learned: ""

            };

            continue;

        }

        // URL

        const url = line.match(/https?:\/\/[^\s]+/);

        if (url) {

            currentCertification.credentialUrl = url[0];

            continue;

        }

        // Dates

        const dateMatch = line.match(
            /([A-Za-z]{3,9}\s+\d{4}|\d{4})\s*[-–]\s*(Present|Current|No Expiry|Never|[A-Za-z]{3,9}\s+\d{4}|\d{4})/i
        );

        if (dateMatch) {

            currentCertification.issueDate = dateMatch[1];

            currentCertification.expiryDate = dateMatch[2];

            currentCertification.doesNotExpire =
                /no expiry|never/i.test(dateMatch[2]);

            continue;

        }

        // Organization

        if (!currentCertification.organization) {

            currentCertification.organization = line;

        }

        else {

            currentCertification.learned +=
                (currentCertification.learned ? " " : "") + line;

        }

    }

    if (currentCertification) {

        certifications.push(currentCertification);

    }

    return certifications;

}