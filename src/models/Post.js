const mongoose = require('mongoose');

//Falando quais colunas estão disponíveis dentro da tabela no banco de dados 
//Respresentação da tabela no banco de dados em formato de javascript
const PostScheema = new mongoose.Schema({
    author: String,
    place: String,
    description: String,
    hashtags: String,
    image: String,
    likes: {
        type: Number,
        default: 0,
    }
}, {
    //Cria os campos createdAt e updatedAt em cada registro na tabela, que armazena a data de 
    //registro e a data da última atualização
    timestamps: true,
});

//Exportando o model PostScheema com o nome de Post
module.exports = mongoose.model('Post', PostScheema);