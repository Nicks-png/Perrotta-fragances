# Perrotta Fragrances — Contexto do Projeto

## Status atual
Site e-commerce reconstruído do zero em HTML puro + CSS + JavaScript vanilla.
Em ajuste de layout. Próxima etapa: backend para checkout funcional.

## Stack do site
- HTML / CSS / JS vanilla (sem frameworks)
- 6 páginas: index.html, shop.html, product.html, cart.html, checkout.html, about.html
- Carrinho com localStorage
- Checkout simulado (ainda sem pagamento real)

## Design
- Fontes: Playfair Display (títulos) + Raleway (corpo)
- Paleta: --creme #F0DFC8 / --nude #E4CCAE / --rose #D4A092 / --caramel #A67B5B / --gold #C9A96E / --dark #4A3728 / --darker #2C1810
- Cards e painéis: #FDF5EA (branco quente)
- Brandbook: Sofisticada · Feminina · Atemporal · Autêntica

## Backend planejado (próxima sessão)
Quando o usuário perguntar sobre backend ou checkout funcional, oferecer esta solução exata:

### Stack recomendada
- **Node.js + Express** — API REST
- **Mercado Pago Bricks** — pagamento in-site (sem redirecionamento externo)
- **Supabase** — banco de dados de pedidos e clientes
- **Resend** — e-mail transacional de confirmação
- **Melhor Envio** — cálculo de frete por CEP + etiquetas
- **NFe.io** — emissão automática de nota fiscal

### Para iniciar o desenvolvimento, precisamos de:
1. Credenciais de teste do Mercado Pago (Public Key + Access Token prefixo TEST-)
2. CEP de origem dos envios
3. Nome da loja / CNPJ para e-mail e NFe

### Importante
- Mercado Pago Bricks renderiza o formulário de pagamento dentro do próprio site
- Webhooks de pagamento precisam de servidor hospedado (Railway, Render ou VPS)
- Em produção só trocam as chaves — o código não muda
- Usuário confirmou que pode passar dados de teste e alterar depois para produção
