# Calculadora de Alavancagem para Trading

Uma calculadora simples e intuitiva para ajudar traders a determinar o valor seguro para operar com diferentes níveis de alavancagem.

## Recursos

- Interface amigável para iniciantes
- Cálculo automático baseado no capital e alavancagem escolhida
- Indicação visual de níveis de risco
- Tabela completa de referência para diferentes alavancagens
- Modo noturno para uso confortável em ambientes com pouca luz
- Design responsivo para uso em dispositivos móveis

## Como usar

1. Digite seu capital total disponível
2. Selecione a moeda que você utiliza
3. Escolha o nível de alavancagem desejado
4. Veja o valor máximo recomendado para operar com segurança

## Publicar no Vercel

Para publicar esta calculadora no Vercel, siga estes passos:

1. Crie uma conta no Vercel (se ainda não tiver)
2. Instale a CLI do Vercel:
   ```
   npm install -g vercel
   ```
3. Clone este repositório:
   ```
   git clone [URL-DO-REPOSITÓRIO]
   cd calculadora-alavancagem
   ```
4. Faça login no Vercel:
   ```
   vercel login
   ```
5. Publique o projeto:
   ```
   vercel
   ```

Alternativamente, você pode conectar diretamente o seu repositório GitHub ao Vercel para implantação automática.

## Estrutura do Projeto

- `index.html` - Arquivo HTML principal com a estrutura da calculadora
- `styles.css` - Estilos CSS para a interface, incluindo o tema claro e escuro
- `script.js` - Código JavaScript para os cálculos e interação
- `vercel.json` - Configuração para implantação no Vercel

## Personalização

Você pode personalizar a calculadora editando os seguintes elementos:

- **Cores:** Modifique as variáveis CSS em `styles.css`
- **Níveis de alavancagem:** Edite o objeto `dadosAlavancagem` em `script.js`
- **Moedas disponíveis:** Adicione ou remova opções no select de moedas em `index.html`

## Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo LICENSE para detalhes.