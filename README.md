
# Webpack Starter Kit

## Wymagania i instalacja

1. Zainstaluj **Node.js**. Zalecam wersję z serii LTS **8.x.x** (npm **5.x.x**).
2. Otwórz konsolę _(terminal)_ i przejdź do folderu projektu
3. Zainstaluj menadżer pakietów [YARN](https://yarnpkg.com), poleceniem: `npm install -g yarn`
4. Zainstaluj zależności z pliku **package.json** poleceniem `yarn install`
5. Gotowe :)

**UWAGA**

Może się okazać że trzeba zainstalować pakiet [node-gyp](https://github.com/nodejs/node-gyp).
Polecam wykonać wszystko jak jest opisane w pliku [README.md](https://github.com/nodejs/node-gyp/blob/master/README.md) z jednym wyjątkiem!
Instalując **node-gyp** w systemie **Windows 10** zalecam użyć do instalacji **Visual C++ Build Tools** pliku `visualcppbuildtools_full.exe` _(~3.2 MB)_ z linku https://go.microsoft.com/fwlink/?LinkId=691126 _(trzeba wykonać instalację standardową - bez odznaczania składników)_.


## Uruchomienie przykładu

 1. Sklonuj repozytorium na dysk lub pobierz spakowaną paczkę.
 2. Otwórz terminal *(konsolę)* i wejdź do katalogu `webpack-starter-kit`
 3. Uruchom polecenie `npm install` lub `yarn install` _(zalecam użyć YARN'a)_ jeżeli nie zrobiłeś tego wcześniej!
 4. Zbuduj aplikację poleceniem `npm run build`
 5. Uruchom serwer deweloperski poleceniem `npm run server`
 6. W przeglądarce otwórz adres http://127.0.0.1:60088/album-1.html

**Wersja produkcyjna:**
1. `npm run prod` lub `npm run dist`
2. `npm run server:prod`
3. http://127.0.0.1:60080/album-1.html


## Zadania

Wszystkie zadania należy uruchamiać poprzez składnię: `npm run {{nazwa_zadania}}` lub `yarn run {{nazwa_zadania}}`
**Zalecam użycie menadżera YARN**


### Lista zadań:

#### Budowanie:

- `build` - Buduje aplikację do katalogu **build** w celu uruchomienia przy pomocy serwera deweloperskiego.
- `min` / `minimize` - To samo co zadanie `build`, tylko że pliki są minimalizowane.
- `dist` / `distribute`:
	- Buduje aplikację do katalogu **dist** (tworzy pliki w wersji deweloperskiej i zminimalizowanej z końcówkami typu `*.min.js`, `*.min.css`).
	- Kopiuje pliki i foldery z katalogu **assets** do katalogu **dist**.
- `prod` / `production`:
	- Buduje aplikację do katalogu **dist** (wszystkie pliki są minimalizowane).
	- Łączy pliki `*.js` i `*.css` z katalogu **assets** w jeden plik `commons.js` i/lub `commons.css`.
- `test` - Buduje testy jednostkowe.

#### Serwery:

- `server` - Uruchamia serwer deweloperski, który jest dostępny pod adresem `http://127.0.0.1:60088`
- `server:prod` - Uruchamia serwer produkcyjny, który jest dostępny pod adresem `http://127.0.0.1:60080`

#### Narzędzia:

- `clear` - Czyści katalogi **build**, **dist** i **typedoc** z zawartości.
- `typedoc` - Generuje dokumentację [TypeDoc](http://typedoc.org), która jest dostępna pod adresem:
	- [127.0.0.1:60088/~typedoc](http://127.0.0.1:60088/~typedoc) (serwer deweloperski)
	- [127.0.0.1:60080/~typedoc](http://127.0.0.1:60080/~typedoc) (serwer produkcyjny)
- `watch` - Uruchamia interaktywny tryb _(czuwaj i buduj)_, który przebuduje aplikację, gdy jakiś plik zostanie zmieniony _(zapisany)_.


## Struktura projektu

Foldery _(katalogi)_:

- `./assets` - Zasoby aplikacji, które **NIE** podlegają budowaniu _(kompilacji)_. Zawartość folderu **assets** jest kopiowana do folderu `./dist` podczas dystrybucji aplikacji.
- `./build` - Zbudowane pliki aplikacji lub testów.
- `./dist` - Pliki gotowe do dystrybucji (np: skopiowania na serwer FTP).
- `./lib` - Skrypty pomocnicze, np: serwer deweloperski, skrypt czyszczący katalogi, itp.
- `./node_modules` - Folder z modułami _(paczkami)_ dla środowiska **Node.js**
- `./source` - Pliki źródłowe, które składają się na aplikację.
	- `./source/app` - Właściwa aplikacja (klasy, funkcje, obiekt).
	- `./source/entry` - Punkt wejścia dla Webpack'a.
	- `./source/html` - Szablony HTML.
	- `./source/style` - Style CSS, SCSS, LESS, SASS.
	- `./source/test` - Testy jednostkowe.
- `./web` - pliki które **NIE** są używana w budowaniu ani dystrybucji aplikacji. Mogą to być przykłady użycia biblioteki, szablony JSON _(json mocks)_, itp.


## Testy jednostkowe

Zaimplementowane testy są oparte o wyjątki: `throw new Error()` wywoływane, gdy testowany fragment kodu się **NIE** powiedzie. 

Aby przetestować aplikację należy: 

 1. Zbudować testy jednostkowe ze źródła `npm run test`
 2. Uruchomić serwer deweloperski `npm run server`
 3. Uruchomić w przeglądarce adres http://127.0.0.1:60088/test.html
 4. Jeżeli w konsoli przeglądarki (F12) **nie** będzie błędu to znaczy iż test się powiódł :D
 5. W przypadku wystąpienia błędu lub wyjątku test nie został spełniony
