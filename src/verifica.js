import fs from "fs";

// Arquivos de origem e destino
const sourceFile = "cincoLetras_atualizado.js";
const targetFile = "cincoLetras.js";

// Função para extrair palavras de um arquivo
function extractWords(file) {
  const content = fs.readFileSync(file, "utf8");
  return content
    .match(/\b[A-Z]{5}\b/g) // Captura palavras de exatamente 5 letras maiúsculas
    .map(word => word.toLowerCase()); // Converte para minúsculas
}

// Função para atualizar o array no arquivo de destino
function updateTargetFile(words) {
  let targetContent = fs.readFileSync(targetFile, "utf8");

  // Extraindo array existente
  let match = targetContent.match(/export const cincoLetras=\[(.*?)\]/s);
  if (!match) {
    console.error("Erro: Não foi possível encontrar o array no arquivo de destino.");
    return;
  }

  let existingWords = match[1]
    .split(",")
    .map(word => word.trim().replace(/"/g, ""));

  // Adiciona novas palavras, remove duplicatas e ordena
  let updatedWords = [...new Set([...existingWords, ...words])].sort();

  // Substitui no conteúdo original
  let updatedContent = targetContent.replace(
    /export const cincoLetras=\[(.*?)\]/s,
    `export const cincoLetras=["${updatedWords.join('", "')}"]`
  );

  fs.writeFileSync(targetFile, updatedContent, "utf8");
  console.log("Arquivo atualizado com sucesso!");
}

// Executa o script
const newWords = extractWords(sourceFile);
updateTargetFile(newWords);
