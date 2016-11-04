MD-Blog
---
## Etape 1: FINI
- Récuperez le fichier markdown du serveur distant
- transformez le en HTML grace à showdown
- insérez le dans votre page html dans un element `<div id="md">` que vous aurez créé auparavant

## Etape 2: FINI
Vous récuperez également un fichier JSON qui contient les liens et titres de plusieurs posts, vous insérez le contenu dans votre page HTML pour créer un menu.

## Etape 3:  FINI
Vous devrez recréer le serveur localement grace au paquet [Express](http://expressjs.com/fr/)
[Des applications ultra-rapides avec Node.js - OpenClassroom](https://openclassrooms.com/courses/des-applications-ultra-rapides-avec-node-js/le-framework-express-js)

##Bonus mode
Sur votre serveur, créez une page HTML qui permet d'éditer les posts et une autre qui permet d'ajouter un nouveau post (cette route doit également mettre à jour le fichier menu.json)

La page d'édition dispose de trois champs, un champ <input type="hidden'> qui contient le nom du fichier à éditer, unn champ <input type="text"> qui permet de mettre à jour le titre du post, et un champ <textarea> qui permet de modifier le contenu du fichier.

Pour le formulaire d'ajout, la seule différence réside dans le type du champs qui contient le nom du fichier à créer est de type text.