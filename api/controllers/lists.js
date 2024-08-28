const listService = require('../services/lists');

const getLists = async (req, res) => {
  try {
    const lists = await listService.getLists();
    res.status(200).json(lists);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Failed to retrieve lists' });
  }
};

const getUserLists = async(req, res) => {
    // el userId lo puedo levantar por el jwt
    const userId = req.user; 

    try {
      // const user = await UserSerice.getUserByEmail(email);
      const result = await listService.getUserLists(userId);

      res.status(200).json({lists: result.data, success:true}); // Envía la respuesta con el JSON de las listas del usuario
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: 'Internal server error' }); // En caso de error, devuelve un error 500
    }
  }
  
const addListItem = async (req, res) => {

  // el userId lo puedo levantar por el jwt
  const userId = req.user; 
  const { listType, movieId, contentType, image } = req.body;

    try {
      const result = await listService.addListItem(userId, listType, movieId, contentType, image);
      
      if (result.error) res.status(400).json({
        message: result.message
      });

       res.status(201).json({data: result.data});
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: 'Error al agregar a la lista' });
    }
  };

  const removeListItem = async (req, res) => {
    const { listItemId } = req.body; 
    const id = req.user;

    try {
      const result = await listService.removeListItem(listItemId, id);
        
      if (result.error) {
        return res.status(400).json({
            message: result.message
        });
    }

      res.status(200).json(result);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: 'Error al eliminar el elemento de la lista.' + error });
    }
  };
  

module.exports = {
  getLists,
  getUserLists,
  addListItem,
  removeListItem
};
