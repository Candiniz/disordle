import { readFileSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import axios from 'axios';
import * as cheerio from 'cheerio';


// Obter __dirname equivalente em ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Arquivo de entrada e saída
const ARQUIVO_ENTRADA = 'cincoLetras.js';
const ARQUIVO_SAIDA = '5letras2.js';
const ENCODING = 'utf-8';
const MICHAELIS_URL = 'https://michaelis.uol.com.br/moderno-portugues/busca/portugues-brasileiro/';

// Função para verificar se a palavra existe no Michaelis
async function palavraExiste(palavra) {
    try {
        const { data } = await axios.get(`${MICHAELIS_URL}${palavra}/`);
        const $ = cheerio.load(data);

        // Se encontrar um termo com a classe específica de resultado, a palavra existe
        return !data.includes("Nenhum resultado encontrado");
    } catch (error) {
        console.error(`Erro ao verificar palavra ${palavra}:`, error);
        return false; // Se houver erro, assume que a palavra não existe
    }
}

async function filtrarPalavras() {
    console.log('🔄 Lendo arquivo de entrada...');
    const conteudo = readFileSync(resolve(__dirname, ARQUIVO_ENTRADA), ENCODING);

    const matchArray = conteudo.match(/\[.*\]/s);
    if (!matchArray) {
        throw new Error('Não foi possível encontrar o array no arquivo.');
    }

    let palavras = JSON.parse(matchArray[0]);
    console.log(`🔍 Verificando ${palavras.length} palavras na API do Michaelis...`);

    const palavrasValidas = [];
    for (const [index, palavra] of palavras.entries()) {
        console.log(`Palavras analisadas: ${index + 1} de ${palavras.length}`);

        if (await palavraExiste(palavra)) {
            palavrasValidas.push(palavra);
        }
    }

    console.log(`✅ ${palavrasValidas.length} palavras válidas encontradas.`);

    const conteudoJS = `export const palavrasCincoLetras=${JSON.stringify(palavrasValidas, null, 2)};`;
    writeFileSync(resolve(__dirname, ARQUIVO_SAIDA), conteudoJS, ENCODING);

    console.log(`📁 Arquivo ${ARQUIVO_SAIDA} gerado com sucesso.`);
}

filtrarPalavras().catch(console.error);
