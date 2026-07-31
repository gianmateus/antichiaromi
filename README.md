# Antichi Aromi – Website

> Site oficial do restaurante italiano **Antichi Aromi**, localizado em Berlim, Alemanha.  
> Official website of the Italian restaurant **Antichi Aromi**, located in Berlin, Germany.  
> Offizielle Website des italienischen Restaurants **Antichi Aromi** in Berlin.

---

## 🇧🇷 Português

### Sobre o Projeto

Site estático desenvolvido com **HTML, CSS e JavaScript puro** para o restaurante italiano Antichi Aromi, em Berlim. Design com vídeo cinematográfico no hero, cardápio completo carregado dinamicamente e conteúdo bilíngue (alemão/inglês).

### Funcionalidades

- 🎬 Hero em vídeo com animação de scroll (GSAP + ScrollTrigger, scroll suave via Lenis)
- 🍝 Cardápio completo carregado dinamicamente por categoria (accordion), com fallback estático
- 🌐 Alternância de idioma Alemão/Inglês (persistida no navegador), incluindo cardápio, menu semanal e modais legais
- 📅 Popup de aviso (ex: pausa de verão) com controle de data de expiração
- 📱 Design responsivo (mobile-first)
- ⚖️ Modais de Impressum e Datenschutz (conformidade legal alemã), bilíngues

### Informações do Restaurante

| Info         | Detalhe                                                                  |
| ------------ | ------------------------------------------------------------------------ |
| 📍 Endereço  | Greifenhagener Str. 38, 10437 Berlin                                     |
| 📞 Telefone  | 030 84513261                                                             |
| 📧 E-mail    | info@antichi-aromi.de                                                    |
| 🌐 Site      | [antichi-aromi.de](https://antichi-aromi.de)                             |
| 🕐 Horário   | Ter–Sáb: 17h–23h · Dom: 16h–23h · 2ª: Fechado                            |
| 📸 Instagram | [@antichi_aromi_berlin](https://www.instagram.com/antichi_aromi_berlin/) |

### Tecnologias

- HTML5 · CSS3 · JavaScript (Vanilla)
- GSAP + ScrollTrigger (animações), Lenis (scroll suave)
- Google Fonts (Fraunces, Manrope, DM Mono)

### Estrutura

```
index.html            página principal
styles.css / script.js / i18n.js
assets/
  images/              fotos dos pratos e do restaurante
  video/               vídeos do hero
  menu-source.html     cardápio completo (alemão)
  menu-source.en.html  cardápio completo (inglês)
```

### Como rodar localmente

Basta abrir o arquivo `index.html` diretamente no navegador, ou servir a pasta com qualquer servidor estático (o cardápio completo é carregado via `fetch`, então alguns navegadores exigem `http://` em vez de `file://`).

### Deploy

O site é publicado via **Netlify** com deploy automático a partir deste repositório.

---

## 🇬🇧 English

### About the Project

A static website built with **pure HTML, CSS and JavaScript** for the Italian restaurant Antichi Aromi in Berlin. Cinematic video hero, dynamically loaded full menu, and bilingual (German/English) content.

### Features

- 🎬 Video hero with scroll-driven animation (GSAP + ScrollTrigger, smooth scroll via Lenis)
- 🍝 Full menu loaded dynamically by category (accordion), with a static fallback
- 🌐 German/English language toggle (persisted in the browser), covering the menu, weekly specials and legal modals
- 📅 Announcement popup (e.g. summer break) with an expiry date built in
- 📱 Fully responsive design (mobile-first)
- ⚖️ Impressum & Datenschutz modals (German legal compliance), bilingual

### Restaurant Info

| Info         | Detail                                                                   |
| ------------ | ------------------------------------------------------------------------ |
| 📍 Address   | Greifenhagener Str. 38, 10437 Berlin                                     |
| 📞 Phone     | 030 84513261                                                             |
| 📧 E-mail    | info@antichi-aromi.de                                                    |
| 🌐 Website   | [antichi-aromi.de](https://antichi-aromi.de)                             |
| 🕐 Hours     | Tue–Sat: 5pm–11pm · Sun: 4pm–11pm · Mon: Closed                          |
| 📸 Instagram | [@antichi_aromi_berlin](https://www.instagram.com/antichi_aromi_berlin/) |

### Tech Stack

- HTML5 · CSS3 · JavaScript (Vanilla)
- GSAP + ScrollTrigger (animations), Lenis (smooth scroll)
- Google Fonts (Fraunces, Manrope, DM Mono)

### Running Locally

Open `index.html` directly in your browser, or serve the folder with any static server (the full menu is loaded via `fetch`, so some browsers require `http://` rather than `file://`).

### Deployment

The site is hosted on **Netlify** with automatic deploys from this repository.

---

## 🇩🇪 Deutsch

### Über das Projekt

Eine statische Website, entwickelt mit **reinem HTML, CSS und JavaScript**, für das italienische Restaurant Antichi Aromi in Berlin. Filmischer Video-Hero, dynamisch geladene vollständige Speisekarte und zweisprachiger Inhalt (Deutsch/Englisch).

### Funktionen

- 🎬 Video-Hero mit scrollgesteuerter Animation (GSAP + ScrollTrigger, sanftes Scrollen via Lenis)
- 🍝 Vollständige Speisekarte, dynamisch nach Kategorie geladen (Akkordeon), mit statischem Fallback
- 🌐 Sprachumschalter Deutsch/Englisch (im Browser gespeichert), inkl. Speisekarte, Wochenempfehlung und rechtlichen Modals
- 📅 Hinweis-Popup (z.B. Sommerpause) mit eingebautem Ablaufdatum
- 📱 Vollständig responsives Design (Mobile-First)
- ⚖️ Impressum & Datenschutzerklärung (gesetzeskonforme Modals), zweisprachig

### Restaurantinformationen

| Info              | Details                                                                  |
| ----------------- | ------------------------------------------------------------------------ |
| 📍 Adresse        | Greifenhagener Str. 38, 10437 Berlin                                     |
| 📞 Telefon        | 030 84513261                                                             |
| 📧 E-Mail         | info@antichi-aromi.de                                                    |
| 🌐 Website        | [antichi-aromi.de](https://antichi-aromi.de)                             |
| 🕐 Öffnungszeiten | Di–Sa: 17–23 Uhr · So: 16–23 Uhr · Mo: Ruhetag                           |
| 📸 Instagram      | [@antichi_aromi_berlin](https://www.instagram.com/antichi_aromi_berlin/) |

### Technologien

- HTML5 · CSS3 · JavaScript (Vanilla)
- GSAP + ScrollTrigger (Animationen), Lenis (sanftes Scrollen)
- Google Fonts (Fraunces, Manrope, DM Mono)

### Lokale Ausführung

Einfach die Datei `index.html` direkt im Browser öffnen, oder den Ordner über einen beliebigen statischen Server bereitstellen (die vollständige Speisekarte wird per `fetch` geladen, weshalb manche Browser `http://` statt `file://` benötigen).

### Deployment

Die Website wird über **Netlify** mit automatischen Deploys aus diesem Repository gehostet.

---

<p align="center">
  Website by <a href="mailto:gianmateus22@icloud.com">Mateus Marques</a>
</p>
