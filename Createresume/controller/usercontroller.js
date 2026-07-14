import usermodel from "../model/usermodel.js"
//controller function is exported to route.js
export const createresumem = async(req, res) => {
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