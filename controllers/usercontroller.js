
import usermodel from "../models/usermodel.js"
import Skill from "../models/skills.js";

//controller function is exported to route.js
export const createresume = async (req, res) => {
    try {
        const create = await usermodel.create(req.body);
        res.status(201).json({
            message: "Data passed",
            data: create
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Something went wrong",
            error: error.message
        });

    }

}
//experience api function, this will block if user enters without any fields before moving to next page

export const experience = async (req, res) => {
    try {
        const exp = await usermodel.findByIdAndUpdate(
            req.params.id,
            {
                $push: {
                    experience: {
                        $each: req.body
                    }
                },
                experienceCompleted: true
            },
            { new: true }
        );

        res.status(200).json({
            message: "successful",
            data: exp,

        });

        console.log(exp);
        console.log(req.params.id);

    } catch (err) {
        console.log(err);

        res.status(500).json({
            message: "Went wrong",
            error: err.message
        });
    }
};

// api function for education
export const education = async (req, res) => {
    try {
        const edu = await usermodel.findByIdAndUpdate(
            req.params.id,
            {
                $push: {
                    education: {
                        $each: req.body
                    }
                },
                educationCompleted: true
            },
            {
                new: true
            }
        );

        res.status(200).json({
            message: "successful",
            data: edu
        });

        console.log(edu);
        console.log(req.params.id);

    } catch (err) {
        console.log(err);

        res.status(500).json({
            message: "Went wrong",
            error: err.message
        });
    }
};


//get api for skills for fetching the tags
export const skills = async (req, res) => {
    try {
        const search = (req.query.search || "").toLowerCase();

        const skillDoc = await Skill.findOne({ category: "skills" });

        if (!skillDoc) {
            return res.status(404).json({ message: "Skills not found" });
        }

        const filteredSkills = skillDoc.skills
            .filter(skill => skill.toLowerCase().includes(search))
            .slice(0, 4);

        res.status(200).json(filteredSkills);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//post api for skills

export const skillw = async (req, res) => {
    try {
        const ski = await usermodel.findByIdAndUpdate(
            req.params.id,
            {
                $push: {
                    skills: {
                        $each: req.body.skills
                    }
                },
                
            },
            {
                new: true
            }
        );

        res.status(200).json({
            message: "successful",
            data: ski
        });

        console.log(ski);
        console.log(req.params.id);

    } catch (err) {
        console.log(err);

        res.status(500).json({
            message: "Went wrong",
            error: err.message
        });
    }
};


// project and certificate function
export const projects = async (req, res) => {
    try {
        const project = await usermodel.findByIdAndUpdate(
            req.params.id,
            {
                $push: {
                    projects: {
                        $each: req.body
                    }
                },
                projectsCompleted: true
            },
            {
                new: true
            }
        );

        res.status(200).json({
            message: "successful",
            data: project
        });

        console.log(project);
        console.log(req.params.id);

    } catch (err) {
        console.log(err);

        res.status(500).json({
            message: "Went wrong",
            error: err.message
        });
    }
};


export const certificates = async (req, res) => {
    try {
        const certificate = await usermodel.findByIdAndUpdate(
            req.params.id,
            {
                $push: {
                    certificates: {
                        $each: req.body
                    }
                },
                certificatesCompleted: true
            },
            {
                new: true
            }
        );

        res.status(200).json({
            message: "successful",
            data: certificate
        });

        console.log(certificate);
        console.log(req.params.id);

    } catch (err) {
        console.log(err);

        res.status(500).json({
            message: "Went wrong",
            error: err.message
        });
    }
};


















































//this is yash bhaiyas code
import userModel from "../models/usermodel.js";

export const createUser = async (req, res) => {
    try {

        const { userName, email, password } = req.body;
        console.log(req.body);

        const userData = await userModel.create({ userName, email, password });

        res.status(200).json(userData);
    } catch (error) {
        res.status(200).json(error);

    }
}

export const getUser = async (req, res) => {
    try {

        const user = await userModel.find();

        res.status(200).json({
            success: true,
            msg: "successfully data ",
            data: user
        })

    } catch (error) {
        res.status(200).json({
            success: false,
            msg: error
        })
    }
}
