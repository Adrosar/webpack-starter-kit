

## Instalacja

1. Zainstaluj **Node.js**. Zalecam wersję z serii LTS **8.x.x** (npm **5.x.x**).
2. Otwórz konsolę _(terminal)_ i przejdź do folderu projektu
3. Zainstaluj menadżer pakietów [YARN](https://yarnpkg.com), poleceniem:

        npm install -g yarn

4. Zainstaluj zależności z pliku **package.json**

        yarn install

5. Gotowe :)


## Uruchomienie przykładu

 1. Sklonuj repozytorium na dysk lub pobierz spakowaną paczkę.
 2. Otwórz terminal *(konsolę)* i wejdź do katalogu `webpack-starter-kit`
 3. Uruchom polecenie `yarn install` jeżeli nie zrobiłeś tego wcześniej!
 4. Zbuduj aplikację poleceniem `yarn run build`
 5. Uruchom serwer deweloperski poleceniem `yarn run server`
 6. W przeglądarce otwórz adres http://127.0.0.1:8080/album-1.html


## Zadania

Wszystkie zadania należy uruchamiać poprzez składnię:

```
yarn run <task>
```
lub:
```
npm run <task>
```

**Zalecam użycie menadżera YARN**

### Lista zadań:
- `build` - Budowanie aplikacji do katalogu **build** w celu uruchomienia przy pomocy serwera deweloperskiego.
- `minimize` - To samo co zadanie `build`, tylko że pliki są minimalizowane.
- `distribute` - Zbudowanie aplikacji *(wersja produkcyjna)* do katalogu **dist** i skopiowanie z katalogu **assets** wszystkich plików (zostaną stworzone pliki w wersji deweloperskiej i zminimalizowanej z końcówkami typu `*.min.js`, itp)
- `production` - Zbudowanie aplikacji *(wersja produkcyjna)* do katalogu **dist** i połączenie plików **JS/CSS** z katalogu **assets** w jeden plik `commons.js` i/lub `commons.css` (wszystkie pliki będą zminimalizowane, ale bez końcówek typu `*.min.js`, `*.min.css`) (lista plików do połączenia znajduje się w `/config.js`).
- `clear` - Czyszczenie katalogów  **build** i **dist** z zawartości.
- `server` - Serwer deweloperski dostępny pod adresem `http://127.0.0.1:8080`
- `server-prod` - Serwer produkcyjny dostępny pod adresem `http://127.0.0.1:80`
- `test` - Zbudowanie testów jednostkowych.
- `watch` - Tryb interaktywny _(czuwaj i buduj)_.


## Struktura projektu

Foldery _(katalogii)_:

- `./assets` - Zasoby aplikacji, które **NIE** podlegają budowaniu _(kompilacji)_. Zawartość folderu **assets** jest kopiowana do folderu `./dist` podczas dystrybucji aplikacji.
- `./build` - Zbudowane pliki aplikacji lub testów.
- `./dist` - Pliki gotowe do dystrybucjii (np: skopiowania na serwer FTP).
- `./lib` - Skrypty pomocnicze, np: _serwer deweloperski_.
- `./node_modules` - Paczki z **NPM** i **YARN**.
- `./source` - Źródło aplikacji.
	- `./source/test` - Testy jednostkowe.
- `./web` - pliki które **NIE** są używana w budowaniu ani dystrybucji aplikacji. Mogą to być przykłady użycia biblioteki, szablony JSON _(json mocks)_, itp.


## Testy jednostkowe

Zaimplementowane testy są oparte o wyjątki: `throw new Error()` wywoływane, gdy testowany fragment kodu się **NIE** powiedzie. 

Aby przetestować aplikację należy: 

 1. Uruchomić serwer deweloperski `yarn run server`
 2. Zbudować testy jednostkowe ze źródła `yarn run test`
 3. Uruchomić w przeglądarce adres http://127.0.0.1:8080/test.html
 4. Jeżeli w konsoli przeglądarki (F12) **nie** będzie błędu to znaczy iż test się powiódł :D
 5. W przypadku wystąpienia błędu lub wyjątku test nie został spełniony :(
