# IGNEWS

- Layout: https://www.figma.com/file/gl0fHkQgvaUfXNjuwGtDDs/ig.news/duplicate

- Aplicação em next

- A pasta `pages` só poderá estar em dois lugares da aplicação ou na raiz ou na pasta src
- E todas as págians precisam ser exportadas como default

---

### Adicionar typescript

```shell
yarn add typescript @types/react @types/node -D
```

- E trocar o nome dos arquivos para `ts` e `tsx`

- Executar o comando:

```shell
yarn dev
```

- E o próprio next já irá fazer todo o resto para nós...
- Adicionar o tsconfig.json o next-env.d.ts

- Ajustar no arquivo `tsconfig` adicionar:

```json
"moduleResolution": "node",
```

- E no arquivo `src/pages/_app.tsx` adicionar:

```tsx
import { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  // ...
}
```

---

## Estilização

- No nextjs podemos utilizar o styled-components porém para isso pode ser mais custoso em questão de processamento então para tal iremos utilizar o scss...
- Também não podemos importar diretamente o css na nossa página ou componente precisamos pois o nextjs irá reclamar que não pode utilizar de uma forma global..., se for utilizar de forma global daí precisa importar no arquivo `_app.tsx`

- mas se queremos utilizar o scopo do css para uma determinada página ou component criamos o arquivo `src/styles/nome_do_arquivo.module.css` e utilizamos o nome de class ou id:

```css
.title {
  color: red
}
```

E importamos ele no arquivo desejado:

```tsx
import styles from './arquivo/...';

// ...


<h1 className={styles.title}>Hello</h1>

```

- e para auxiliar no desenvolvimento para o autocomplite do css podemos utilizar a extensão para vscode: https://marketplace.visualstudio.com/items?itemName=clinyong.vscode-css-modules

- E daí o proprio nextjs irá fazer a nomeclatura dos itens para que um não afete o outro caso haja outros com mesmo nome de class etc!!!

---

### SASS

- Instalar o Sass

```shell
yarn add sass
```

---

## Arquivo _app.tsx

- É um component que fica por volta de tudo!

- Caso eu precise de ter um funcionamento padrão em todas as páginas eu posso fazer no _app.tsx

- Toda vez que o usuário troca de tela tudo é recarregado, seja estado, ou outra coisa...

- No caso se precisamos utilizar uma fonte externa do google fonts por exemplo ele não será o lugar onde iremos configurar isso.

## Arquivo _document.tsx

- É carregado apenas uma vez na aplicação!
- Ele é como se fosse o public/index.html de uma aplicação react!
- Precisamos utilizar no formato de class:

```tsx
import Document, { Html, Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document {

  render() {
    return (
      <Html>
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" /> 
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" /> 
          <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&family=Roboto:wght@400;700;900&display=swap" rel="stylesheet" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }

}
```

---

## Title dinâmico

- Para ter um titulo dinâmico por página é só adicionar a tag Head do next:

```tsx
import Head from 'next/head';
import styles from '../styles/home.module.scss';
export default function Home() {
  return (
    <>
      <Head><title>Início | ig.news</title></Head>
      <h1 className={styles.title}>Hello <span>World</span></h1>
    </>
  )
}
```

---

### Imagens

- Inserir sempre dentro de `public/images/`

- E no component chamar direto pelo nome do arquivo:

```tsx
export const Header: React.FC = () => {
  return (
    <header>
      <div>
        <img src="/images/logo.svg" alt="ig.news" />
      </div>
    </header>
  );
}
```

---

### API Stripe

- Mais informações: https://stripe.com/en-gb-br

---

### SSR

- Server side rendering

```tsx
export const getServerSideProps: GetServerSideProps = async () => {
  // ...
}
```

- Dessa forma mesmo com o js desabilitado ele irá renderizar a página.

### SSG

- Static Site Generation

```tsx
export const getStaticProps: GetStaticProps = async () => {
  // ...

  return {
    props: {
      product,
    },
    revalidate: 60 * 60 * 24, // 24 hours
  }
}
```

- Gera uma página estatica que só será revalidada depois do tempo determinado no revalidate, então quando alguém acessar essa página novamente ele irá utilizar a página salva

- Ele não é recomendado quando tem informação dinamica, caso eu precisace utilizar um `Bem vindo Jhon Doe` pois para todos os usuários iria mostrar isso, caso precisar de algo 
dinâmico utilizar o SSR


---

### Resumindo

- Com o Nextjs temos 3 formas de fazer chamadas:
  - Client-side (Quando não precisa de indexação, que depende de alguma ação do usuário)
  - Server-side (Gera o HTML no lado servidor porém pode ser de forma dinâmica para usuário especifico, informações especificas para usuários diferentes) - E pode ter indexação dos robos de busca
  - Static Site Generation (Compartilhar mesmo HTML para qualquer usuário [Post de blog, Página de um produto]) São iguais para todo mundo e precisa de indexação dos robos de busca


- Exemplo:
  - Post do blog (SSG)
  - Comentários (Client-side)

---

## Backend no NextJS (API Routes)

- Como o Nextjs tem uma camada server-side podemos em casos bem especificos utilizá-lo como um backend dessa forma algumas informações não ficarão expostas no frontend.
- Claro que isso não substitui um backend! Mas para casos pequenos e especifico pode ser utilizado.

- Para tal criamos a pasta `src/pages/api`

- E podemos adicionar um arquivo assim:

```ts
import { NextApiRequest, NextApiResponse } from 'next';

export default (req: NextApiRequest, res: NextApiResponse) => {
  // Aqui podemos fazer qualquer coisa que faria em um backend como o "express"

  const users = [
    { id: 1, name: 'John Doe' },
  ];

  return res.json(users);
}
```

- É utilizado o modelo `serverless` e isso não será um código que ficará disponível para o usuário assim como o front pois isso é uma camada de backend!


### Rotas com parametros 

- Para esperar um parametro na rota podemos utilizar de duas formas:
  - Criar um arquivo `src/pages/api/ROTA_NAME/[id].ts` com o conteúdo:
```ts
import { NextApiRequest, NextApiResponse } from 'next';

export default (req: NextApiRequest, res: NextApiResponse) => {
  // Aqui podemos fazer qualquer coisa que faria em um backend como o "express"

  console.log(req.query);  // acessando /ROTA_NAME/1 resultará em => { id: '1'}

  return res.json();
}
```

  - Criar um arquivo `src/pages/api/ROTA_NAME/[...params].ts` com o conteúdo:
```ts
import { NextApiRequest, NextApiResponse } from 'next';

export default (req: NextApiRequest, res: NextApiResponse) => {
  // Aqui podemos fazer qualquer coisa que faria em um backend como o "express"

  console.log(req.query);  // acessando /ROTA_NAME/qualquercoisa/outracoisa/1 resultará em => { params: ['qualquercoisa', 'outracoisa', '1'] }

  return res.json();
}
```
---

## Autenticação

- JWT (Storage)
- Next Auth (Login Social (github/google/Twitter)) [Não utilizar para tudo]
- Cognito
- Auth0

- Mais detalhes sobre o Next Auth => https://nextjs.org/docs/authentication

- Documentação do nextAuth => https://next-auth.js.org/getting-started/example

### Github Auth

- Vamos criar uma aplicação de auth no github para tal fazemos o seguinte: 
  - Settings > Developer Settings > OAuth Apps
- Dentro de OAuth Apps Criar uma nova aplicação e preencher os dados... o importante é que no Authorization  callback URL para esse caso de exemplo utilizar a seguinte:
`http://localhost:3000/api/auth/callback`
- E então copiar o Client ID e o Client secrets e colocar nas envs.

- Para adicionar a aplicação:
  - Criar o arquivo `src/pages/api/auth/[...nextauth].ts`
```ts
import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      authorization: {
        params: {
          scope: 'read:user,user:email',
        }
      },
    }),
    // ...add more providers here
  ],
})
```

  - Em `src/pages/_app.tsx` adicionar

```tsx
import { SessionProvider as NextAuthProvider } from 'next-auth/react';

// ... MORE

const MyApp:React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <NextAuthProvider session={pageProps.session} >
      { /* MORE */ }
    </NextAuthProvider>
  )
}

// ... MORE

```

  - E em `src/components/SigninButton/index.tsx`:

```tsx
// ... MORE
import { signIn, signOut, useSession } from 'next-auth/react';

export const SigninButton: React.FC = () => {

  const { data, status } = useSession();
  console.log(data);
  console.log(status);
  const isUserLoggedIn = status === 'authenticated';

  return isUserLoggedIn ? (
    <button 
      type="button" 
      className={styles.signInButton}
      onClick={() => signOut()}
    >
      <FaGithub color="#04d361" />
      {data.user.name}
      <FiX color="#737380" className={styles.closeIcon} />
    </button>
  ) : (
    <button 
      type="button" 
      className={styles.signInButton}
      onClick={() => signIn('github')}
    >
      <FaGithub color="#eba417" />
      Sign in with Github
    </button>
  );
}
```

---

### Fauna DB

- Criar conta em: https://fauna.com
- Criar uma database
- Obter a secret para acesso
- Criar Collection users
- Criar indice data.email que deverá ter valor único

- Instalar a dependencia do faunadb

```shell
yarn add faunadb
```

---

### Next Auth Callbacks

- O Next Auth possuí alguns callbacks: https://next-auth.js.org/configuration/callbacks

- Para tal vamos utilizar o de signIn para salavar a informação no banco de dados


- Um exemplo de utilização em `src/pages/api/auth/[...nextauth].ts`

---

### Envs no Next

- Por padrão o next não deixa a variavel publica, para que ela seja publica é necessário que no arquivo .env escreva dessa forma:

```
NEXT_PUBLIC_nome_da_var=
```

---

### O "Backend" do NextJS

- Para realizar operações de forma mais segura do qual não expõe códigos ao browser no Next podemos fazer isso em pelo menos 3 lugares:

- getServerSideProps (SSR)
- getStaticProps (SSG)
- API routes


---

### Webhook Stripe

- Detalhes aqui: https://stripe.com/docs/stripe-cli
- Detalhes aqui também: https://dashboard.stripe.com/test/webhooks/create?endpoint_location=local

- Baixar o arquivo em https://github.com/stripe/stripe-cli/releases/tag/v1.10.0

- com o arquivo baixado em `_stripe/stripe` executar o seguinte comando para:

```shell
sudo chmod +x _stripe/stripe
```

- Executar o comando para o login

```shell
./_stripe/stripe login
```

- Seguir as instruções 

- E rodar o comando para escutar o webhook:

```shell
./_stripe/stripe listen --forward-to http://localhost:3000/api/webhooks
```

- Realizar a compra no site utilizando um cartão de exemplo no caso: esse: 4242 4242 4242 4242
- Conforme indicado na documentação.


---

### Routes middleware do next

- Documentação: https://nextjs.org/docs/api-routes/api-middlewares

- Para podermos alterar o comportamente de ao invés de tentar receber uma requisição via JSON e recebermos via stream utilizamos isso:

```ts
export const config = {
  api: {
    bodyParser: false,
  }
}
```

- Isso foi feito no arquivo `src/pages/api/webhooks.ts` para receber os webhooks do stripe.
- Como recebemos isso via stream foi necessário adicionar a linha acima conforme documentação do nextjs


---

### Arquivos que não são rotas

- Para criar arquivos que não serão rotas tanto na `api` como em `pages` é só colocar um `_` na frente


---

### Post

- Para o gerenciamento de posts iremos utilizar o prismic: https://prismic.io

- Documentação para integrar com o projeto: https://prismic.io/docs/technologies/react-install


---

## Link

- Quando precisamos navegar de uma página para outra no next podemos utilizar o recurso de SPA do react, para que não seja necessário carregar a página do zero toda vez
que o usuário acessa.

- Para tal utilizamos o componet `Link`:
fds
```tsx
import Link from 'next/link';


// ...
<nav>
  <Link href="/">
    <a className={styles.active}>Home</a>
  </Link>
  <Link href="/posts">
    <a>Posts</a>
  </Link>
</nav>
```

- Dessa forma ao navegar de uma página para outra só o que realmente é necessário será carregado e não a página toda.

- Também podemos utilizar uma prop do Link chamada `prefetch`, o next deixará a página que possuí essa flag pré-carregada, e quando o usuário acessa-la será quase que instantaneo.
- Podemos coloca-los em links que em geral o usuário acessa, e então podemos carrega-lós assim quando a primeira página é carregada!

---

## cloneElement

- Em alguns casos precisamos modificar alguma propriedade do children de um elemento no react:

```tsx
<Element>
  {children}
</Element>
```

- Por exemplo queremos adicionar uma class para ele o `{children}` como podemos fazer isso?
- Podemos utilizar o `cloneElement`:

```tsx
import { useMemo, cloneElement } from 'react';

// ...
  const { asPath } = useRouter();


  const className = useMemo(() => {
    return asPath === rest.href ? activeClassName : '';
  }, [asPath]);

  return (
    <Link {...rest}>
      {cloneElement(children, {
        className,
      })}
    </Link>
  );
// ...
```

E passamos nas props, as propriedades que queremos adicionar

---

### Revalidate

- Quando utilizamos o `getStaticProps` podemos informar de quanto em quanto tempo queremos que seja renovado o conteúdo estático,
- Para tal dentro dessa função `getStaticProps` retornamos a opção `revalidate` passando o valor em segundos que será o tempo que será mantido a página estática até a próxima atualização:

```js
export const getStaticProps: GetStaticProps = async ({ params }) => {
  
  // ... MORE

  return {
    props: {
      myObj,
    },
    revalidate: 60 * 30, // 30 minutos
  }

}
```

---

## getStaticPaths

- Ele retorna quais caminhos queremos gerar de forma estática no momento da build do projeto.
- Também podemos utilizar para gerar as páginas estáticas no momento que o usuário acessa a página, ou seja a cada primeiro acesso será criada a página estática e então nos próximos acessos a partir daí ele utiliza a página estática;

- Utilizamos ela para página que são do nome [prop].tsx
- As que são página normais como `index.tsx`, `post.tsx` por ser uma página só o next gera de forma estática

- Exemplo uma página que é `[slug].tsx`:

```tsx
export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{
      params: {
        // slug é igual ao nome que demos ao arquivo [slug].tsx
        slug: 'caminho-ou-id-da-pagina' // irá tornar estatico a página http://localhost:3000/posts/preview/caminho-ou-id-da-pagina
      }
    }],
    fallback: 'blocking',
  }
}
```

### fallback

- Tem 3 opções: true, false e blocking

- true: quando o conteúdo não foi carregado de forma estática ainda ele irá carregar o layout da página e realizar a busca do conteúdo (chamada de api, etc...) direto no browser, a desvatagem é que ele pode se torarn um layout shift.
- false: retorna 404 quando o conteúdo não existe de forma estática
- blocking: diferente do true, ele gera a página no server side rendering e então exibe em tela.

- O blocking utilizamos para quando podem surgir novos caminhos/páginas no futuro
- false utilizamos quando o que é para ser exibido é apenas o que está dentro do paths, e o que for além disso retorna 404


---

# Testes

- Para iniciar os testes instalar algumas dependencias:

```shell
yarn add jest jest-dom @testing-library/jest-dom @testing-library/dom @testing-library/react babel-jest -D
```

```shell
yarn add -D jest-environment-jsdom
```


- Criar arquivo de configuração do `jest`: `jest.config.js`

- Criar o arquivo `src/tests/setupTests.ts` adicionamos o seguinte:

```ts
import '@testing-library/jest-dom/extend-expect'
```

- Com isso podemos simular algumas funcionalidades do browser através do jest

- Também criar o arquivo `babel.config.js`

## Jest styles

- Para não dar erro em arquivos que utiliza estilização sass, o recomendado é utilizar a lib:

```shell
yarn add identity-obj-proxy -D
```

- E no arquivo `jest.config.js` adicionar o seguinte:

```js
moduleNameMapper: {
  "\\.(scss|css|sass)$": "identity-obj-proxy"
}
```

- Instalar a lib `ts-jest` para trabalhar com a questão da tipagem das funções dentro do jest:

```shell
yarn add -D ts-jest
```

---

### Testando páginas

- Para testar páginas no caso do next para não conflitar com o sistemas de páginas do próprio next o ideal é criar em uma pasta separada normalmente dentro de `src/tests/pages/Home.spec.tsx`