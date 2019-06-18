const Post = require('../models/Post');

module.exports = {
    async store(req, res) {
        //Pegar o registro no banco de dados do post 
        //Todos os parâmetro que são enviados através da url da rota estão dentro do params
        const post = await Post.findById(req.params.id);

        //Somando o total de likes existentes +1
        post.likes++;

        //post.save pra salvar
        await post.save();

        //Quando um novo post for enviado, vamos emitir a informação à todos os usuários que estão
        //conectados na aplicação com o nome de like 
        req.io.emit('like', post);

        //Restornamos os posts com os dados atualizados
        return res.json(post);
    }
}