import { response } from 'express';
import * as Yup from 'yup';
import Category from '../models/Category';
import User from '../models/User';



class CategoryController {
    async store (request, response) {
        const schema = Yup.object({
            name: Yup.string().required(),  
        });

                 

        try{
            schema.validateSync(request.body, {abortEarly: false});
            }  catch(err){
                return response.status(400).json({ error: err.errors});
            }

            const isAdmin = await User.findByPk

            const { name } = request.body;

            const categoryExists = await Category.findOne({
                where: {
                    name,
                }
            });

            if (categoryExists) {
                return response.status(400).json({ error: 'Category already exists'});
            }

            const {id} = await Category.create({
                name,
            });

        return response.status(201).json({ id, name });
    }

    async index(request, response) {
        const categories = await Category.findAll();

        console.log({userId: request.userId});
        
        return response.json(categories)
    }

}

export default new CategoryController();