export default function personalparser(text) {

    const lines = text
        .split("\n")
        .map(line => line.trim())
        .filter(line => line.length > 0);

    const email =
        text.match(/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/)?.[0] || "";

    const phone =
        text.match(/(\+?\d[\d\s-]{8,15}\d)/)?.[0] || "";

    const portfolio =
        text.match(/https?:\/\/[^\s]+/)?.[0] || "";

    let fullName = "";
    let jobTitle = "";
    let location = "";
    let professionalSummary = "";

    for (let i = 0; i < lines.length; i++) {

        const line = lines[i];

        if (!fullName && /^[A-Z][A-Za-z\s]{2,}$/.test(line)) {
            fullName = line;
            jobTitle = lines[i + 1] || "";
            break;
        }

    }

    const locationMatch = text.match(
        /\b[A-Z][a-zA-Z\s]+,\s*[A-Z][a-zA-Z\s]+\b/
    );

    if (locationMatch) {
        location = locationMatch[0];
    }

    const aboutIndex = lines.findIndex(line =>
        line.toLowerCase().includes("about")
    );

    if (aboutIndex !== -1) {

        professionalSummary = lines
            .slice(aboutIndex + 1, aboutIndex + 6)
            .join(" ");

    }

    return {

        fullName,

        jobTitle,

        email,

        phone,

        location,

        portfolio,

        professionalSummary

    };

}