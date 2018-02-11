
## Instalacja

1. Zainstaluj **Node.js**. Zalecam wersję z serii LTS **8.x.x** (npm **5.x.x**).
2. Otwórz konsolę _(terminal)_ i przejdź do folderu projektu
3. Zainstaluj menadżer pakietów [YARN](https://yarnpkg.com), poleceniem:

        npm install -g yarn

4. Zainstaluj zależności z pliku **package.json**

        yarn install

5. Gotowe :)


## Zadania

Wszystkie zadania należy uruchamiać poprzez składnię:

```
yarn run <task>
```
lub:
```
npm run <task>
```
### Lista zadań:
- `build` - Budowanie aplikacji do katalogu **build** w celu uruchomienia przy pomocy serwera deweloperskiego.
- `minimize` - To samo co zadanie `build`, tylko że pliki są minimalizowane.
- `distribute` - Zbudowanie aplikacji *(wersja produkcyjna)* do katalogu **dist** i skopiowanie z katalogu **assets** wszystkich plików.
- `clear` - Czyszczenie katalogów  **build** i **dist** z zawartości.
- `server` - Serwer deweloperski dostępny pod adresem `http://127.0.0.1:8080`
- `test` - Budowanie testów jednostkowych, a następnie ich uruchomienie w środowisku **PhantomJS**. 
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
Aby przetestować aplikację należy wykonać polecenie `npm run test`
Brak wyjątku (błędu) w konsoli oznacza iż testy przechodzą poprawnie :)


### UWAGA !

Testy jednostkowe wymagają środowiska **PhantomJS**:
 1. Zainstaluj środowisko [PhantomJS](http://phantomjs.org)
 2. Sprawdź czy w *konsoli/terminalu* działa polecenie `phantomjs -v`
	 1. jeżeli TAK to wszystko OK
	 2. jeżeli NIE to oznacza iz nie udało Ci się zainstalować poprawnie **PhantomJS**
