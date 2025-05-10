// Dados de alavancagem e proporções recomendadas
const dadosAlavancagem = {
    "125": { proporcao: 0.5, risco: "Alto" },
    "100": { proporcao: 1, risco: "Alto" },
    "50": { proporcao: 2, risco: "Alto" },
    "20": { proporcao: 5, risco: "Médio" },
    "10": { proporcao: 10, risco: "Médio" },
    "5": { proporcao: 15, risco: "Médio" },
    "3": { proporcao: 25, risco: "Baixo" },
    "2": { proporcao: 37.5, risco: "Baixo" },
    "1": { proporcao: 100, risco: "Baixo" }
};

// Variável para controlar o estado do tema
let isDarkMode = false;

// Função para alternar entre tema claro e escuro
function alternarTema() {
    const body = document.body;
    body.classList.toggle('dark-mode');
    isDarkMode = body.classList.contains('dark-mode');
}

// Função para preencher a tabela
function preencherTabela() {
    const tbody = document.querySelector('#tabelaAlavancagem tbody');
    if (!tbody) return; // Verificação de segurança
    
    tbody.innerHTML = ''; // Limpar tabela
    
    // Ordenar alavancagens do maior para o menor
    const alavancagensOrdenadas = Object.keys(dadosAlavancagem).sort((a, b) => parseFloat(b) - parseFloat(a));
    
    // Criar linhas da tabela
    alavancagensOrdenadas.forEach(alavancagem => {
        const dados = dadosAlavancagem[alavancagem];
        if (!dados) return; // Verificação de segurança
        
        const tr = document.createElement('tr');
        tr.setAttribute('data-alavancagem', alavancagem);
        
        // Verificar se esta é a alavancagem selecionada
        const alavancagemAtual = document.getElementById('alavancagem').value;
        if (alavancagem === alavancagemAtual) {
            tr.classList.add('selected');
        }
        
        // Criar células
        tr.innerHTML = `
            <td>${alavancagem}x</td>
            <td>${dados.proporcao}%</td>
            <td><span class="badge badge-${dados.risco.toLowerCase()}">${dados.risco}</span></td>
        `;
        
        // Adicionar evento de clique
        tr.addEventListener('click', function() {
            const select = document.getElementById('alavancagem');
            if (select) {
                select.value = alavancagem;
                calcular();
            }
        });
        
        tbody.appendChild(tr);
    });
}

// Função para calcular
function calcular() {
    try {
        // Obter valores dos inputs
        const capitalInput = document.getElementById('capital');
        const moedaSelect = document.getElementById('moeda');
        const alavancagemSelect = document.getElementById('alavancagem');
        
        if (!capitalInput || !moedaSelect || !alavancagemSelect) {
            console.error('Elementos de input não encontrados');
            return;
        }
        
        const capital = parseFloat(capitalInput.value) || 0;
        const moeda = moedaSelect.value;
        const alavancagem = alavancagemSelect.value;
        
        // Verificar capital
        if (capital <= 0) {
            alert('Por favor, insira um valor válido para o capital');
            return;
        }
        
        // Obter dados da alavancagem
        const dados = dadosAlavancagem[alavancagem];
        if (!dados) {
            console.error('Alavancagem não encontrada:', alavancagem);
            alert(`A alavancagem ${alavancagem}x não está disponível. Por favor, escolha outra opção.`);
            return;
        }
        
        // Calcular valores
        const proporcao = dados.proporcao;
        const valorMaximo = (capital * proporcao / 100);
        const valorPosicao = valorMaximo * parseFloat(alavancagem);
        
        // Atualizar a interface - verificando se os elementos existem antes
        const elementos = {
            capitalTotal: document.getElementById('capitalTotal'),
            alavancagemSelecionada: document.getElementById('alavancagemSelecionada'),
            valorMaximo: document.getElementById('valorMaximo'),
            valorPosicao: document.getElementById('valorPosicao'),
            recomendacaoValor: document.getElementById('recomendacaoValor'),
            nivelRisco: document.getElementById('nivelRisco'),
            riscoDescricao: document.getElementById('riscoDescricao'),
            recomendacaoDescricao: document.getElementById('recomendacaoDescricao')
        };
        
        // Atualizar valores apenas se os elementos existirem
        if (elementos.capitalTotal) elementos.capitalTotal.textContent = `${capital.toLocaleString('pt-BR')} ${moeda}`;
        if (elementos.alavancagemSelecionada) elementos.alavancagemSelecionada.textContent = `${alavancagem}x`;
        if (elementos.valorMaximo) elementos.valorMaximo.textContent = `${valorMaximo.toLocaleString('pt-BR')} ${moeda}`;
        if (elementos.valorPosicao) elementos.valorPosicao.textContent = `${valorPosicao.toLocaleString('pt-BR')} ${moeda}`;
        if (elementos.recomendacaoValor) elementos.recomendacaoValor.textContent = `${proporcao}%`;
        
        // Atualizar o nível de risco
        if (elementos.nivelRisco) {
            elementos.nivelRisco.textContent = dados.risco;
            
            // Remover classes de risco anteriores
            elementos.nivelRisco.className = 'result-value';
            
            // Adicionar classe de risco adequada
            if (dados.risco === 'Alto') {
                elementos.nivelRisco.classList.add('risk-high');
            } else if (dados.risco === 'Médio') {
                elementos.nivelRisco.classList.add('risk-medium');
            } else {
                elementos.nivelRisco.classList.add('risk-low');
            }
        }
        
        // Atualizar textos descritivos
        if (elementos.riscoDescricao) {
            elementos.riscoDescricao.textContent = `Com ${alavancagem}x de alavancagem, o risco é considerado ${dados.risco.toLowerCase()} se você usar apenas ${proporcao}% do seu capital.`;
        }
        
        if (elementos.recomendacaoDescricao) {
            elementos.recomendacaoDescricao.textContent = `É recomendado usar apenas ${proporcao}% do seu capital para operar com ${alavancagem}x de alavancagem.`;
        }
        
        // Atualizar seleção na tabela
        const linhas = document.querySelectorAll('#tabelaAlavancagem tbody tr');
        linhas.forEach(linha => {
            linha.classList.remove('selected');
            if (linha.getAttribute('data-alavancagem') === alavancagem) {
                linha.classList.add('selected');
                try {
                    linha.scrollIntoView({ behavior: 'smooth', block: 'center' });
                } catch (error) {
                    console.log('Erro ao rolar para a linha:', error);
                }
            }
        });
    } catch (error) {
        console.error('Erro ao calcular:', error);
    }
}

// Inicializar
document.addEventListener('DOMContentLoaded', function() {
    try {
        // Adicionar evento ao botão de alternar tema
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', alternarTema);
        }
        
        // Verificar se elementos essenciais existem
        const elements = ['capital', 'moeda', 'alavancagem', 'calcular'];
        const missingElements = elements.filter(id => !document.getElementById(id));
        
        if (missingElements.length > 0) {
            console.error('Elementos essenciais não encontrados:', missingElements);
            return;
        }
        
        // Preencher tabela
        preencherTabela();
        
        // Calcular valores iniciais
        calcular();
        
        // Adicionar listeners
        document.getElementById('calcular').addEventListener('click', calcular);
        document.getElementById('capital').addEventListener('input', calcular);
        document.getElementById('moeda').addEventListener('change', calcular);
        document.getElementById('alavancagem').addEventListener('change', calcular);
        
        console.log('Calculadora inicializada com sucesso!');
    } catch (error) {
        console.error('Erro ao inicializar a calculadora:', error);
    }
});