import Class from '../models/Class';
import Module from '../models/Module';
import * as Yup from 'yup';

const schemaStore = Yup.object().shape({
  name: Yup.string().required('Nome é obrigatório'),
  class_date: Yup.date().required('Data é obrigatória').min(new Date(), 'A data ser futura')
})

class ClassController {
  async index(request, response){
    const { module_id: _id } = request.params;
    const classes = await Class.find().where({ module: _id }).sort({ name: 'asc'});

    return response.status(200).json(classes)
  }
  async store(request, response){
    const { module_id: _id } = request.params;
    const { name, class_date } = request.body;

    const existModule = await Module.findById(_id);

    if(!existModule){
      return response.status(400).json({ message: 'Módulo não existe'});
    }

   try {
    await schemaStore.validate({ name, class_date });
   } catch (error) {
     return response.status(400).json({ erro: error.errors })
   }

    const createClass = await Class.create({
      name,
      class_date,
      module: _id
    });

    existModule.classes.push(createClass._id);

    await existModule.save();

    return response.status(200).json(createClass);
  }
  async update(request, response){
    const { class_id: _id } = request.params;
    const data = request.body;

    const query = await Class.findById(_id);

    if(!query){
      return response.status(400).json({ message: 'Aula não existe'});
    }

    await query.updateOne(data);

    return response.status(200).send()
  }

  async destroy(request, response){
    const { class_id: _id } = request.params;

    const findModule = await Module.find().where({ classes: _id });
   
    const findIndex = findModule[0].classes.indexOf(_id);

    findModule[0].classes.splice(findIndex, 1);

    await findModule[0].save()

    const query = await Class.findByIdAndDelete(_id);

    if(!query){
      return response.status(400).json({ message: 'Aula não existe'});
    }

    return response.status(200).send();
  }
}


export default new ClassController();