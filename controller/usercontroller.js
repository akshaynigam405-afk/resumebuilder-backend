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