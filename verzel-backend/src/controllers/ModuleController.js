import Module from '../models/Module';
import Class from '../models/Class';
import * as Yup from 'yup';

const schemaStore = Yup.object().shape({
  name: Yup.string().required('Nome é obrigatório para criar um módulo')
})

class ModuleController {
  async index(request, response){
    const modules = await Module.find().sort({ name: 'asc'});

    return response.status(200).json(modules)
  }
  async store(request, response){
    const { name } = request.body;

    try {
      await schemaStore.validate({ name });
    } catch (error) {
      return response.status(400).json({ erro: error.errors })
    }

    const moduleCreate = await Module.create({ name });

    return response.status(201).json(moduleCreate);
  }

  async update(request, response){
    const { module_id: _id } = request.params;
    const data = request.body;

    const query = await Module.findById(_id)

    if(!query){
      return response.status(400).json({ message: 'Módulo não existe'});
    }

    await query.updateOne(data);

    return response.status(200).send()
  }
  
  async destroy(request, response){
    const { module_id: _id } = request.params;

    const query = await Module.findByIdAndDelete(_id);

    if(!query){
      return response.status(400).json({ message: 'Módulo não existe'});
    }

    await Class.deleteMany({ module: _id });

    return response.status(200).send();
  }
}

export default new ModuleController();