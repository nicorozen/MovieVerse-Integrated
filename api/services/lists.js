const { List, ListItem, ListType } = require('../db/db');

const getLists = async () => await List.findAll();
const getListById = async (id) => await List.findByPk(id);
const getListsByUserId = async (userId) =>  await List.findAll({ where: { userId: userId } });
const getListType = async (listType) =>  await ListType.findOne({ where: { description: listType } });
const getListTypeById = async (listTypeId) =>  await ListType.findByPk(listTypeId);
const getListItemsByListId = async (listId) =>  await ListItem.findAll({ where: { listId: listId } });

const getUserLists = async(userId) => {
  try {

    const userLists = await getListsByUserId(userId);
    
    const userListsJSONPromises = userLists.map(async list => {
      const listType = await getListTypeById(list.listTypeId);
      const listItems = await getListItemsByListId(list.listId);

      return {
        listId: list.listId,
        listType: listType.description,
        items: listItems.map(item => {
          return {
            listItemId: item.listItemId,
            movieId: item.movieId,
            contentType: item.contentType,
            image: item.image
          };
        })
      };
    });


  // Esperar a que todas las promesas se resuelvan
    const userListsJSON = await Promise.all(userListsJSONPromises);
    return {success: true, data: userListsJSON};

  } catch (error) {
    console.error('Error:', error);
    throw new Error('Failed to add list item');
  }
}

const addListItem = async (userId, listType, movieId, contentType, image) => {
    try {

      // Busca una lista del usuario con el listType especificado
      var dbListType = await getListType(listType);
      if(!dbListType){
        return { error: true, message: 'No se encontro el tipo de lista' };
      }

      let userList = await List.findOne({ 
        where: { userId: userId, listTypeId: dbListType.listTypeId }
      });
      
  
      // Si no se encuentra una lista, se crea
      if (!userList) {
        const newList = await List.create({ userId: userId });
        await newList.setListType(dbListType);
        userList = newList;
      }

      const existingItem = await ListItem.findOne({
        where: { listId: userList.listId, movieId: movieId }
      });
  
      if (existingItem) {
        return { error: true, message: 'El elemento ya existe en la lista' };
      }
      // Crea un nuevo ListItem y asigna el listId
      const newItem = await ListItem.create({ 
        listId: userList.listId,
        movieId: movieId,
        contentType:contentType,
        image: image
      });
  

      return { success: true, data: newItem};;
    } catch (error) {
      console.error('Error:', error);
      throw new Error('Error al agregar a la lista');
    }
  };
  
  const removeListItem = async (listItemId, userId) => {
    try {

      const item = await ListItem.findByPk(listItemId, {
        include: {
          model: List, // Se Incluye la relación con List
          attributes: ['userId'], 
        },
      });
      console.log(item);

      if (!item) {
        return { error: true, message: 'No se encontró el elemento.' };
      }
  
      // Verifica si el userId de la lista coincide con el userId proporcionado
      if (item.List.dataValues.userId !== userId) {
        return { error: true, message: 'No tienes permiso para eliminar este elemento.' };
      }
  
      await item.destroy();
  
      return { success: true, message: 'Elemento eliminado.' };
    } catch (error) {
      console.error('Error:', error);
      throw new Error('Error al eliminar el elemento.');
    }
  };
  



module.exports = {
    getLists,
    getListById,
    getUserLists, 
    addListItem,
    removeListItem,
    getListsByUserId
};
