// Função pura para validação de entrada numérica
const ehNumeroValido = (num) => !isNaN(num) && num > 0;

// Função pura para aplicar a taxa de câmbio e retornar o valor convertido
const converterMoeda = (valor, taxaCambio) => valor * taxaCambio;

// Função de ordem superior para obter a taxa de câmbio
const obterTaxaCambio = (deMoeda, paraMoeda, taxas) => {
    const taxa = taxas.find(taxa => taxa.de === deMoeda && taxa.para === paraMoeda);
    return taxa ? taxa.valor : null;
};

// Função para adicionar uma conversão ao histórico
const adicionarAoHistorico = (historico, novaConversao) => [...historico, novaConversao];

// Função para renderizar o histórico de conversões
const renderizarHistorico = (historico) => {
    const historicoUl = document.getElementById('historico');
    historicoUl.innerHTML = '';
    historico.forEach(conversao => {
        const li = document.createElement('li');
        li.innerText = `${conversao.valorOriginal} ${conversao.deMoeda} = ${conversao.valorConvertido.toFixed(2)} ${conversao.paraMoeda}`;
        historicoUl.appendChild(li);
    });
};

// Taxas de câmbio de exemplo (em um aplicativo real, você obteria isso de uma API)
const taxasCambio = [
    { de: 'USD', para: 'EUR', valor: 0.85 },
    { de: 'EUR', para: 'USD', valor: 1.18 },
    // Adicione outras taxas conforme necessário
];

let historicoConversoes = [];

document.getElementById('botaoConverter').addEventListener('click', () => {
    // Obter valores de entrada do usuário
    const valor = parseFloat(document.getElementById('valor').value);
    const deMoeda = document.getElementById('deMoeda').value;
    const paraMoeda = document.getElementById('paraMoeda').value;

    // Validar entrada
    if (!ehNumeroValido(valor)) {
        alert('Por favor, insira um valor numérico válido.');
        return;
    }

    // Obter a taxa de câmbio
    const taxaCambio = obterTaxaCambio(deMoeda, paraMoeda, taxasCambio);
    if (!taxaCambio) {
        alert('Taxa de câmbio não encontrada para as moedas selecionadas.');
        return;
    }

    // Converter a moeda e exibir o resultado
    const valorConvertido = converterMoeda(valor, taxaCambio);
    document.getElementById('resultado').innerText = `Resultado: ${valorConvertido.toFixed(2)} ${paraMoeda}`;

    // Adicionar a conversão ao histórico
    const novaConversao = {
        valorOriginal: valor,
        deMoeda,
        paraMoeda,
        valorConvertido
    };
    historicoConversoes = adicionarAoHistorico(historicoConversoes, novaConversao);

    // Renderizar o histórico atualizado
    renderizarHistorico(historicoConversoes);
});
