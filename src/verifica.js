import { readFileSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import axios from 'axios';
import * as cheerio from 'cheerio';

// Obter __dirname equivalente em ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Arquivos
const ARQUIVO_ENTRADA = 'cincoLetras.js';
const ARQUIVO_SAIDA = 'cincoLetrasNEW.js';
const ENCODING = 'utf-8';
const MICHAELIS_URL = 'https://michaelis.uol.com.br/moderno-portugues/busca/portugues-brasileiro/';

// Nova URL com palavras do Wiktionary
const WIKTIONARY_URL = "https://pt.wiktionary.org/wiki/Appendice:Vocabul%C3%A1rio_do_portugu%C3%AAs";

// Função para pegar palavras do Wiktionary
async function coletarPalavras() {
    try {
        console.log("🔎 Coletando palavras do Wiktionary...");
        const { data } = await axios.get(WIKTIONARY_URL);
        const $ = cheerio.load(data);

        // Seleciona todas as palavras da lista
        const palavras = [];
        $("p, li").each((_, elemento) => {
            const palavra = $(elemento).text().trim();
            if (palavra.length === 5 && /^[a-zA-Záéíóúâêôãõç]+$/.test(palavra)) {
                palavras.push(palavra.toLowerCase());
            }
        });

        console.log(`📜 ${palavras.length} palavras coletadas do Wiktionary.`);
        return palavras;
    } catch (error) {
        console.error("Erro ao coletar palavras:", error);
        return [];
    }
}

// Função para verificar se a palavra existe no Michaelis
async function palavraExiste(palavra) {
    try {
        const { data } = await axios.get(`${MICHAELIS_URL}${palavra}/`);
        return !data.includes("Nenhum resultado encontrado");
    } catch (error) {
        console.error(`Erro ao verificar palavra ${palavra}:`, error);
        return false;
    }
}

async function atualizarListaPalavras() {
    console.log('🔄 Lendo arquivo de entrada...');
    const conteudo = readFileSync(resolve(__dirname, ARQUIVO_ENTRADA), ENCODING);

    // Extrai o array de palavras do arquivo
    const matchArray = conteudo.match(/\[.*\]/s);
    if (!matchArray) {
        throw new Error('Não foi possível encontrar o array no arquivo.');
    }

    let palavrasAtuais = JSON.parse(matchArray[0]);
    console.log(`📜 Total de palavras existentes: ${palavrasAtuais.length}`);

    // Coleta palavras de sites
    const novasPalavrasPossiveis = await coletarPalavras();

    // Filtra palavras novas que ainda não estão na lista
    const palavrasParaVerificar = novasPalavrasPossiveis.filter(p => !palavrasAtuais.includes(p));

    console.log(`🔍 ${palavrasParaVerificar.length} palavras novas serão verificadas...`);

    const palavrasValidas = [];
    for (const [index, palavra] of palavrasParaVerificar.entries()) {
        console.log(`🔎 Verificando: ${palavra} (${index + 1}/${palavrasParaVerificar.length})`);
        if (await palavraExiste(palavra)) {
            palavrasValidas.push(palavra);
        }
    }

    if (palavrasValidas.length === 0) {
        console.log("✅ Nenhuma nova palavra válida foi encontrada.");
        return;
    }

    console.log(`✅ ${palavrasValidas.length} palavras novas confirmadas. Atualizando lista...`);

    // Atualiza a lista de palavras
    const listaAtualizada = [...palavrasAtuais, ...palavrasValidas];

    // Gera o novo arquivo
    const conteudoJS = `export const palavrasCincoLetras=${JSON.stringify(listaAtualizada, null, 2)};`;
    writeFileSync(resolve(__dirname, ARQUIVO_SAIDA), conteudoJS, ENCODING);

    console.log(`📁 Arquivo ${ARQUIVO_SAIDA} atualizado com sucesso!`);
}

atualizarListaPalavras().catch(console.error);
