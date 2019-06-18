const multer = require('multer');
//Nativa do node para lidar com caminhos
const path = require('path');

module.exports = {
    //Passa qual o storage, que será na pasta do projeto, no disco
    storage: new multer.diskStorage({
        //Onde as imagens serão salvas
        //__dirname retorna o diretório em que o arquivo utilizado está (upload.js)
        destination: path.resolve(__dirname, '..', '..', 'uploads'),
        //Chamaremos o callback quando finalizarmos a configuração
        filename: function(req, file, cb) {
            //No primeiro parâmetro passaríamos algum erro, caso tiver
            //No segundo passamos o nome que queremos dar para a imagem
            cb(null, file.originalname);
        }
    })
}