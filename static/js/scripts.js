// Dados simulados das transações
const transacoes = [
    { tipo: 'Ganho', nome: 'Salário', valor: 5000.00, descricao: 'Salário mensal', data: '2024-10-01' },
    { tipo: 'Despesa', nome: 'Aluguel', valor: 8000.00, descricao: 'Aluguel do apartamento', data: '2024-10-05' },
    { tipo: 'Despesa', nome: 'Supermercado', valor: 300.00, descricao: 'Compras do mês', data: '2024-10-08' },
    { tipo: 'Ganho', nome: 'Freelance', valor: 800.00, descricao: 'Projeto de design', data: '2024-10-10' }
    
];

// Função para exibir todas as transações na tabela, com ganhos no início
function carregarTransacoes() {
    const tbody = document.getElementById('transacoes-corpo');
    tbody.innerHTML = ''; // Limpa a tabela

    let totalGanhos = 0;
    let totalDespesas = 0;

    // Filtra as transações em ganhos e despesas
    const ganhos = transacoes.filter(transacao => transacao.tipo === 'Ganho');
    const despesas = transacoes.filter(transacao => transacao.tipo === 'Despesa');

    // Adiciona os ganhos à tabela primeiro
    ganhos.forEach(transacao => {
        const row = document.createElement('tr');
        row.classList.add('ganho');

        row.innerHTML = `
            <td>${transacao.tipo}</td>
            <td>${transacao.nome}</td>
            <td>R$ ${transacao.valor.toFixed(2)}</td>
            <td>${transacao.descricao}</td>
            <td>${transacao.data}</td>
        `;
        tbody.appendChild(row);

        // Acumula o total de ganhos
        totalGanhos += transacao.valor;
    });

    // Adiciona as despesas à tabela depois
    despesas.forEach(transacao => {
        const row = document.createElement('tr');
        row.classList.add('despesa');

        row.innerHTML = `
            <td>${transacao.tipo}</td>
            <td>${transacao.nome}</td>
            <td>R$ ${transacao.valor.toFixed(2)}</td>
            <td>${transacao.descricao}</td>
            <td>${transacao.data}</td>
        `;
        tbody.appendChild(row);

        // Acumula o total de despesas
        totalDespesas += transacao.valor;
    });

    // Atualiza os valores do saldo
    atualizarSaldo(totalGanhos, totalDespesas);
}

// Função para atualizar o saldo e exibir no relatório
function atualizarSaldo(totalGanhos, totalDespesas) {
    const saldo = totalGanhos - totalDespesas;
    document.getElementById('total-ganhos').textContent = totalGanhos.toFixed(2);
    document.getElementById('total-despesas').textContent = totalDespesas.toFixed(2);

    const saldoFinalElement = document.getElementById('saldo-final');
    saldoFinalElement.textContent = `R$ ${saldo.toFixed(2)}`;
    saldoFinalElement.className = saldo >= 0 ? 'positive' : 'negative';
}

// Inicializa a tabela ao carregar a página
document.addEventListener('DOMContentLoaded', carregarTransacoes);
