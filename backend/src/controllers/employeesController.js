const employeesController = {};

import employeesModel from "../models/Employees.js";

employeesController.getEmployees = async (req, res) =>{
    const employees = await employeesModel.find();
    res.json(employees)
};

employeesController.createEmployees = async (req, res) =>{
    const {name, lastName, birthday, email, address, hireDate, password, telephone, dui, isssNumber, isVerified} = req.body;

    const newEmployee = new employeesModel({
        name, lastName, birthday, email, address, hireDate, password, telephone, dui, isssNumber, isVerified
    });

    await newEmployee.save();
    res.json({message: "Empleado guardado"});
};

employeesController.deleteEmployees = async (req, res) =>{
    const deleteEmployee = await employeesModel.findByIdAndDelete(req.params.id);
    res.json({message: "Empleado eliminado"});
};

employeesController.updateEmployees = async (req, res) =>{
    const {name, lastName, birthday, email, address, hireDate, password, telephone, dui, isssNumber, isVerified} = req.body;

    const updatedEmployee = await employeesModel.findByIdAndUpdate(req.params.id, {name, lastName, birthday, email, address, hireDate, password, telephone, dui, isssNumber, isVerified}, {new: true});
    
    res.json({message: "Empleado actualizado"});
};

export default employeesController;