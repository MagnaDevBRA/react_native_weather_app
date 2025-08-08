# 🌦️ Aplicativo de Clima

Este é um aplicativo móvel, desenvolvido com React Native e Expo, que permite aos usuários pesquisar por uma cidade e obter dados meteorológicos em tempo real, além de uma previsão para os próximos dias. Os dados são fornecidos pela API da **OpenWeather**.

## ✨ Funcionalidades

- **Pesquisa de Cidades:** Busca dinâmica por nome de cidade.
- **Clima Atual:** Apresenta dados detalhados do clima atual, como temperatura, sensação térmica, umidade, velocidade do vento e condição (ensolarado, nublado, etc.).
- **Previsão Futura:** Mostra a previsão do tempo para os próximos dias.

## 🚀 Tecnologias Utilizadas

- **[React Native](https://reactnative.dev/docs/getting-started):** Framework para desenvolvimento de aplicativos móveis multiplataforma.
- **[Expo](https://docs.expo.dev/):** Plataforma e conjunto de ferramentas para criar aplicativos universais com React.
- **[TypeScript](https://docs.expo.dev/):** Linguagem de programação fortemente tipada baseada em JavaScript.
- **[OpenWeather API](https://openweathermap.org/api):** Fonte dos dados meteorológicos.

---

## 📋 Pré-requisitos

Antes de começar, você precisará ter o seguinte instalado em sua máquina:
- [Node.js](https://nodejs.org/en/) (versão 18.x ou superior)
- [Yarn](https://classic.yarnpkg.com/en/docs/install) (gerenciador de pacotes)
- O aplicativo **Expo Go** instalado no seu celular (disponível na [App Store](https://apps.apple.com/us/app/expo-go/id982107779) e [Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent&hl=pt_BR&gl=US)).
- Uma chave de API (API Key) da [OpenWeather](https://openweathermap.org/appid). É gratuito para o plano básico.

## ⚙️ Instalação e Configuração

Siga os passos abaixo para configurar e rodar o projeto localmente:

**1. Clone o repositório:**
```bash
git clone https://github.com/MagnaDevBRA/react_native_weather_app.git 
```

**2. Navegue para a pasta do projeto:**
```bash
cd react_native_weather_app
```

**3. Instale as dependências:**
```bash
yarn install
```

**4. Adicione a chave de API:**

Para que o aplcicativo funcione corretamente, vocé precisa adicionar sua chave de API da OpenWeather ao arquivo **src/services/OpenWeatherApi.ts**.
```bash
# src/services/OpenWeatherApi.ts
const apiKey = 'SUA_CHAVE_AQUI';
```

## ▶️ Rodando a Aplicação

Para rodar o aplicativo, execute o seguinte comando:
```bash
yarn start
```
Isso iniciará o Metro Bundler e exibirá um QR Code no seu terminal.

Para testar:

1. Abra o aplicativo **Expo Go** no seu celular.
2. Toque no QR Code.
3. Aponte a câmera do celular para o QR Code exibido no terminal.

---

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo **[LICENSE](./LICENSE)** para mais detalhes. 

---

Feito por [Magna M. V. da Silva](https://github.com/MagnaDevBRA).

