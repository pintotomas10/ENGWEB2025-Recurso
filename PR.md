# Persistência de dados
Para garantir a persistência de dados, foi utilizada uma base de dados MongoDB.  
Foram realizadas as seguintes alterações ao dataset original usando o ficheiro `corrige.py`:
- Substitui "id" da edição por "_id" (requisito de MongoDB);
- Adiciona como null os campos de cada cocktail não possui

# Setup de bases de dados

```bash
docker start mongoEW
docker cp cocktails.json mongoEW:/tmp
docker exec mongoEW mongoimport -d cocktails -c cocktails /tmp/cocktails.json --jsonArray
docker exec -it mongoEW sh
mongosh
use cocktails
show collections
```
A importação utilizou o ficheiro `cocktails.json`, gerado a partir do original com os comandos descritos na secção seguinte.

# Instruções de como executar as aplicações desenvolvidas
### Execução da Api (`porta 18000`)

```bash
cd ex1
npm i
npm start
```

### Execução da Interface Web (`porta 18001`)

```bash
cd ex2
npm i
npm start
```

Abrir no browser:

- API: `http://localhost:18000/cocktails`
- Interface Web: `http://localhost:18001`

# Testes à API
curl -X GET http://localhost:18000/cocktails

curl -X GET http://localhost:18000/cocktails/a1

curl -X GET "http://localhost:18000/cocktails?ingrediente=Gin"

curl -X GET http://localhost:18000/criadores

curl -X GET http://localhost:18000/ingredientes

curl -X GET http://localhost:18000/categorias

curl -X DELETE http://localhost:18000/cocktails/acid

curl -X POST http://localhost:18000/cocktails \
  -H "Content-Type: application/json" \
  -d '{
    "_id": "c1",
    "nome": "Mojito",
    "categoria": "Cocktail Clássico",
    "criador": {
      "id": "cr1",
      "nome": "Desconhecido"
    },
    "ingredientes": ["Rum", "Hortelã", "Açúcar", "Limão", "Água com gás"]
}'

curl -X PUT http://localhost:18000/cocktails/c1 \
  -H "Content-Type: application/json" \
  -d '{
    "_id": "c1",
    "nome": "Mojito Refrescado",
    "categoria": "Cocktail Clássico",
    "foto": null,
    "servidoEm": "Copo Alto",
    "preparacao": "Misturar todos os ingredientes com gelo.",
    "ingredientes": ["Rum", "Hortelã", "Açúcar", "Limão", "Água com gás"],
    "criador": {
      "id": "cr1",
      "nome": "Desconhecido"
    }
}'

# 🏷️ Identificação

**Nome:** Tomás Pinto Rodrigues 
**Número de Aluno:** 104448