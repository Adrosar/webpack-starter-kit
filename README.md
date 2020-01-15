
# Webpack Starter Kit

## Wymagania i instalacja

1. Zainstaluj **Node.js** - zalecam wersję z serii LTS **8.x.x** lub **10.x.x**.
2. Zainstaluj **npm** wersję **5.x.x** lub nowszą.
3. Otwórz konsolę _(terminal)_ i przejdź do folderu projektu
4. Zainstaluj zależności z pliku **package.json** poleceniem `npm install`
5. Gotowe :)

Alternatywnie do zainstalowania zależności możesz użyć menadżera [YARN](https://yarnpkg.com) → polecenie `yarn install`

**§ UWAGA [1]**

Może się okazać że trzeba zainstalować pakiet [node-gyp](https://github.com/nodejs/node-gyp).
Polecam wykonać wszystko co jest opisane w pliku [README.md](https://github.com/nodejs/node-gyp/blob/master/README.md) z jednym wyjątkiem!
Instalując **Visual C++ Build Tools** w systemie **Windows 10** zalecam użyć do instalacji  pliku `visualcppbuildtools_full.exe` _(~3.2 MB)_ z linku https://go.microsoft.com/fwlink/?LinkId=691126 _(trzeba wykonać instalację standardową - bez odznaczania składników)_.

**§ UWAGA [2]**

Może się zdarzyć że menadżer **npm** nie zainstaluje poprawnie wszystkich zależności wtedy zalecam użyć menadżera [YARN](https://yarnpkg.com) do instalacji pakietów. 

**§ UWAGA [3]**

Jeżeli z jakiegoś powodu nie udaje Ci się zainstalować zależności to możesz pobrać gotową paczkę z [dysku Google](https://drive.google.com/open?id=1gfhYWpUEnx3A1tTbjqwIAC-q8KWLMfqN) _(odpowiednią dla swojego sytemu operacyjnego)_.


## Uruchomienie przykładu

 1. Sklonuj repozytorium na dysk lub pobierz spakowaną paczkę.
 2. Otwórz terminal *(konsolę)* i wejdź do katalogu `webpack-starter-kit`
 3. Uruchom polecenie `npm install` jeżeli nie zrobiłeś tego wcześniej!
 4. Zbuduj aplikację poleceniem `npm run build`
 5. Uruchom serwer deweloperski poleceniem `npm run server`
 6. W przeglądarce otwórz adres http://127.0.0.1:8080/web/preview.html


## Zadania

Wszystkie zadania należy uruchamiać poprzez składnię:

```
npm run _NAZWA_ZADANIA_
```

### Lista zadań:

#### Budowanie:

- `build` - Buduje aplikacje do katalogu **dist** w celu uruchomienia przy pomocy serwera deweloperskiego.
- `min` - To samo co zadanie `build`, tylko że pliki są minimalizowane.
- `dist` - Buduje aplikacje do katalogu **dist** z przeznaczeniem do wykorzystania **produkcyjnego**. Pliki są zminimalizowane. Następnie kopiuje zasoby z katalogu **assets** do katalogu **dist**. Kopiowaniem plików zajmuje się wtyczka [copy-webpack-plugin](https://github.com/webpack-contrib/copy-webpack-plugin).

#### Serwery:

- `server` - Uruchamia serwer deweloperski, który jest dostępny pod adresem [127.0.0.1:8080](http://127.0.0.1:8080)

#### Narzędzia:

- `clear` Usuwa foldery _(katalogi)_: **dist** i **docs**.
- `typedoc` - Generuje dokumentację [TypeDoc](http://typedoc.org) która jest dostępna pod adresem [127.0.0.1:8080/docs](http://127.0.0.1:8080/docs)
- `watch` - Uruchamia interaktywny tryb _(czuwaj i buduj)_, który przebuduje aplikację, gdy jakiś plik zostanie zmieniony _(zapisany)_.
- `live` - To samo co wyżej ↑ ale aplikacja jest automatycznie przeładowywana w przeglądarce.
- `dev` - Uruchamia **webpack-dev-server** który działa jak połączenie poleceń `live` i `server` z tą różnica że pliki są budowane w pamięci RAM, a nie do katalogu **dist**.

#### Plik `require.cmd`

Instaluje na nowo wszystkie pakiety. Trzeba wpierw usunąć z pliku `./package.json` sekcję **devDependencies** i **dependencies**.

Do użycia tylko w CMD (Windows):

```
./require.cmd
```


## Struktura projektu

Foldery _(katalogi)_:

- `./assets` - Zasoby aplikacji, które **NIE** podlegają budowaniu _(kompilacji)_. Zawartość folderu **assets** jest kopiowana do folderu `./dist` podczas dystrybucji aplikacji.
- `./dist` - Wygenerowane pliki aplikacji w wersji developerskiej lub produkcyjnej.
- `./lib` - Skrypty pomocnicze, np: serwer deweloperski, skrypt czyszczący katalogi, itp.
- `./node_modules` - Folder z modułami _(paczkami)_ dla środowiska **Node.js**
- `./source` - Pliki źródłowe, które składają się na aplikację.
	- `./source/app` - Właściwa aplikacja (klasy, funkcje, obiekt).
	- `./source/html` - Szablony HTML.
	- `./source/lib` - Biblioteki wewnętrzne projektu.
	- `./source/style` - Style CSS, SCSS, LESS, SASS.
	- `./source/test` - Testy jednostkowe.
- `./web` - pliki które **NIE** są używana w budowaniu ani dystrybucji aplikacji. Mogą to być: przykłady użycia biblioteki, szablony JSON _(json mocks)_, podgląd aplikacji _(preview.html)_, itp.


### Struktura generowanej aplikacji

Aplikacja w wersji produkcyjnej jest generowana do katalogu _(folderu)_:

 - `./dist/_NAZWA_/_WERSJA_/`

Aplikacja w wersji developerskiej jest generowana do katalogu _(folderu)_:

 - `./dist/_NAZWA_/dev/`

#### Legenda:

 - `_NAZWA_` - Nazwa aplikacji zdefiniowana w pliku `./package.json`, pole **name**
 - `_WERSJA_` - Wersja aplikacji zdefiniowana w pliku `./package.json`, pole **version**