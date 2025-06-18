import json

# Caminhos dos ficheiros
input_file = "dataset.json"
output_file = "cocktails.json"

# Lista de chaves esperadas no documento principal
required_keys = ["_id", "nome", "foto", "categoria", "servidoEm", "preparacao", "ingredientes", "criador"]

def normalize_entry(entry):
    # Renomear "id" para "_id"
    entry["_id"] = entry.pop("id", None)

    # Garantir que todos os campos esperados existem
    for key in required_keys:
        if key not in entry:
            entry[key] = None

    # Se existir o campo "criador", garantir que ele também está normalizado
    if entry["criador"] is not None:
        entry["criador"].setdefault("id", None)
        entry["criador"].setdefault("nome", None)

    return entry

def main():
    # Ler o ficheiro original
    with open(input_file, encoding="utf-8") as f:
        data = json.load(f)

    # Normalizar cada entrada
    normalized_data = [normalize_entry(entry) for entry in data]

    # Guardar no novo ficheiro
    with open(output_file, "w", encoding="utf-8") as f:
        json.dump(normalized_data, f, ensure_ascii=False, indent=2)

    print(f"Dados normalizados guardados em: {output_file}")

if __name__ == "__main__":
    main()
